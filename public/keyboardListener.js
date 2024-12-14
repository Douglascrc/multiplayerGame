export default function createKeyboardListener(document) {
      
  const state = {
    observers: [],
    playerId:null
  }

  function registerPlayerId(currentPlayerId) {
    state.playerId = currentPlayerId
  }
  
  function subscribe(observerFunction) {
    state.observers.push(observerFunction)
  }
  
  function notifyAll(command) {
    console.log(`Notifing ${state.observers.length} observers`)
    
    for (const observerFunction of state.observers) {
      observerFunction(command)
    }
  }
  
  document.addEventListener('keydown', handleKeydown)
  
  function handleKeydown(event) {
    const keyPressed = event.key
    
    const command = {
      type: 'move-player', // torna o comando rastreável dentro do sistema
      playerId: state.playerId,
      keyPressed
    }
    
    notifyAll(command)

  }
  return {
    subscribe,
    registerPlayerId
  }
}