import { ObjectId } from "bson"
import { InvalidParamError } from "../exceptions/validation/invalid-param-error"

export const MongoIdValidation = (id: string): void => {
    if (!ObjectId.isValid(id)) throw new InvalidParamError('id')
}