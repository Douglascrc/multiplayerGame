export default function createGame() {
  const state = {
    players: {},
    fruits: {},
    screen: {
      width: 10,
      height: 10
    }
  };

  function addPlayer(command) {
    const playerId = command.playerId;
    const playerX = command.playerX;
    const playerY = command.playerY;

    state.players[playerId] = {
      x: playerX,
      y: playerY
    };
  }

  function addFruit(command) {
    const gridSize = 10;

    const fruitId = command.fruitId;
    const fruitX = Math.floor(Math.random() * (screen.width / gridSize));
    const fruitY = Math.floor(Math.random() * (screen.height / gridSize));

    state.fruits[fruitId] = {
      x: fruitX * gridSize,
      y: fruitY * gridSize
    };
  }

  function removePlayer(command) {
    const playerId = command.playerId;

    delete state.players[playerId];
  }

  function movePlayer(command) {
    console.log(`Moving ${command.playerId} with ${command.keyPressed}`);
    const keyPressed = command.keyPressed;
    const player = state.players[command.playerId];
    
    if (!player) {
      return;
    }

    if (keyPressed === 'ArrowUp' && player.y > 0) {
      player.y = player.y - 1;
      return
    }
    if (keyPressed === 'ArrowDown' && player.y < state.screen.height - 1) {
      player.y = player.y + 1;
      return
    }
    if (keyPressed === 'ArrowRight' && player.x < state.screen.width - 1) {
      player.x = player.x + 1;
      return
    }
    if (keyPressed === 'ArrowLeft' && player.x > 0) {
      player.x = player.x - 1;
      return
    }

    checkColision();
  }

  function checkColision() {
    for (const playerId in state.players) {
      const player = state.players[playerId];
      for (const fruitId in state.fruits) {
        const fruit = state.fruits[fruitId];
        if (fruit.x === player.x && fruit.y === player.y) {
          console.log(`Player ${playerId} collected fruit`);
          delete state.fruits[fruitId];
        }
      }
    }
  }

  return {
    addPlayer,
    addFruit,
    removePlayer,
    movePlayer,
    state
  };
}