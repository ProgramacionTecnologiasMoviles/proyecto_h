import { create_match } from "../services/GameService";

export const useCreateMatch = async (user, credits) => {
  body = {
    hostUser: user.id,
    game: 1,
    creditsbetted: credits,
  };

  try {
    const gameId = await create_match(body);
    return { gameId };
  } catch (error) {
    return error;
  }
};
