import { GetPlanetMovieApparitionService } from '../../services/protocols/get_planet_movie_apparition_service'
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

        deletePlanetById(id: string): Promise<void> {
            return new Promise(resolve => resolve())
        }

        getPlanetByName(name: string): Promise<PlanetModel> {
            return new Promise(resolve => resolve(null))
        }

    }
    class PlanetMovieApparitionServiceStub implements GetPlanetMovieApparitionService {
        async getPlanetApparitionsByName(name: string): Promise<number> {
            return await new Promise(resolve => resolve(1))
        }

    }

    interface SUTTypes {
        sut: PlanetController
        repository: PlanetRepository
        getPlanetMovieApparitionService: GetPlanetMovieApparitionService
    }

    const makeSUT = (): SUTTypes => {
        const repository = new PlanetRepositoryStub()
        const getPlanetMovieApparitionService = new PlanetMovieApparitionServiceStub()
        const sut = new PlanetController(repository, getPlanetMovieApparitionService)
        return { repository, sut, getPlanetMovieApparitionService }
    }

    const planet: Planet = {
        name: 'Alderaan',
        climate: 'temperate',
        terrain: 'grasslands'
    }
    describe('create', () => {
        test('should call repository and service with the given objects and return the an HttpReponse', async () => {
            const { sut, repository, getPlanetMovieApparitionService } = makeSUT()
            const createSpy = jest.spyOn(repository, 'create')
            const getApparitionSpy = jest.spyOn(getPlanetMovieApparitionService, 'getPlanetApparitionsByName')

            const promise = sut.create(planet)
            await expect(promise).resolves.toEqual({ status: 201, body: { ...planet, id: 'any_id', movieApparitions: 1 } })
            expect(getApparitionSpy).toBeCalledWith(planet.name)
            expect(createSpy).toBeCalledWith({ ...planet, movieApparitions: 1 })
        })

        test('should not call repository create or service if planet already exists', async () => {
            const { sut, repository, getPlanetMovieApparitionService } = makeSUT()
            jest.spyOn(repository, 'getPlanetByName').mockResolvedValueOnce({ ...planet, id: 'any_id' })
            const createSpy = jest.spyOn(repository, 'create')
            const getApparitionSpy = jest.spyOn(getPlanetMovieApparitionService, 'getPlanetApparitionsByName')

            const promise = sut.create(planet)
            await expect(promise).resolves.toEqual({ status: 200, body: { ...planet, id: 'any_id' } })
            expect(getApparitionSpy).not.toBeCalled()
            expect(createSpy).not.toBeCalled()
        })

        test('should throw if repository throws', async () => {
            const { sut, repository } = makeSUT()
            jest.spyOn(repository, 'create').mockRejectedValueOnce(new Error('mocked error'))
            const promise = sut.create(planet)
            await expect(promise).rejects.toThrowError('mocked error')
        })

        test('should throw if service throws', async () => {
            const { sut, getPlanetMovieApparitionService } = makeSUT()
            jest.spyOn(getPlanetMovieApparitionService, 'getPlanetApparitionsByName').mockRejectedValueOnce(new Error('mocked error'))
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

    describe('delete', () => {
        test('should call repository and return a 204 response', async () => {
            const { sut, repository } = makeSUT()
            const deleteSpy = jest.spyOn(repository, 'deletePlanetById')
            const promise = sut.delete('any_value')
            expect(deleteSpy).toBeCalledWith('any_value')
            await expect(promise).resolves.toEqual({ status: 204 })
        })

        test('should throw if repository throws', async () => {
            const { sut, repository } = makeSUT()
            jest.spyOn(repository, 'deletePlanetById').mockRejectedValueOnce(new Error('mocked error'))
            const promise = sut.delete('any_id')
            await expect(promise).rejects.toThrowError('mocked error')
        })
    })

})