/* istanbul ignore file */
import { MongoHelper } from './config/database'
import env from './config/env'

MongoHelper.connect(env.mongoUrl).then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log('Server running on port ' + env.port))
}).catch(console.error)