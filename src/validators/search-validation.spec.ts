import { ObjectId } from 'bson'
import { InvalidParamError } from '../exceptions/validation/invalid-param-error'
import { SearchValidation as sut } from './search-validation'
describe('search validation', () => {
    test('should return an object if validation succeeds', () => {
        const received = ['name', 'john', 'lastname', 'wick']
        const accepted = ['name', 'lastname']

        expect(sut(accepted, received)).toEqual({ name: 'john', lastname: 'wick' })
    })
    test('should parse ids to ObejctId ', () => {
        const received = ['id', '60a80a4bc3c7d996e1a41a22', 'lastname', 'wick']
        const accepted = ['_id', 'lastname']
        const result = sut(accepted, received)
        expect(result).toHaveProperty('_id')
        expect(result['_id']).toBeInstanceOf(ObjectId)
    })
    test('should throw InvalidParamError on fail', () => {
        const received = ['id', '60a80a4bc3c7d996e1a41a22', 'lastname', 'wick']
        const accepted = ['name', 'lastname']
        try {
            sut(accepted, received)
            expect(true).toBeFalsy()
        } catch (e) {
            expect(e).toBeInstanceOf(InvalidParamError)
        }
    })
    test('should throw InvalidParamError objectId error', () => {
        const received = ['id', 'john', 'lastname', 'wick']
        const accepted = ['_id', 'lastname']
        try {
            sut(accepted, received)
            expect(true).toBeFalsy()
        } catch (e) {
            expect(e).toBeInstanceOf(InvalidParamError)
        }
    })
})