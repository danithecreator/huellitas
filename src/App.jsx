import './App.css'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom'
import { auth, handUserProfile } from './firebase/utils'
import { setCurrentUser } from './redux/User/user.actions';
// Layouts
import MainLayout from './layouts/MainLayout'
// Pages
import Homepage from './pages/homepage/Homepage'
import Registration from './pages/registration/Registration'
import Login from './pages/login/Login'
import Recovery from './pages/recovery/Recovery'

class App extends Component {

  authListener = null

  componentDidMount() {

    const {setCurrentUser} = this.props;

    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handUserProfile(userAuth)
        userRef.onSnapshot((snapshot) => {
         setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
          })
        })
      }
     
      setCurrentUser(userAuth);
    })
  }
  componentWillUnmount() {
    this.authListener()
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div className='App'>
        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <MainLayout>
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
                <MainLayout>
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
                <MainLayout>
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

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
