import app from './src/main/server'

app.bootstrap().then((server) => {
  console.log(`Server running on ${JSON.stringify(server.address())}`)
})
