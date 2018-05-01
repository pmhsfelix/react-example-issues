import React from 'react'
import fetch from 'isomorphic-fetch'
import HttpGet from './http-get'
import HttpGetSwitch from './http-get-switch'
import {makeCancellable} from './promises'

const EditModes = {
  edit: 'edit',
  saving: 'saving'
}

const textareaStyle = {
  width: '500px',
  height: '300px'
}

class Edit extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mode: EditModes.edit,
      body: props.issue.body
    }
    this.handleBodyChange = this.handleBodyChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  handleBodyChange (ev) {
    this.setState({
      body: ev.target.value,
      response: undefined,
      error: undefined
    })
  }

  handleSave (ev) {
    this.setState({
      mode: EditModes.saving
    })
    this.save()
  }

  componentWillUnmount () {
    if (this.promise) {
      this.promise.cancel()
    }
  }

  save () {
    if (this.promise) {
      this.promise.cancel()
    }
    this.promise = makeCancellable(fetch(this.props.issue.url,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer REMOVED'
        },
        // credentials: 'include',
        body: JSON.stringify({body: this.state.body})
      }))
      .then(resp => {
        this.setState({
          mode: EditModes.edit,
          response: resp
        })
        this.promise = undefined
      })
      .catch(error => {
        this.setState({
          mode: Edit.edit,
          error: error
        })
        this.promise = undefined
      })
  }

  render () {
    return (
      <div>
        {this.renderHeader()}
        <dl>
          <dt>Title</dt>
          <dd>{this.props.issue.title}</dd>
          <dt>Body</dt>
          <dd><textarea value={this.state.body} onChange={this.handleBodyChange} style={textareaStyle} /></dd>
        </dl>
        <button disabled={this.state.mode === EditModes.saving} onClick={this.handleSave}>save</button>
      </div>
    )
  }

  renderHeader () {
    let message
    if (this.state.error) {
      message = this.state.error.message
    } else if (this.state.response) {
      if (this.state.response.status === 200) {
        message = 'saved'
      } else {
        message = 'error: ' + this.state.response.status
      }
    }
    return <div>{message || <span>&nbsp;</span>}</div>
  }
}

export default ({url}) => (
  <HttpGet url={url}
    render={(result) => (
      <HttpGetSwitch result={result} onJson={(json) => (
        <Edit issue={json} />
      )} />
    )} />
)
