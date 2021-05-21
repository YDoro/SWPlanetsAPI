import { PlanetController } from './planet-controller'
import { Planet, PlanetModel } from './planet-model'
import { PlanetRepository } from './planet-repository'

describe('PlanetController', () => {

    class PlanetRepositoryStub implements PlanetRepository {
        create(planet: Planet): Promise<PlanetModel> {
            return new Promise(resolve => resolve({ ...planet, _id: 'any_id' }))
        }

    }

    interface SUTTypes {
        sut: PlanetController
        repository: PlanetRepository
    }

    const makeSUT = (): SUTTypes => {
        const repository = new PlanetRepositoryStub()
        const sut = new PlanetController(repository);
        return { repository, sut }
    }

    const planet: Planet = {
        name: 'Alderaan',
        climate: 'temperate',
        terrain: 'grasslands'
    }

    test('should call repository with the given object and return the an HttpReponse', async () => {
        const { sut, repository } = makeSUT();
        const createSpy = jest.spyOn(repository, 'create')
        const promise = sut.create(planet)

        expect(createSpy).toBeCalledWith(planet)
        expect(promise).resolves.toEqual({ status: 201, body: { ...planet, _id: 'any_id' } })

    })

    test('should throw if repository throws', async () => {
        const { sut, repository } = makeSUT();
        jest.spyOn(repository, 'create').mockRejectedValueOnce(new Error('mocked error'))

        const promise = sut.create(planet)

        expect(promise).rejects.toThrowError('mocked error')

    })
})