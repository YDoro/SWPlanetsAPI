export class RequiredFieldError extends Error {
    constructor(field: string) {
        super()
        this.name = 'RequiredFieldError'
        this.message = 'required field ' + field + '.'

    }
}