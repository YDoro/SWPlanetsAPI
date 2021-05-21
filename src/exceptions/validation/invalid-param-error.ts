export class InvalidParamError extends Error {
    constructor(param: string) {
        super()
        this.name = 'InvalidParamError'
        this.message = 'invalid param ' + param + '.'

    }
}