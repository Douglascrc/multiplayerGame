function createGame() {

  const state = {
  players: {
    'player 1': {x: 1, y:6},
    'player 2': {x: 4, y:2}
  },
  fruits: {
    'fruit': {x: 3, y: 4}
  }
}

  function movePlayer(command) {
    console.log(`Moving ${command.currentPlayerId} with ${command.keyPressed}`)

    const keyPressed = command.keyPressed
    const player = state.players[command.currentPlayerId]

    if (keyPressed === 'ArrowUp' && player.y > screen.height - 10) {
      player.y = player.y -1 
      return
    }
    if (keyPressed === 'ArrowDown' && player.y < screen.height - 1) {
      player.y = player.y + 1
      return
    }
    if (keyPressed === 'ArrowRight' && player.x < screen.width - 1) {
      player.x = player.x + 1
      return
    }
    if (keyPressed === 'ArrowLeft' && player.x > screen.width - 10) {
      player.x = player.x - 1
      return
    }
  }

  return {
    movePlayer,
    state
  }
}