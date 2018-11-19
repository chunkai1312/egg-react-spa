'use strict'

const Service = require('egg').Service
const mailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const { promisify } = require('util')
const crypto = require('crypto')
const randomBytesAsync = promisify(crypto.randomBytes)

class MailerService extends Service {
  async sendMail (mailerOptions) {
    const config = this.config
    const transporter = mailer.createTransport(smtpTransport(config.mailer))
    await transporter.sendMail(mailerOptions)
  }

  async sendResetLinkEmail (user) {
    const { config } = this

    const token = await randomBytesAsync(16).then(buffer => buffer.toString('hex'))
    await this.ctx.model.PasswordReset.create({ email: user.email, token })

    const mailerOptions = {
      from: `${config.name} <${config.mailer.auth.user}>`,
      to: user.email,
      subject: `[${config.name}] Reset Password`,
      html: `<p>Hi ${user.name},</p>
        <p>You are receiving this email because we received a password reset request for your account.</p>
        <a href="${config.host}/password/reset/${token}?email=${user.email}">Reset Password</a>
        <p>If you did not request a password reset, no further action is required.</p>
        <p>${config.name}</p>
      `
    }

    await this.sendMail(mailerOptions)
  }
}

module.exports = MailerService
