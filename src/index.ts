import mongodb from 'mongodb'
import env from './config/env'

mongodb.connect(env.mongoUrl,{ useUnifiedTopology: true }).then(async ()=>{
    const app =(await import('./config/app')).default
    app.listen(env.port,()=> console.log('Server running on port '+env.port))
}).catch(console.error)