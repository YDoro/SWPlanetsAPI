export interface Planet {
    name: string
    climate: string,
    terrain: string,
    movieApparitions?: number
}
export interface PlanetModel extends Planet {
    id: string
}

export const PlanetModelSeachableParams = ['name', 'climate', 'terrain', '_id', 'movieApparitions']