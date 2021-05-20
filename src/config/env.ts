export default {
 mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/swplanets-api',
 port: process.env.PORT || 3001,
}