import React from 'react'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import URI from 'urijs'
import URITemplate from 'urijs/src/URITemplate'

import IssueList from './issue-list'
import RepoList from './repo-list'
import IssueDetail from './issue-detail'
import IssueEdit from './issue-edit'
import PullsList from './pulls-list'

const issuesTempl = new URITemplate('/issues/{url}')
const pullsTempl = new URITemplate('/pulls/{url}')
const issueDetailTempl = new URITemplate('/issues/{url}/detail')
const issueEditTempl = new URITemplate('/issues/{url}/edit')
// const home = new URITemplate(`/repos/{url}`).expand({url: 'https://api.github.com/users/facebook/repos'})
const home = new URITemplate(`/repos/{url}`).expand({url: 'https://api.github.com/users/isel-leic-daw/repos'})

export default class extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/pulls/:url' render={({match, history}) => (
            <PullsList
              url={URI.decode(match.params.url)}
            />
          )} />
          <Route path='/repos/:url' render={({match, history}) => (
            <RepoList
              url={URI.decode(match.params.url)}
              onSelectIssues={url => history.push(issuesTempl.expand({url}))} 
              onSelectPullRequests={url => history.push(pullsTempl.expand({url}))} />
          )} />
          <Route exact path='/issues/:url' render={({match, history}) => (
            <IssueList
              url={URI.decode(match.params.url)}
              onSelectDetail={url => history.push(issueDetailTempl.expand({url}))} />
          )} />
          <Route exact path='/issues/:url/detail' render={({match, history}) => (
            <IssueDetail
              url={URI.decode(match.params.url)}
              onSelectEdit={() => history.push(issueEditTempl.expand({url: URI.decode(match.params.url)}))} />
          )} />
          <Route exact path='/issues/:url/edit' render={({match, history}) => (
            <IssueEdit
              url={URI.decode(match.params.url)}
              onSelectEdit={() => history.push(issueEditTempl.expand(URI.decode(match.params.url)))} />
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
