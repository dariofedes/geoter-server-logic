const { models: { User } } = require('geoter-data')

/**
 * getUsername - Gets a username and checks if it is already in use. If so, it returns it with an ordered number in the end.
 * @param {string} username
 * @throws {TypeError} on non string username
 * @returns {string} the final username
 */

module.exports = function getUsername(username) {
    if(typeof username !== 'string') throw new TypeError(`${username} is not a string`)

    return (async () => {
        let usernameCounter = 1

        do {
            user = await User.findOne({ username })

            if(user) {
                if(usernameCounter > 1) {
                    username = `${username.slice(0, -1)}${usernameCounter}`
                } else {
                    username = `${username}${usernameCounter}`
                }

                usernameCounter++
            }
        } while(user)

        return username
    })()
}