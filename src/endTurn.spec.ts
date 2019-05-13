import { makeGame, Game } from "./game";
import { endTurn } from "./endTurn";

describe("endTurn", () => {
  it("increments state.currentPlayer", () => {
    let game = makeGame()();

    expect(game.state.currentPlayer).toBe(1);
    endTurn(game);
    expect(game.state.currentPlayer).toBe(2);
  });
});
