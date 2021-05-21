import axios, { AxiosInstance } from "axios";
import { GetPlanetMovieApparitionService } from "./protocols/get_planet_movie_apparition_service";
interface SWAPIPlanet {
    name: string
    rotation_period: string
    orbital_period: string
    diameter: string
    climate: string
    gravity: string
    terrain: string
    surface_water: string
    population: string
    residents: string[]
    films: string[]
    created: string
    edited: string
    url: string
}
export class SWAPIService implements GetPlanetMovieApparitionService {
    private readonly http: AxiosInstance
    constructor() {
        this.http = axios.create({ baseURL: 'https://swapi.dev' })
    }
    async getPlanetApparitionsByName(name: string): Promise<number> {

        let returnedLength = 1
        let page = 1
        let movieApparitions = 0

        while (returnedLength > 0) {
            let returnedplanets = await this.getPlanets(page)
            returnedLength = returnedplanets.length
            returnedplanets.forEach((planet) => {
                if (planet.name.toLowerCase() === name.toLowerCase()) {
                    movieApparitions = planet.films.length
                    returnedLength = 0
                }
            })
            page++
        }
        return movieApparitions

    }

    private async getPlanets(page: number): Promise<Array<SWAPIPlanet>> {
        try {
            const response = await this.http.get('/api/planets/?page=' + page, { validateStatus: (status) => status === 200 })
            return response.data.results
        } catch (e) {
            return []
        }
    }

}