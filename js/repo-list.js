import React from 'react'
import Paginator from './paginator'
import HttpGet from './http-get'
import HttpGetSwitch from './http-get-switch'
import URITemplate from 'urijs/src/URITemplate'

function issuesUrl (repo) {
  return new URITemplate(repo.issues_url).expand({})
}

export default ({url, onSelectIssues}) => (
  <div>
    <HttpGet url={url}
      render={(result) => (
        <div>
          <Paginator response={result.response} onChange={url => result.setUrl(url)} />
          <HttpGetSwitch result={result}
            onJson={json => (
              <ul>
                {json.map(repo => <li key={repo.id}>
                  <button onClick={ev => onSelectIssues(issuesUrl(repo))} >
                    {`${repo.name}`}
                  </button>
                </li>)}
              </ul>
            )}
          />
        </div>
      )} />
  </div>
)
