import "./styles.scss";

import { makeGame, Game, MAX_PLAYERS } from "./game";

import { endTurn } from "./endTurn";

function render(game: Game) {
  const {
    setState,
    state: { currentPlayer, resources }
  } = game;

  const currentPlayerResources = resources[currentPlayer - 1];

  console.log(game.state);

  const appRoot = document.getElementById("app");
  appRoot.innerHTML = `
    <h1>Gra Kuby™</h1>
    <main>
      <header class="game-header">
        <ul>
          <li>Player: ${currentPlayer}</li>
          <li>
            <button class="js-end-turn-button">end turn</button> 
          </li>
        </ul>
      </header>
      <section class="map-placeholder">
        (( Tu będzie mapa ))
      </section>
      <section class="bottom-bar">
        <section class="action-cards">        
          <button class="action-card" id="send-craft">send craft</button>
          <button class="action-card" id="wage-war">wage war</button>
          <button class="action-card" id="collect-resources">collect resources</button>
        </section>
        <table class="resources">
          <thead>
            <tr>
                <th colspan="2">Zasoby</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(currentPlayerResources)
              .map(
                ([key, val]) => `
                  <tr>
                    <td><strong>${key}</strong></td>
                    <td>${val}</td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
      </section>
    </main>
  `;

  const endTurnButtons = document.querySelectorAll(".js-end-turn-button");
  if (endTurnButtons) {
    endTurnButtons.forEach(btn => {
      btn.addEventListener("click", () => endTurn(game));
    });
  }

  const collectResourcesButton = document.getElementById("collect-resources");
  collectResourcesButton.addEventListener("click", () => {
    const newResources = [...resources];
    newResources[currentPlayer - 1] = {
      ...currentPlayerResources,
      energy: currentPlayerResources.energy + 2
    };
    setState({ resources: newResources });

    console.log({
      currentPlayerResources,
      newCr: newResources[currentPlayer - 1]
    });
  });
}

const run = makeGame(render);
run();
