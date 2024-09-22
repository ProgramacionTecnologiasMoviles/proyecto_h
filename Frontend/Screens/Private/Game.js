import {
  Canvas,
  useImage,
  Image,
  Group,
  Text,
} from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import {
  useSharedValue,
  Easing,
  withTiming,
  withSequence,
  withRepeat,
  useFrameCallback,
  useDerivedValue,
  interpolate,
  Extrapolation,
  useAnimatedReaction,
  runOnJS,
  cancelAnimation,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import { useWebSocket } from "../../contexts/WebSocketContext";

const GRAVITY = 800;
const JUMP_FORCE = -400;
const PIPE_WIDTH = 104;
const PIPE_HEIGTH = 0;

export default function Game({ route }) {
  const { ws } = useWebSocket();
  const { hostPlayer } = route.params;
  const { width, height } = useWindowDimensions();
  const [score, setScore] = useState(0);

  const pipeOffset = useSharedValue(0);
  const topPipeY = useDerivedValue(() => pipeOffset.value - 320);
  const bottomPipeY = useDerivedValue(() => height - 320 + pipeOffset.value);
  const birdY = useSharedValue(height / 3);
  const x = useSharedValue(width);
  const gameOver = useSharedValue(false);
  let tap = 0;

  useEffect(() => {
    moveTheMap();
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (hostPlayer) {
        if (data.secondPlayerTab) {
          secondBirdVelocity.value = JUMP_FORCE;
        }
      } else {
        if (data.pipeOffset) {
          pipeOffset.value = Number(data.pipeOffset);
        }
        if (data.firstPlayerTab) {
          secondBirdVelocity.value = JUMP_FORCE;
        }
      }
    };
  }, []);

  const sendValueToWebSocket = (variable_name, value) => {
    ws.send(
      JSON.stringify({
        [variable_name]: value.toString(),
      })
    );
  };
  const sendValueToWebSocketGuess = () => {
    ws.send(
      JSON.stringify({
        secondPlayerPos: birdY.value.toString(),
      })
    );
  };
  const sendTapToWebSocket = () => {
    ws.send(
      JSON.stringify({
        tap: true,
      })
    );
  };

  if (hostPlayer) {
    useAnimatedReaction(
      () => pipeOffset.value,
      (currentX, previousX) => {
        if (currentX !== previousX) {
          runOnJS(sendValueToWebSocket)("pipeOffset", pipeOffset.value);
        }
      },
      [x]
    );
  } else {
    const gesture = Gesture.Tap().onStart(() => {
      birdVelocity.value = JUMP_FORCE;

      ws.send("tap");
    });
  }

  const moveTheMap = () => {
    x.value = withRepeat(
      withSequence(
        withTiming(-150, { duration: 2000, easing: Easing.linear }),
        withTiming(width, { duration: 0 })
      ),
      -1
    );
  };

  const birdPos = {
    x: width / 4,
  };
  const secondBirdY = useSharedValue(height / 3);
  const birdCenterX = useDerivedValue(() => birdPos.x + 32);
  const birdCenterY = useDerivedValue(() => birdY.value + 24);
  const birdVelocity = useSharedValue(200);
  const secondBirdVelocity = useSharedValue(200);

  const obstacles = useDerivedValue(() => {
    const allObstacles = [];
    // Bottom pipe
    allObstacles.push({
      x: x.value,
      y: bottomPipeY.value,
      h: PIPE_HEIGTH,
      w: PIPE_WIDTH,
    });

    // Top pipe
    allObstacles.push({
      x: x.value,
      y: topPipeY.value,
      h: PIPE_HEIGTH,
      w: PIPE_WIDTH,
    });

    return allObstacles;
  });

  // Scoring system
  useAnimatedReaction(
    () => x.value,
    (currentValue, previousValue) => {
      const middle = birdPos.x;

      if (currentValue < -100 && previousValue > -100 && hostPlayer) {
        pipeOffset.value = Math.random() * 400 - 200;
      }
      if (
        currentValue != previousValue &&
        currentValue <= middle &&
        previousValue > middle
      ) {
        runOnJS(setScore)(score + 1);
      }
    }
  );

  const isPointCollidingWithRect = (point, rect) => {
    "worklet";
    return (
      point.x >= rect.x &&
      point.x <= rect.x + rect.w &&
      point.y >= rect.y &&
      point.y <= rect.y + rect.h
    );
  };

  // Colission detection
  // useAnimatedReaction(
  //   () => birdY.value,
  //   (currentValue, previousValue) => {
  //     // ground collision detection
  //     if (currentValue > height - 150 || currentValue < 0) {
  //       gameOver.value = true;
  //     }

  //     const isColliding = obstacles.value.some((rect) =>
  //       isPointCollidingWithRect(
  //         { x: birdCenterX.value, y: birdCenterY.value },
  //         rect
  //       )
  //     );

  //     if (isColliding) {
  //       gameOver.value = true;
  //     }
  //   }
  // );
  useAnimatedReaction(
    () => gameOver.value,
    (currentValue, previousValue) => {
      if (currentValue && !previousValue) {
        cancelAnimation(x);
      }
    }
  );

  const background = useImage(
    require("../../assets/sprites/background-day.png")
  );
  const bird = useImage(require("../../assets/sprites/yellowbird-upflap.png"));
  const secondBird = useImage(
    require("../../assets/sprites/redbird-upflap.png")
  );
  const pipe = useImage(require("../../assets/sprites/pipe-green.png"));
  const pipeup = useImage(require("../../assets/sprites/pipe-green-up.png"));
  const base = useImage(require("../../assets/sprites/base.png"));

  const birdOrigin = useDerivedValue(() => {
    return { x: width / 4 + 32, y: birdY.value + 24 };
  });

  const secondBirdOrigin = useDerivedValue(() => {
    return { x: width / 4 + 32, y: secondBirdY.value + 24 };
  });

  useFrameCallback(({ timeSincePreviousFrame: dt }) => {
    if (!dt || gameOver.value) {
      return;
    }
    birdY.value = birdY.value + (birdVelocity.value * dt) / 1000;
    birdVelocity.value = birdVelocity.value + (GRAVITY * dt) / 1000;

    secondBirdY.value =
      secondBirdY.value + (secondBirdVelocity.value * dt) / 1000;
    secondBirdVelocity.value = secondBirdVelocity.value + (GRAVITY * dt) / 1000;
  });

  const gesture = Gesture.Tap().onStart(() => {
    birdVelocity.value = JUMP_FORCE;
    if (hostPlayer) {
      runOnJS(sendValueToWebSocket)("firstPlayerTab", true);
    } else {
      runOnJS(sendValueToWebSocket)("secondPlayerTab", true);
    }
  });

  const birdTransform = useDerivedValue(() => {
    return [
      {
        rotate: interpolate(
          birdVelocity.value,
          [-500, 500],
          [-0.5, 0.5],
          Extrapolation.CLAMP
        ),
      },
    ];
  });

  const secondBirdTransform = useDerivedValue(() => {
    return [
      {
        rotate: interpolate(
          secondBirdVelocity.value,
          [-500, 500],
          [-0.5, 0.5],
          Extrapolation.CLAMP
        ),
      },
    ];
  });

  // const fontStyle = {
  // fontSize: 40,
  // fontWeight: "bold",
  // };

  // const font = matchFont(fontStyle);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <Canvas style={{ width, height, marginTop: 34 }}>
          <Image
            image={background}
            width={width}
            height={height}
            fit={"cover"}
          />

          <Image
            image={pipe}
            width={PIPE_WIDTH}
            height={PIPE_HEIGTH}
            x={x}
            y={bottomPipeY}
          />
          <Image
            image={pipeup}
            width={PIPE_WIDTH}
            height={PIPE_HEIGTH}
            x={x}
            y={topPipeY}
          />

          <Group transform={birdTransform} origin={birdOrigin}>
            <Image
              image={bird}
              x={birdPos.x}
              y={birdY}
              width={64}
              height={48}
            />
          </Group>

          {/* Second bird */}
          <Group transform={secondBirdTransform} origin={secondBirdOrigin}>
            <Image
              image={secondBird}
              x={birdPos.x}
              y={secondBirdY}
              width={64}
              height={48}
            />
          </Group>

          <Image
            image={base}
            width={width}
            height={100}
            y={height - 100}
            fit={"cover"}
          />
          {/* <Text x={width / 2 - 10} y={100} text={`${score}`} font={font}></Text> */}
        </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
