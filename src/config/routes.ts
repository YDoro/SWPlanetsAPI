import { Express, Router } from 'express'
import planets from '../modules/planets/planet-routes'

export default (app: Express): void => {
    const router = Router()
    app.use('/api', router)
    planets(router)
}