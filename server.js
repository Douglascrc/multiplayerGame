import express from 'express'
import http from 'http'
import createGame from './public/game.js'
import socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('public'))

const game = createGame()
game.start()

game.subscribe((command) => {
  sockets.emit(command.type, command)
})

console.log(game.state)

sockets.on('connection', (socket) => {
  const playerId = socket.id
  console.log(`> Player connected on Server with id ${playerId}`)
  game.addPlayer({playerId: playerId})

  socket.emit('setup', game.state)

  socket.on('disconnect', () => {
    game.removePlayer({playerId:playerId})
  })

  socket.on('move-player', (command) => {
    command.playerId = playerId
    command.type = 'move-player'

    game.movePlayer(command)
  })
})

server.listen(8000, () => {
  console.log('Server is running on port:8000')
})
