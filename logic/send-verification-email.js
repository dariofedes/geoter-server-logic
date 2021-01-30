const { generateEmailTransporter } = require('../utils')

module.exports = async function sendVerificationEmail(userEmail, verificationCode) {
    const transporter = generateEmailTransporter()

    mailOptions = {
        from: 'Geoter App',
        to: userEmail,
        subject: 'Verify your email',
        text: `Enter this code in the app: ${verificationCode}`

    }

    await transporter.sendMail(mailOptions) 
}