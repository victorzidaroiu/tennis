export const points = {
  ZERO: 0,
  FIFTEEN: 1,
  THIRTY: 2,
  FORTY: 3,
  ADVANTAGE: 4,
};

const pointsList = Object.keys(points);
export const pointValueToDef = (point) => pointsList[point];

export const gameStatus = {
  IN_PROGRESS: 'IN_PROGRESS',
  PLAYER_1_WIN: 'PLAYER_1_WIN',
  PLAYER_2_WIN: 'PLAYER_2_WIN',
};

export const errors = {
  ERR_INVALID_PLAYER_ID: 'ERR_INVALID_PLAYER_ID',
  ERR_SCORING_AFTER_GAME_FINISHED: 'ERR_SCORING_AFTER_GAME_FINISHED',
};
