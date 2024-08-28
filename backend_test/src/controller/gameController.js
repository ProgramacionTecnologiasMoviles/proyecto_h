const getGame = async (req, res) => {
  const gameId = Math.floor(Math.random() * 9999);
  return res.status(202).json({ data: { gameId: gameId } });
};

module.exports = { getGame };
