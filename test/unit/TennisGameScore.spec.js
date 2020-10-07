import { expect } from 'chai';
import TennisGameScore from '../../src';

describe('TennisGameScore', () => {
  it('will return a 0 - 0 score and the correct game info when the players have not scored any points', () => {
    const tennisGame = new TennisGameScore('playerA', 'playerB');

    expect(tennisGame.gameinfo).to.deep.equal({
      gameStatus: 'IN_PROGRESS',
      players: ['playerA', 'playerB'],
      score: {
        playerA: 'ZERO',
        playerB: 'ZERO',
      },
      winnerId: null,
    });
  });

  it('will return the correct game status and winner when the second player has won 40 to 30', () => {
    const tennisGame = new TennisGameScore('playerA', 'playerB');
    tennisGame.scorePoint('playerA');
    tennisGame.scorePoint('playerA');

    tennisGame.scorePoint('playerB');
    tennisGame.scorePoint('playerB');
    tennisGame.scorePoint('playerB');
    tennisGame.scorePoint('playerB');

    expect(tennisGame.gameinfo).to.deep.equal({
      gameStatus: 'PLAYER_2_WIN',
      players: ['playerA', 'playerB'],
      score: null,
      winnerId: 'playerB',
    });
  });

  it('will return a 40 - 40 score (Deuce) and correct game info when the both players have scored 3 times', () => {
    const tennisGame = new TennisGameScore('playerA', 'playerB');
    tennisGame.scorePoint('playerA');
    tennisGame.scorePoint('playerA');
    tennisGame.scorePoint('playerA');

    tennisGame.scorePoint('playerB');
    tennisGame.scorePoint('playerB');
    tennisGame.scorePoint('playerB');

    expect(tennisGame.gameinfo).to.deep.equal({
      gameStatus: 'IN_PROGRESS',
      players: ['playerA', 'playerB'],
      score: {
        playerA: 'FORTY',
        playerB: 'FORTY',
      },
      winnerId: null,
    });
  });

  it('will return the score (A - 40) info when one player has advantage', () => {
    const tennisGame = new TennisGameScore('playerA', 'playerB');
    tennisGame.scorePoint('playerA');
    tennisGame.scorePoint('playerA');
    tennisGame.scorePoint('playerA');

    tennisGame.scorePoint('playerB');
    tennisGame.scorePoint('playerB');
    tennisGame.scorePoint('playerB');

    tennisGame.scorePoint('playerA');

    expect(tennisGame.gameinfo).to.deep.equal({
      gameStatus: 'IN_PROGRESS',
      players: ['playerA', 'playerB'],
      score: {
        playerA: 'ADVANTAGE',
        playerB: 'FORTY',
      },
      winnerId: null,
    });
  });

  it('will return the score (40 - 40) when one player has advantage and then loses the advantage', () => {
    const tennisGame = new TennisGameScore('playerA', 'playerB');
    tennisGame.scorePoint('playerA');
    tennisGame.scorePoint('playerA');
    tennisGame.scorePoint('playerA');

    tennisGame.scorePoint('playerB');
    tennisGame.scorePoint('playerB');
    tennisGame.scorePoint('playerB');

    tennisGame.scorePoint('playerA');
    tennisGame.scorePoint('playerB');

    expect(tennisGame.gameinfo).to.deep.equal({
      gameStatus: 'IN_PROGRESS',
      players: ['playerA', 'playerB'],
      score: {
        playerA: 'FORTY',
        playerB: 'FORTY',
      },
      winnerId: null,
    });
  });

  it('will return the correct game status and winner when one player has advantage then scores', () => {
    const tennisGame = new TennisGameScore('playerA', 'playerB');
    tennisGame.scorePoint('playerA');
    tennisGame.scorePoint('playerA');
    tennisGame.scorePoint('playerA');

    tennisGame.scorePoint('playerB');
    tennisGame.scorePoint('playerB');
    tennisGame.scorePoint('playerB');

    tennisGame.scorePoint('playerA');
    tennisGame.scorePoint('playerA');

    expect(tennisGame.gameinfo).to.deep.equal({
      gameStatus: 'PLAYER_1_WIN',
      players: ['playerA', 'playerB'],
      score: null,
      winnerId: 'playerA',
    });
  });

  it('will handle multiple games at once and return the correct score for both', () => {
    const tennisGame1 = new TennisGameScore('playerA', 'playerB');
    const tennisGame2 = new TennisGameScore('playerA', 'playerB');

    tennisGame1.scorePoint('playerA');
    tennisGame1.scorePoint('playerA');
    tennisGame1.scorePoint('playerA');
    tennisGame1.scorePoint('playerB');
    tennisGame1.scorePoint('playerB');
    tennisGame1.scorePoint('playerB');
    tennisGame1.scorePoint('playerA');
    tennisGame1.scorePoint('playerA');

    tennisGame2.scorePoint('playerA');
    tennisGame2.scorePoint('playerA');
    tennisGame2.scorePoint('playerA');

    tennisGame2.scorePoint('playerB');
    tennisGame2.scorePoint('playerB');
    tennisGame2.scorePoint('playerB');

    expect(tennisGame1.gameinfo).to.deep.equal({
      gameStatus: 'PLAYER_1_WIN',
      players: ['playerA', 'playerB'],
      score: null,
      winnerId: 'playerA',
    });

    expect(tennisGame2.gameinfo).to.deep.equal({
      gameStatus: 'IN_PROGRESS',
      players: ['playerA', 'playerB'],
      score: {
        playerA: 'FORTY',
        playerB: 'FORTY',
      },
      winnerId: null,
    });
  });

  it('will throw an error if the scoring player id is invalid', () => {
    const tennisGame = new TennisGameScore('playerA', 'playerB');

    expect(() => tennisGame.scorePoint('otherId')).to.throw(Error, 'INVALID_PLAYER_ID');
  });

  it('will throw an error trying to score after the game is over', () => {
    const tennisGame = new TennisGameScore('playerA', 'playerB');
    tennisGame.scorePoint('playerA');
    tennisGame.scorePoint('playerA');
    tennisGame.scorePoint('playerA');

    tennisGame.scorePoint('playerB');
    tennisGame.scorePoint('playerB');
    tennisGame.scorePoint('playerB');

    tennisGame.scorePoint('playerA');
    tennisGame.scorePoint('playerA');

    expect(() => tennisGame.scorePoint('playerA')).to.throw(Error, 'ERR_SCORING_AFTER_GAME_FINISHED');
  });
});
