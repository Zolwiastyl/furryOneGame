function noop() {
  // no operation
}

export const MAX_PLAYERS = 4;

const initialResources = {
  money: 0,
  energy: 0,
  people: 0,
  tools: 0
};

const initialState = {
  currentPlayer: 1,
  resources: new Array(MAX_PLAYERS).fill(initialResources)
};

export type GameState = typeof initialState;

export type Game = {
  state: GameState;
  setState: (newState: Partial<GameState>) => void;
};

export function makeGame(afterStateChange: (_: Game) => void = noop) {
  const state = { ...initialState };

  function setState(newState: Partial<GameState>) {
    for (const key in newState) {
      state[key] = newState[key];
    }

    afterStateChange({
      state,
      setState
    });
  }

  return function runGame() {
    console.log("Initializing game.");

    const game = {
      state,
      setState
    };

    afterStateChange(game);
    return game;
  };
}
