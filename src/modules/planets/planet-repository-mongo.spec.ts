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

})