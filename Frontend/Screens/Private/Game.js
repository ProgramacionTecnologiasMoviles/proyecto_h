import {
  Canvas,
  useImage,
  Image,
  Group,
  Circle,
  Text,
} from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/WebSocketContext";
import { useContext } from "react";

const GRAVITY = 800;
const JUMP_FORCE = -400;
const PIPE_WIDTH = 104;
const PIPE_HEIGTH = 640;

export default function Game({ route }) {
  const navigation = useNavigation();
  const { ws } = useWebSocket();
  const { hostPlayer } = route.params;
  const { width, height } = { width: 390, height: 838 };
  const [score, setScore] = useState(0);
  const [loser, setLoser] = useState(false);
  const { user } = useContext(AuthContext);

  const pipeOffset = useSharedValue(0);
  const topPipeY = useDerivedValue(() => pipeOffset.value - 320);
  const bottomPipeY = useDerivedValue(() => height - 320 + pipeOffset.value);
  const birdY = useSharedValue(height / 3);
  const x = useSharedValue(width);

  useEffect(() => {
    moveTheMap();
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (hostPlayer) {
        if (data.secondPlayerTab) {
          secondBirdY.value = Number(data.secondPlayerTab);
          secondBirdVelocity.value = JUMP_FORCE;
        }
      } else {
        if (data.pipeOffset) {
          pipeOffset.value = Number(data.pipeOffset);
        }
        if (data.firstPlayerTab) {
          secondBirdY.value = Number(data.firstPlayerTab);
          secondBirdVelocity.value = JUMP_FORCE;
        }
      }

      if (data.gameOver) {
        navigation.navigate("Score", { loser: data.gameOver });
        ws.close();
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

      if (currentValue < -110 && previousValue > -110 && hostPlayer) {
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
  useAnimatedReaction(
    () => birdY.value,
    (currentValue, previousValue) => {
      // ground collision detection
      if (currentValue > height - 150 || currentValue < 0) {
        runOnJS(sendValueToWebSocket)("gameOver", user.id);
      }

      const isColliding = obstacles.value.some((rect) =>
        isPointCollidingWithRect(
          { x: birdCenterX.value, y: birdCenterY.value },
          rect
        )
      );

      if (isColliding) {
        runOnJS(sendValueToWebSocket)("gameOver", user.id);
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
    if (!dt) {
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
      runOnJS(sendValueToWebSocket)("firstPlayerTab", birdY.value);
    } else {
      runOnJS(sendValueToWebSocket)("secondPlayerTab", birdY.value);
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
        </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
