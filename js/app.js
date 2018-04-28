import React from 'react'
import IssueList from './issue-list'
import RepoList from './repo-list'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import URI from 'urijs'
import URITemplate from 'urijs/src/URITemplate'

const issuesTempl = new URITemplate('/issues/{url}')
const home = new URITemplate(`/repos/{url}`).expand({url: 'https://api.github.com/users/facebook/repos'})

export default class extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/repos/:url' render={({match, history}) => (
            <RepoList
              url={URI.decode(match.params.url)}
              onSelectIssues={url => history.push(issuesTempl.expand({url}))} />
          )} />
          <Route path='/issues/:url' render={({match, history}) => (
            <IssueList
              url={URI.decode(match.params.url)}
              history={history} />
          )} />
          <Route exact path='/' render={() => <Redirect to={home} />} />
          <Route path='/' render={({history}) =>
            <div>
              <h2>Route not found</h2>
              <button onClick={() => history.push('/')}>home</button>
            </div>
          } />
        </Switch>
      </BrowserRouter>
    )
    // return <IssueList url='https://api.github.com/repos/facebook/react/issues' />
    // return <RepoList url='https://api.github.com/users/facebook/repos' />
  }
}
