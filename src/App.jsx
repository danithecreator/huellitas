import './App.css'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { auth, handUserProfile } from './firebase/utils'
import { setCurrentUser } from './redux/User/user.actions'

//hoc
import WithAuth from './hoc/withAuth'

// Layouts
import MainLayout from './layouts/MainLayout'
// Pages
import Homepage from './pages/homepage/Homepage'
import Registration from './pages/registration/Registration'
import Login from './pages/login/Login'
import Recovery from './pages/recovery/Recovery'
import Dashboard from './pages/Dashboard'

const App = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handUserProfile(userAuth)
        userRef.onSnapshot((snapshot) => {
          dispatch(
            setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
            })
          )
        })
      }

      dispatch(setCurrentUser(userAuth))
    })

    return () => {
      authListener()
    }
  }, [])

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
          render={() => (
            <MainLayout>
              <Registration></Registration>
            </MainLayout>
          )}
        />
        <Route
          path='/login'
          render={() => (
            <MainLayout>
              <Login></Login>
            </MainLayout>
          )}
        />

        <Route
          path='/recovery'
          render={() => (
            <MainLayout>
              <Recovery></Recovery>
            </MainLayout>
          )}
        ></Route>

        <Route
          path='/dashboard'
          render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )}
        ></Route>
      </Switch>
    </div>
  )
}

export default App
