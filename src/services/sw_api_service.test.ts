import { GetPlanetMovieApparitionService } from './protocols/get_planet_movie_apparition_service'
import { SWAPIService } from './sw_api_service'
const makeSut = (): GetPlanetMovieApparitionService => {
    return new SWAPIService()
}
describe('SWAPI Service Integration', () => {
    test('should return Alderaan movie appartions', async () => {
        const sut = makeSut()
        const response = await sut.getPlanetApparitionsByName('Alderaan')
        expect(response).toBe(2)
    }, 60000)
    test('should return zero on non existent planet movie appartions', async () => {
        const sut = makeSut()
        const response = await sut.getPlanetApparitionsByName('any_planet')
        expect(response).toBe(0)
    }, 60000)
})