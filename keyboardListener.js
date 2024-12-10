export default function createKeyboardListener(document, currentPlayerId) {
      
  const state = {
    observers: []
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
      playerId: currentPlayerId,
      keyPressed
    }
    
    notifyAll(command)

  }
  return {
    subscribe
  }
}