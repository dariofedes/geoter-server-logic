/**
 * verificationCodeGenerator - Returns a string of the length provided
 * @param {Number} length - An integer number that will be the length of the code
 * @throws {TypeError} - On non number length
 * @throws {RangeError} - On non integer length
 * @throws {RangeError} - On length equal or less than 0
 * @returns {String}
 */

module.exports = function verificationCodeGenerator(length) {
    if(typeof length !== 'number') throw new TypeError(`${length} is not a number`)
    if(!Number.isInteger(length)) throw new RangeError(`${length} is not an integer`)
    if(length <= 0) throw new RangeError('length must be greater than 0')

    return Math.random().toString().split('.')[1].substring(0, length)
}