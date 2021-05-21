export interface Planet {
    name: string
    climate: string,
    terrain: string
}
export interface PlanetModel extends Planet {
    id: string
}