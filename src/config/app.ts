import express from 'express'
import configRoutes from './routes';
const app = express()
configRoutes(app);
export default app