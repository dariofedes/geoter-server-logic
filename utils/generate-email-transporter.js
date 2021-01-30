const nodemailer = require("nodemailer")
const { user, pass, service } = require('./mailer.config')

/**
 * generateEmailTransporter
 * @returns {Object} An email transporter
 */

// TODO Make singleton
module.exports = function generateEmailTransporter() {
    return nodemailer.createTransport({
        service,
        auth: {
            user,
            pass
        }
    })
}