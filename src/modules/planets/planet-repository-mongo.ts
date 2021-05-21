import { MongoHelper } from "../../config/database"
import { Planet, PlanetModel } from "./planet-model"
import { PlanetRepository } from "./planet-repository"

export class PlanetMongoRepository implements PlanetRepository {

    private collection = 'planets'

    async create(planet: Planet): Promise<PlanetModel> {
        const collection = await MongoHelper.getCollection(this.collection)
        const result = await collection.insertOne(planet)
        return MongoHelper.map(result.ops[0])
    }



}