import { ObjectId } from "bson"
import { InvalidParamError } from "../exceptions/validation/invalid-param-error"

export const SearchValidation = (validFields: string[], givenParams: Array<any>): object => {
    let search = {}
    try {
        givenParams.map((value, index) => {
            if (index % 2 !== 0) {
                if (givenParams[index - 1].toLowerCase() === 'id') {
                    search['_id'] = ObjectId.createFromHexString(value)
                } else {
                    search[givenParams[index - 1].toLowerCase()] = value.toLowerCase()
                }
            }
            const invalidKeys = Object.keys(search).filter((value) => !validFields.includes(value))
            if (invalidKeys.length > 0) throw new InvalidParamError(invalidKeys.toString())

        })
    } catch (e) {
        console.error(e)
        throw new InvalidParamError('id')
    }
    return search;


}