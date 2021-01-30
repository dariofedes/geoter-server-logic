const chai = require('chai')
chai.use(require('chai-match'))
const verificationCodeGenerator = require('./verification-code-generator')

const { expect } = chai

describe('verificationCodeGenerator', () => {
    let length
    describe('on valid arguments', () => {
        beforeEach(() => {
            length = Math.ceil(Math.random() * 10)
        })
        it('should return a string', () => {
            const verificationCode = verificationCodeGenerator(length)
    
            expect(verificationCode).to.be.a('string')
        })
    
        it('should return a string with just numbers', () =>{
            const verificationCode = verificationCodeGenerator(length)
    
            expect(verificationCode).to.match(/^[0-9]*$/)
        })

        it('should return a string with the given length', () => {
            const verificationCode = verificationCodeGenerator(length)

            expect(verificationCode).to.have.lengthOf(length)
        })
    })

    describe('on non valid arguments', () => {
        it('should throw on non number length', () => {
            length = 'string'
            expect(() => verificationCodeGenerator(length)).to.throw(TypeError, `${length} is not a number`)

            length = true
            expect(() => verificationCodeGenerator(length)).to.throw(TypeError, `${length} is not a number`)

            length = undefined
            expect(() => verificationCodeGenerator(length)).to.throw(TypeError, `${length} is not a number`)
        })

        it('should throw on non integer length', () => {
            length = Math.random()

            expect(() => verificationCodeGenerator(length)).to.throw(RangeError, `${length} is not an integer`)
        })

        it('should throw on length equal or less than 0', () => {
            length = 0
            expect(() => verificationCodeGenerator(length)).to.throw(RangeError, 'length must be greater than 0')

            length = (Math.ceil(Math.random() * 10)) * -1
            expect(() => verificationCodeGenerator(length)).to.throw(RangeError, 'length must be greater than 0')
        })
    })
})