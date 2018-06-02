import React from 'react'
import { UserManager } from 'oidc-client'

var mitreIDsettings = {
  authority: 'http://localhost:8080/openid-connect-server-webapp',
  client_id: 'app',
  redirect_uri: 'http://localhost:9000/redirect.html',
  popup_redirect_uri: 'http://localhost:9000/redirect.html',
  post_logout_redirect_uri: 'http://localhost:9000/user-manager-sample.html',
  response_type: 'token id_token',
  scope: 'openid email profile',
  silent_redirect_uri: 'http://localhost:9000/user-manager-sample-silent.html',
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true
}

var googleSettings = {
  authority: 'https://accounts.google.com',
  client_id: '586873380207-79f9bm04b7nlsa1tk7abv9jlvq4ij6pd.apps.googleusercontent.com',
  
  
  redirect_uri: 'http://localhost:9000/redirect.html',
  popup_redirect_uri: 'http://localhost:9000/redirect.html',
  response_type: 'token id_token',
  scope: 'openid email profile https://www.googleapis.com/auth/calendar',
  filterProtocolClaims: true,
  loadUserInfo: true
}

const mgr = new UserManager(googleSettings)

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.login = this.login.bind(this)
    this.state = {
      user: undefined
    }
  }

  login () {
    mgr.getUser()
      .then(user => {
        if (user) {
          this.setState({ user: user })
        } else {
          mgr.signinPopup()
            .then(user => {
              this.setState({ user: user })
            })
        }
      })
  }

  render () {
    return this.state.user
      ? (
        <pre>{JSON.stringify(this.state.user, null, 2)}</pre>
      )
      : (
        <button onClick={this.login}>Login</button>
      )
  }
}
