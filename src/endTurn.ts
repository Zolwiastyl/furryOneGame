import { Game, MAX_PLAYERS } from "./game";

export function endTurn(game: Game) {
  const {
    setState,
    state: { currentPlayer }
  } = game;

  setState({
    currentPlayer: (currentPlayer % MAX_PLAYERS) + 1
  });
}
