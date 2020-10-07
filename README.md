# Tennis game scoring library

## Requirements

- Node 14.10 (`nvm use` if using nvm)

## Install

- `npm i install`

## Build

- `npm run build`


## Run test suite

- `npm test`


## Usage example

```js
  const tennisGame = new TennisGameScore('playerA', 'playerB');
  tennisGame.scorePoint('playerA');

  tennisGame.gameinfo; // prints out the current game status including score
  ```



## Notes

- You can use the linting command `npm run lint`, the code is using the [Airbnb rules](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
