export default function createGame() {
  const state = {
    players: {},
    fruits: {},
    screen: {
      width: 10,
      height: 10
    }
  };

  function start() {
    const frequency = 2000

    setInterval(addFruit, frequency)
  }

  const observers = []

  function subscribe(observerFunction) {
    observers.push(observerFunction)
  }

  function notifyAll(command) {
    for (const observerFunction of observers) {
      observerFunction(command)
    }
  }

  function setState(newState) {
    Object.assign(state, newState)
  }

  function addPlayer(command) {
    const playerId = command.playerId;
    const playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random() * state.screen.width)
    const playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random() * state.screen.height)

    state.players[playerId] = {
      x: playerX,
      y: playerY
    };

    notifyAll({
      type:'add-player',
      playerId: playerId,
      playerX: playerX,
      playerY: playerY
    })
  }

  function addFruit(command) {

    const fruitId = command ? command.fruitId : Math.floor(Math.random() * 10000000)
    const fruitX = command ? command.fruitX : Math.floor(Math.random() * state.screen.width)
    const fruitY = command ? command.fruitY : Math.floor(Math.random() * state.screen.height)

    state.fruits[fruitId] = {
      x: fruitX,
      y: fruitY 
    };

    notifyAll({
      type: 'add-fruit',
      fruitId: fruitId,
      fruitX: fruitX,
      fruitY: fruitY
    })
  }

  function removePlayer(command) {
    const playerId = command.playerId;

    delete state.players[playerId];

    notifyAll({
      type:'remove-player',
      playerId: playerId
    })

  }

  function movePlayer(command) {
    notifyAll(command)
    console.log(`Moving ${command.playerId} with ${command.keyPressed}`);
    

    const acceptedMoves = {
      ArrowUp(player) {
        if (player.y - 1 >= 0) {
          player.y = player.y - 1
        }
      },
      ArrowRight(player) {
        if (player.x + 1 < state.screen.width) {
          player.x = player.x + 1
        }
      },
      ArrowDown(player) {
        if (player.y + 1 < state.screen.height) {
          player.y = player.y + 1
        }
      },
      ArrowLeft(player) {
        if (player.x - 1 >= 0 ) {
          player.x = player.x - 1
        }
      }
    }

    const keyPressed = command.keyPressed;
    const moveFunction = acceptedMoves[keyPressed];
    const player = state.players[command.playerId]

    if(moveFunction && player) {
      moveFunction(player)
      checkColision()
    }
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
    state,
    setState,
    subscribe
  };
}