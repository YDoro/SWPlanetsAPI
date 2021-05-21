import { PlanetRepository } from "../planet-repository"
import { PlanetMongoRepository } from "../planet-repository-mongo"

export default (): PlanetRepository => {
    return new PlanetMongoRepository()
}