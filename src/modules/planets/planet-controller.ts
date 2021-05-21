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

    async search(query: object): Promise<HttpResponse> {
        const result = await this.repository.search(query)
        return { status: 200, body: result }
    }

    async delete(id: string): Promise<HttpResponse> {
        await this.repository.deletePlanetById(id)
        return { status: 204 }
    }
}
