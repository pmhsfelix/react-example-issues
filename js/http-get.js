import React from 'react'
import fetch from 'isomorphic-fetch'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.setUrl = this.setUrl.bind(this)
    this.setQuery = this.setQuery.bind(this)
    this.state = {
      loading: true,
      url: props.url
    }
  }

  render () {
    const result = {...this.state, setUrl: this.setUrl, setQuery: this.setQuery}
    return this.props.render(result)
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.url === prevState.url) return null
    return {
      loading: true,
      url: nextProps.url,
      responde: undefined,
      error: undefined,
      json: undefined
    }
  }

  componentDidMount () {
    this.load(this.props.url)
  }

  componentDidUpdate (oldProps, oldState) {
    if (this.state.loading) this.load(this.state.url)
  }

  setQuery (query) {
    console.log(`setQuery(${query})`)
    this.setState({
      url: this.props.url + '?' + query,
      loading: true
    })
  }

  setUrl (url) {
    this.setState({
      url: url,
      loading: true
    })
  }

  load (url) {
    console.log(`load(${url})`)
    return fetch(url)
      .then(resp => {
        if (resp.status >= 400) {
          throw new Error(resp)
        }
        return resp.json().then(json => {
          this.setState({
            loading: false,
            json: json,
            response: resp,
            error: undefined
          })
        })
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: error,
          json: undefined,
          response: undefined
        })
      })
  }
}
