import env from '../../config/env'
import { MongoHelper } from '../../config/database'
import { Planet } from './planet-model'
import { PlanetMongoRepository } from './planet-repository-mongo'
import { MongoError } from 'mongodb'

describe('PlanetMongoRepository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(env.mongoUrl)
    })
    afterAll(async () => {
        await MongoHelper.disconnect()
    })
    const sut = new PlanetMongoRepository()

    const planet: Planet = {
        name: 'Alderaan',
        climate: 'temperate',
        terrain: 'grasslands'
    }

    describe('Create', () => {
        test('should return the created planet', async () => {
            const promise = sut.create(planet)
            await expect(promise).resolves.toHaveProperty('id')
        })
        test('should throw if database is not connected', async () => {
            const promise = sut.create(planet)
            await MongoHelper.disconnect()
            await expect(promise).rejects.toBeInstanceOf(MongoError)
        })
    })
    describe('List', () => {
        test('should return the list of planets', async () => {
            await (await MongoHelper.getCollection('planets')).deleteMany({})
            await sut.create(planet)
            const promise = sut.list()
            await expect(promise).resolves.toHaveLength(1)
        })
        test('should return empty on not found', async () => {
            await (await MongoHelper.getCollection('planets')).deleteMany({})
            const promise = sut.list()
            await expect(promise).resolves.toHaveLength(0)
        })
        test('should throw on any error', async () => {
            const promise = sut.list()
            await MongoHelper.disconnect()
            await expect(promise).rejects.toBeInstanceOf(Error)
        })
    })
    describe('Search', () => {
        test('should return the list matches planets', async () => {
            await (await MongoHelper.getCollection('planets')).deleteMany({})
            await sut.create(planet)
            await sut.create({ name: 'tatooine', climate: planet.climate, terrain: planet.terrain })
            const promise = sut.search({ climate: planet.climate })
            await expect(promise).resolves.toHaveLength(2)
        })
        test('should empty on not found', async () => {
            await (await MongoHelper.getCollection('planets')).deleteMany({})
            const promise = sut.search({ climate: planet.climate })
            await expect(promise).resolves.toHaveLength(0)
        })
        test('should throw on any error', async () => {
            const promise = sut.search({ name: 'deathstar' })
            await MongoHelper.disconnect()
            await expect(promise).rejects.toBeInstanceOf(Error)
        })
        describe('Delete', () => {
            test('should delete planet if it exists', async () => {
                await (await MongoHelper.getCollection('planets')).deleteMany({})
                await sut.create(planet)
                const dbplanet = await sut.search(planet)
                await sut.deletePlanetById('' + dbplanet[0].id)
                expect(true).toBeTruthy()
            })
            test('shold not throw if object does not exists', async () => {
                await (await MongoHelper.getCollection('planets')).deleteMany({})
                await sut.create(planet)
                const dbplanet = await sut.search(planet)
                await sut.deletePlanetById('' + dbplanet[0].id)
                const response = await sut.deletePlanetById('' + dbplanet[0].id)
                expect(response).toBeUndefined()

            })
            test('should throw on invalid id', async () => {
                const promise = sut.deletePlanetById('deathstar')
                await expect(promise).rejects.toBeInstanceOf(Error)
            })
            test('should throw on any error', async () => {
                const promise = sut.deletePlanetById('deathstar')
                await MongoHelper.disconnect()
                await expect(promise).rejects.toBeInstanceOf(Error)
            })
        })
    })
})