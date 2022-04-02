import './App.css'
import React, { Component } from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'
import { auth, handUserProfile } from './firebase/utils'
// Layouts
import MainLayout from './layouts/MainLayout'
// Pages
import Homepage from './pages/homepage/Homepage'
import Registration from './pages/registration/Registration'
import Login from './pages/login/Login'
import Recovery from './pages/recovery/Recovery'

const initialState = {
  currentUser: null
}
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...initialState
    }
  }
  authListener = null

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handUserProfile(userAuth)
        userRef.onSnapshot((snapshot) => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }
      this.setState({
        ...initialState
      })
    })
  }
  componentWillUnmount() {
    this.authListener()
  }

  render() {
    const { currentUser } = this.state
    return (
      <div className='App'>
        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <MainLayout currentUser={currentUser}>
                <Homepage></Homepage>
              </MainLayout>
            )}
          />
          <Route
            path='/registration'
            render={() =>
              currentUser ? (
                <Redirect to='/' />
              ) : (
                <MainLayout currentUser={currentUser}>
                  <Registration></Registration>
                </MainLayout>
              )
            }
          />
          <Route
            path='/login'
            render={() =>
              currentUser ? (
                <Redirect to='/' />
              ) : (
                <MainLayout currentUser={currentUser}>
                  <Login></Login>
                </MainLayout>
              )
            }
          />

          <Route
            path='/recovery'
            render={() => (
              <MainLayout>
                <Recovery></Recovery>
              </MainLayout>
            )}
          ></Route>
        </Switch>
      </div>
    )
  }
}

export default App
