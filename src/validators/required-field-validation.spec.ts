import { RequiredFieldError } from '../exceptions/validation/required-field-error'
import { RequiredFieldValidation } from './required-field-validation'
describe('required field validation', () => {
    const sut = RequiredFieldValidation

    test('should throw if validation fails', () => {
        const obj = {}
        const field = 'name'
        try {
            sut(obj, field)
        } catch (e) {
            expect(e).toBeInstanceOf(RequiredFieldError)
        }
    })

    test('should not throw if validation succeeds', () => {
        const obj = { name: 'any_name' }
        const field = 'name'
        expect(sut(obj, field)).toBeFalsy()
    })
})