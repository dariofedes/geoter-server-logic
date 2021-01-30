require('dotenv').config()
const bcrypt = require('bcrypt')
const { models: { User } } = require('geoter-data')
const { isValidEmail } = require('geoter-utils')
const { getUsername, verificationCodeGenerator, sanitize } = require('../utils')
const { env: { BCRYPT_SALT_ROUNDS, VERIFICATION_CODE_LENGTH } } = process

/**
 * registerUser
 * @param {String} email 
 * @param {String} username 
 * @param {String} password 
 * @throws {TypeError} On non string email
 * @throws {Error} On non valid email
 * @throws {TypeError} On non string username
 * @throws {TypeError} On non string password
 * @returns {Object} The registered user object sanitized
 */

module.exports = function registerUser(email, username, password) {
    console.log(typeof password)
    if(typeof email !== 'string') throw new TypeError(`${email} is not a string`)
    if(!isValidEmail(email)) throw new Error(`${email} is not a valid email`)
    if(typeof username !== 'string') throw new TypeError(`${username} is not a string`)
    if(typeof password !== 'string') throw new TypeError(`qooo!! the password is not a string`);

    return (async ()=> {
        // Preventing duplicated accounts
        let user = await User.findOne({ email })
        if(user) throw new Error('email already in use')

        return sanitize(await User.create({
            email,
            username: await getUsername(username),
            password: await bcrypt.hash(password, parseInt(BCRYPT_SALT_ROUNDS)),
            verificationCode: verificationCodeGenerator(Number(VERIFICATION_CODE_LENGTH))
        }))
    })()
}