import { Planet, PlanetModel } from "./planet-model"

export interface PlanetRepository {
    create(planet: Planet): Promise<PlanetModel>
    list(): Promise<Array<PlanetModel>>
}