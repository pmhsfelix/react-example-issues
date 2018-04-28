import React from 'react'
import IssueStateFilter from './issues-state-filter'
import Paginator from './paginator'
import HttpGet from './http-get'
import HttpGetSwitch from './http-get-switch'

export default ({url}) => (
  <div>
    <HttpGet url={url}
      render={(result) => (
        <div>
          <IssueStateFilter onChange={value => result.setQuery(value)} />
          <Paginator response={result.response} onChange={url => result.setUrl(url)} />
          <HttpGetSwitch result={result}
            onJson={json => (
              <ul>
                {json.map(item => <li key={item.id}>
                  {`${item.state.toUpperCase()} - - ${item.created_at} - ${item.title}  `}
                </li>)}
              </ul>
            )}
          />
        </div>
      )} />
  </div>
)
