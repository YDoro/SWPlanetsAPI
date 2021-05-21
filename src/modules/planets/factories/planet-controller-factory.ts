import { PlanetController } from "../planet-controller"
import planetRepositoryFactory from "./planet-repository-factory"

export default (): PlanetController => {
    const repository = planetRepositoryFactory()
    return new PlanetController(repository)
}