export interface GetPlanetMovieApparitionService {
    getPlanetApparitionsByName(name: string): Promise<number>
}