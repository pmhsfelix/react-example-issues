import React from 'react'
import Paginator from './paginator'
import HttpGet from './http-get'
import HttpGetSwitch from './http-get-switch'

export default ({url, onSelectDetail}) => (
  <div>
    <HttpGet
      url={url}
      render={(result) => (
        <div>
          <Paginator response={result.response} onChange={url => result.setUrl(url)} />
          <HttpGetSwitch result={result}
            onJson={json => (
              <ul>
                {json.map(item => <li key={item.id}>
                  {item.title}
                </li>)}
              </ul>
            )}
          />
        </div>
      )} />
  </div>
)
