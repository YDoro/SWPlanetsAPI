import { Request, Response, Router } from "express"
import { MongoIdValidation } from "../../validators/mongo-id-validation"
import { RequiredFieldValidation } from "../../validators/required-field-validation"
import { SearchValidation } from "../../validators/search-validation"
import planetControllerFactory from "./factories/planet-controller-factory"
import { PlanetModelSeachableParams } from "./planet-model"

export default (router: Router): void => {

    router.post('/planets', async (req: Request, res: Response) => {
        const planet = { name: req.body.name, climate: req.body.climate, terrain: req.body.terrain }
        try {
            //perform some validations
            RequiredFieldValidation(planet, 'name')
            RequiredFieldValidation(planet, 'climate')
            RequiredFieldValidation(planet, 'terrain')

            const response = await planetControllerFactory().create(planet)

            return res.status(response.status).json(response.body)

        } catch (e) {
            switch (e.name) {
                case 'RequiredFieldError':
                    return res.status(400).json({ error: 'ValidationError', ...e })
                default:
                    console.error(e)
                    return res.status(500).json({ error: 'InternalServerErrror' })
            }
        }

    })

    router.get('/planets', async (req: Request, res: Response) => {
        try {
            const response = await planetControllerFactory().list()
            return res.status(response.status).json(response.body)
        } catch (e) {
            console.error(e)
            return res.status(500).json({ error: 'InternalServerErrror' })
        }

    })

    router.get('/planets/*', async (req: Request, res: Response) => {
        try {
            const params = req.params[0].split('/')

            const search = SearchValidation(PlanetModelSeachableParams, params)

            const response = await planetControllerFactory().search(search)

            return res.status(response.status).json(response.body)
        } catch (e) {
            switch (e.name) {
                case 'InvalidParamError':
                    return res.status(400).json({ error: 'ValidationError', ...e })
                default:
                    console.error(e)
                    return res.status(500).json({ error: 'InternalServerErrror' })
            }
        }

    })

    router.delete('/planets/:id', async (req: Request, res: Response) => {
        try {
            MongoIdValidation(req.params.id)
            const response = await planetControllerFactory().delete(req.params.id)
            res.status(response.status).json(response.body)
        } catch (e) {
            switch (e.name) {
                case 'InvalidParamError':
                    return res.status(400).json({ error: 'ValidationError', ...e })
                default:
                    console.error(e)
                    return res.status(500).json({ error: 'InternalServerErrror' })
            }
        }
    })
}