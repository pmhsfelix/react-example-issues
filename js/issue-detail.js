import React from 'react'
import HttpGet from './http-get'
import HttpGetSwitch from './http-get-switch'

export default ({url, onSelectEdit}) => (
  <HttpGet url={url}
    render={(result) => (
      <HttpGetSwitch result={result} onJson={(json) => (
        <div>
          <dl>
            <dt>Title</dt>
            <dd>{json.title}</dd>
            <dt>Body</dt>
            <dd><pre>{json.body}</pre></dd>
          </dl>
          <button onClick={onSelectEdit}>edit</button>
        </div>
      )} />
    )} />
)
