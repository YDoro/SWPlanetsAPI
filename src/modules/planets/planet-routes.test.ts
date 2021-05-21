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
})