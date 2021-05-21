import { Request, Response, Router } from "express"
import { RequiredFieldValidation } from "../../validators/required-field-validation"
import planetControllerFactory from "./factories/planet-controller-factory"


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
                    return res.status(500).json({ error: 'InternalServerErrror' })
            }
        }

    })

    router.get('/planets', async (req: Request, res: Response) => {
        res.json({ action: "list" })

    })

    router.get('/planets/:search', async (req: Request, res: Response) => {
        res.json({ action: "search" })

    })

    router.delete('/planet/:id', async (req: Request, res: Response) => {
        res.json({ action: "delete" })

    })
}