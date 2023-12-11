import app from './app'
import configs from './config'

app.listen(configs.port)

console.log(`Server listening on port ${configs.port}`)