import { SWAPIService } from "../../../services/sw_api_service"
import { PlanetController } from "../planet-controller"
import planetRepositoryFactory from "./planet-repository-factory"

export default (): PlanetController => {
    const repository = planetRepositoryFactory()
    const movieApparitionService = new SWAPIService()
    return new PlanetController(repository, movieApparitionService)
}