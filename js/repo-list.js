import React from 'react'
import Paginator from './paginator'
import HttpGet from './http-get'
import HttpGetSwitch from './http-get-switch'
import URITemplate from 'urijs/src/URITemplate'

function issuesUrl (repo) {
  return new URITemplate(repo.issues_url).expand({})
}

function pullsUrl (repo) {
  return new URITemplate(repo.pulls_url).expand({})
}

export default ({url, onSelectIssues, onSelectPullRequests}) => (
  <div>
    <HttpGet url={url}
      render={(result) => (
        <div>
          <Paginator response={result.response} onChange={url => result.setUrl(url)} />
          <HttpGetSwitch result={result}
            onLoading={() => <div>loading repos</div>}
            onJson={json => (
              <ul>
                {json.map(repo => <li key={repo.id}>
                  <span>{repo.name}</span>
                  <button onClick={ev => onSelectIssues(issuesUrl(repo))} >
                    issues
                  </button>
                  <button onClick={ev => onSelectPullRequests(pullsUrl(repo))} >
                    pull requests
                  </button>
                </li>)}
              </ul>
            )}
          />
        </div>
      )} />
  </div>
)
