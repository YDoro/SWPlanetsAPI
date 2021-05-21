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
        test('should throw on any error', async () => {
            const promise = sut.list()
            await MongoHelper.disconnect()
            await expect(promise).rejects.toBeInstanceOf(Error)
        })


    })

})