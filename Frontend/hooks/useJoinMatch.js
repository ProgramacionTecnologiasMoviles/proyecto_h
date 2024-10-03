import { removeTrailingZeros } from "../services/GameService";
import { add_player_match } from "../services/GameService";

export const useJoinMatch = async (gameId, userId) => {
  body = {
    id: removeTrailingZeros(gameId),
    guessUser: userId,
  };

  try {
    const added = await add_player_match(body);
    return { added };
  } catch (error) {
    return error;
  }
};
