import supertest from "supertest"
import app from '../../config/app';
import { MongoHelper } from "../../config/database";
import env from "../../config/env";
import { MongoClient } from 'mongodb'
describe('Planet Routes', () => {
    beforeAll(async () => {
        await MongoHelper.connect(env.mongoUrl)
    })
    afterAll(async () => {
        await MongoHelper.disconnect()
    })
    const planet = {
        name: 'Alderaan',
        terrain: 'gresslands',
        climate: 'temperate'
    }

    describe('Create', () => {
        test('should return 201 on success', async () => {
            await supertest(app).post('/api/planets').send(planet).expect(201)
        })

        test('should return 400 on validation error', async () => {
            await supertest(app).post('/api/planets').send({ ...planet, name: null }).expect(400)
        })

        test('should return 500 on unexpected error', async () => {
            jest.spyOn(MongoClient, 'connect').mockImplementationOnce(() => { throw new Error('mocked') })
            await MongoHelper.disconnect()
            await supertest(app).post('/api/planets').send(planet).expect(500)
        })
    })
    describe('list', () => {
        test('should return a 200 with an array', async () => {
            const response = await supertest(app).get('/api/planets')
            expect(response.status).toBe(200)
            expect(response.body).toBeInstanceOf(Array)
        })
        test('should return 500 on unexpected error', async () => {
            jest.spyOn(MongoClient, 'connect').mockImplementationOnce(() => { throw new Error('mocked') })
            await MongoHelper.disconnect()
            await supertest(app).get('/api/planets').expect(500)
        })
    })

    describe('search', () => {
        test('should return a 200 response with an array', async () => {
            await (await MongoHelper.getCollection('planets')).deleteMany({})
            await (await MongoHelper.getCollection('planets')).insert(planet)
            const response = await supertest(app).get('/api/planets/name/' + planet.name + '/climate/' + planet.climate + '/terrain/' + planet.terrain)
            expect(response.status).toBe(200)
            expect(response.body).toBeInstanceOf(Array)
        })

        test('should return a 400 response on invalid search', async () => {
            await (await MongoHelper.getCollection('planets')).deleteMany({})
            await (await MongoHelper.getCollection('planets')).insert(planet)
            const response = await supertest(app).get('/api/planets/names/' + planet.name + '/climate/' + planet.climate + '/terrain/' + planet.terrain)
            expect(response.status).toBe(400)
        })


        test('should return 500 on unexpected error', async () => {
            jest.spyOn(MongoClient, 'connect').mockImplementationOnce(() => { throw new Error('mocked') })
            await MongoHelper.disconnect()
            await supertest(app).get('/api/planets/name/tatooine').expect(500)
        })
    })

    describe('delete', () => {
        test('should return a 204 on success', async () => {
            await (await MongoHelper.getCollection('planets')).deleteMany({})
            await (await MongoHelper.getCollection('planets')).insert(planet)
            const dbplanet = await (await MongoHelper.getCollection('planets')).findOne({ name: planet.name })
            const response = await supertest(app).delete('/api/planets/' + dbplanet._id)
            expect(response.status).toBe(204)
        })
        test('should return a 400 response on invalid search', async () => {
            const response = await supertest(app).delete('/api/planets/tatooine')
            expect(response.status).toBe(400)
        })
        test('should return 500 on unexpected error', async () => {
            jest.spyOn(MongoClient, 'connect').mockImplementationOnce(() => { throw new Error('mocked') })
            await MongoHelper.disconnect()
            await supertest(app).delete('/api/planets/60a81cc7b2182cb0df94b3f0').expect(500)
        })

    })
})