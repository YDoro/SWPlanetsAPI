import { PlanetController } from './planet-controller'
import { Planet, PlanetModel } from './planet-model'
import { PlanetRepository } from './planet-repository'

describe('PlanetController', () => {

    class PlanetRepositoryStub implements PlanetRepository {

        create(planet: Planet): Promise<PlanetModel> {
            return new Promise(resolve => resolve({ ...planet, id: 'any_id' }))
        }

        list(): Promise<PlanetModel[]> {
            return new Promise(resolve => resolve([{ ...planet, id: 'any_id' }]))
        }

        search(query: object): Promise<PlanetModel[]> {
            return new Promise(resolve => resolve([{ ...planet, id: 'any_id' }]))
        }

    }

    interface SUTTypes {
        sut: PlanetController
        repository: PlanetRepository
    }

    const makeSUT = (): SUTTypes => {
        const repository = new PlanetRepositoryStub()
        const sut = new PlanetController(repository)
        return { repository, sut }
    }

    const planet: Planet = {
        name: 'Alderaan',
        climate: 'temperate',
        terrain: 'grasslands'
    }
    describe('create', () => {
        test('should call repository with the given object and return the an HttpReponse', async () => {
            const { sut, repository } = makeSUT()
            const createSpy = jest.spyOn(repository, 'create')
            const promise = sut.create(planet)

            expect(createSpy).toBeCalledWith(planet)
            await expect(promise).resolves.toEqual({ status: 201, body: { ...planet, id: 'any_id' } })

        })

        test('should throw if repository throws', async () => {
            const { sut, repository } = makeSUT()
            jest.spyOn(repository, 'create').mockRejectedValueOnce(new Error('mocked error'))
            const promise = sut.create(planet)
            await expect(promise).rejects.toThrowError('mocked error')
        })
    })

    describe('list', () => {
        test('should call repository and return a 200 response', async () => {
            const { sut, repository } = makeSUT()
            const listSpy = jest.spyOn(repository, 'list')
            const promise = sut.list()
            expect(listSpy).toBeCalledWith()
            await expect(promise).resolves.toEqual({ status: 200, body: [{ ...planet, id: 'any_id' }] })
        })

        test('should throw if repository throws', async () => {
            const { sut, repository } = makeSUT()
            jest.spyOn(repository, 'list').mockRejectedValueOnce(new Error('mocked error'))
            const promise = sut.list()
            await expect(promise).rejects.toThrowError('mocked error')
        })
    })

    describe('search', () => {
        test('should call repository and return a 200 response', async () => {
            const { sut, repository } = makeSUT()
            const searchSpy = jest.spyOn(repository, 'search')
            const promise = sut.search({ name: 'alderaan' })
            expect(searchSpy).toBeCalledWith({ name: 'alderaan' })
            await expect(promise).resolves.toEqual({ status: 200, body: [{ ...planet, id: 'any_id' }] })
        })

        test('should throw if repository throws', async () => {
            const { sut, repository } = makeSUT()
            jest.spyOn(repository, 'search').mockRejectedValueOnce(new Error('mocked error'))
            const promise = sut.search({ name: 'tattoine' })
            await expect(promise).rejects.toThrowError('mocked error')
        })
    })

})