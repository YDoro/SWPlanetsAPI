import { Planet, PlanetModel } from "./planet-model"

export interface PlanetRepository {
    create(planet: Planet): Promise<PlanetModel>
    list(): Promise<Array<PlanetModel>>
    search(query: object): Promise<Array<PlanetModel>>
    deletePlanetById(id: string): Promise<void>;
    getPlanetByName(name: string): Promise<PlanetModel>

}