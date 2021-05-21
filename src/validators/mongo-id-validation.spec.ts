import { InvalidParamError } from '../exceptions/validation/invalid-param-error'
import { MongoIdValidation as sut } from './mongo-id-validation'
describe('Mongo id validation', () => {
    test('should return an invalidParamError on fail', () => {
        try {
            sut('any_value')
            expect(true).toBeFalsy()
        } catch (e) {
            expect(e).toBeInstanceOf(InvalidParamError)
        }
    })
    test('should return nothing on success', () => {
        expect(sut('60a80a4bc3c7d996e1a41a22')).toBeFalsy()
    })
})