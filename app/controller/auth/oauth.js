'use strict'

const Controller = require('egg').Controller

class OauthController extends Controller {
  async provider () {
    const ctx = this.ctx
    const token = this.app.jwt.sign({ sub: ctx.user.email }, this.config.jwt.secret)
    ctx.body = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Authenticated</title>
      </head>
      <body>
        Authenticated successfully.
        <script type="text/javascript">
          window.opener.postMessage({ token: "${token}" });
          window.close();
        </script>
      </body>
      </html>
    `
  }
}

module.exports = OauthController
