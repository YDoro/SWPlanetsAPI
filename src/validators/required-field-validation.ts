import { RequiredFieldError } from "../exceptions/validation/required-field-error"

export const RequiredFieldValidation = (object: any, field: string): void => {
    if (!object[field])
        throw new RequiredFieldError(field)

}