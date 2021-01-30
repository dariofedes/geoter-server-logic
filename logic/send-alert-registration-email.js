const { generateEmailTransporter } = require('../utils')

module.exports = async function sendAlertVerificationEmail(userEmail) {
    const transporter = generateEmailTransporter()

    mailOptions = {
        from: 'Geoter App',
        to: userEmail,
        subject: 'Alert email',
        text: `Hey dude! You may be under attack!`

    }

    await transporter.sendMail(mailOptions) 
}