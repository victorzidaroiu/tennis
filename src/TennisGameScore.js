import {
  points, gameStatus, errors, pointValueToDef,
} from './config';

const TennisGameScore = class {
  constructor(player1Id, player2Id) {
    this.gameStatus = gameStatus.IN_PROGRESS;

    this.player1 = {
      score: 0,
      id: player1Id,
    };

    this.player2 = {
      score: 0,
      id: player2Id,
    };
  }

  updateWinnerStatus(winnerId) {
    this.gameStatus = this.player1.id === winnerId
      ? gameStatus.PLAYER_1_WIN : gameStatus.PLAYER_2_WIN;
  }

  setPlayerScore(player, score) {
    if (player === this.player1) {
      this.player1.score = score;
    } else {
      this.player2.score = score;
    }
  }

  updateScore(scoringPlayer, opponent) {
    switch (scoringPlayer.score) {
      case points.ZERO:
      case points.FIFTEEN:
      case points.THIRTY:
        this.setPlayerScore(scoringPlayer, scoringPlayer.score + 1);

        return this.gameinfo;

      case points.FORTY:
        switch (opponent.score) {
          case points.ZERO:
          case points.FIFTEEN:
          case points.THIRTY:
            this.updateWinnerStatus(scoringPlayer.id);
            break;

          case points.FORTY:
            this.setPlayerScore(scoringPlayer, scoringPlayer.score + 1);
            break;

          case points.ADVANTAGE:
            this.setPlayerScore(opponent, points.FORTY);
            break;

          default:
        }
        break;

      case points.ADVANTAGE:
        this.updateWinnerStatus(scoringPlayer.id);
        break;

      default:
    }

    return this.gameinfo;
  }

  scorePoint(playerId) {
    if (this.gameStatus !== gameStatus.IN_PROGRESS) {
      throw new Error(errors.ERR_SCORING_AFTER_GAME_FINISHED);
    }

    if (this.player1.id === playerId) {
      return this.updateScore(this.player1, this.player2);
    }

    if (this.player2.id === playerId) {
      return this.updateScore(this.player2, this.player1);
    }

    throw new Error(errors.ERR_INVALID_PLAYER_ID);
  }

  get gameinfo() {
    const score = {
      [this.player1.id]: pointValueToDef(this.player1.score),
      [this.player2.id]: pointValueToDef(this.player2.score),
    };

    const gameInfo = {
      gameStatus: this.gameStatus,
      players: [this.player1.id, this.player2.id],
      score: this.gameStatus === gameStatus.IN_PROGRESS ? score : null,
    };

    if (this.gameStatus !== gameStatus.IN_PROGRESS) {
      gameInfo.winnerId = this.gameStatus === gameStatus.PLAYER_1_WIN
        ? this.player1.id : this.player2.id;
    } else {
      gameInfo.winnerId = null;
    }

    return gameInfo;
  }
};

export default TennisGameScore;
