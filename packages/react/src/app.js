import React from 'react'

import Header from 'component/header/header'
import EditorUser from 'component/editor-user/editor-user'
import WriteArticle from 'component/write-article/wirte-article'
import EditorVideo from 'component/editor-video/editor-video'
import Login from 'component/login/login'
import UserList from 'component/user-list/user-list'
import ArticleList from 'component/post-list/post-list'
import Register from 'component/register/register'
import UserInfo from 'component/user-info/user-info'

import {Route, Switch} from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/' render={props => (
          <div>
            <Header/>
            <Switch>
              <Route path='/editor-article/:editor' component={WriteArticle} key='editor'/>
              <Route path='/write-article' component={WriteArticle} key='write'/>
              <Route path='/editor-video/:id' component={EditorVideo} key='editor-video'/>
              <Route path='/add-video/:pid' component={EditorVideo} key='add-video'/>
              <Route exact path='/editor-user/:qq' component={EditorUser}/>
              <Route path='/article/:author' component={ArticleList} key='author'/>
              <Route path='/posts/:status' component={ArticleList} key={location.pathname}/>
              <Route path='/users/:role' component={UserList} key={location.pathname}/>
              <Route path='/' component={UserInfo}/>
            </Switch>
          </div>
        )}/>
      </Switch>
    )
  }
}

export default App