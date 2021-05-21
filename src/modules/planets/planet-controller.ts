import { HttpResponse } from "../../protocols/http"
import { Planet } from "./planet-model"
import { PlanetRepository } from "./planet-repository"



export class PlanetController {
    constructor(
        private readonly repository: PlanetRepository
    ) { }

    async create(planet: Planet): Promise<HttpResponse> {
        const dbPlanet = await this.repository.create(planet)
        return { status: 201, body: dbPlanet }
    }

    async list(): Promise<HttpResponse> {
        const planets = await this.repository.list()
        return { status: 200, body: planets }
    }
}
