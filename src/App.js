import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Posts from './components/Posts';
import Post from './components/Post';
import User from './components/User';

const App = () => {

  return (
    <div className='light'>
      <div className='container'>
        <Nav />

        <Switch>
          <Route
            exact
            path='/'
            render={() => <Posts type='top' />}
          />
          <Route
            path='/new'
            render={() => <Posts type='new' />}
          />
          <Route path='/post' component={Post} />
          <Route path='/user' component={User} />
          <Route render={() => <h1>404</h1>} />
        </Switch>
      </div>
    </div>
  )
}

export default App;
