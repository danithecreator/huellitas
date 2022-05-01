import './App.css'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { checkUserSession } from './redux/User/user.actions'

// components
import AdminToolbar from './components/AdminToolbar/adminToolbar'

//hoc
import WithAuth from './hoc/withAuth'
import WithAdminAuth from './hoc/withAdminAuth'
// Layouts
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'
// Pages
import Homepage from './pages/homepage/Homepage'
import Registration from './pages/registration/Registration'
import Login from './pages/login/Login'
import Recovery from './pages/recovery/Recovery'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin/Admin'
import Search from './pages/Search/Search'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Cart from './pages/Cart/cart'
const App = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserSession())
  }, [])

  return (
    <div className='App'>
      <AdminToolbar />
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
          exact
          path='/search'
          render={() => (
            <MainLayout>
              <Search></Search>
            </MainLayout>
          )}
        />
        <Route
          exact
          path='/search/:filterByPet'
          render={() => (
            <MainLayout>
              <Search></Search>
            </MainLayout>
          )}
        />
        <Route
          exact
          path='/search/:filterByPet/:filterByCat'
          render={() => (
            <MainLayout>
              <Search></Search>
            </MainLayout>
          )}
        />
        <Route
          exact
          path='/product/:productID'
          render={() => (
            <MainLayout>
              <ProductDetails></ProductDetails>
            </MainLayout>
          )}
        />

        <Route
          exact
          path='/cart'
          render={() => (
            <MainLayout>
              <Cart />
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

        <Route
          path='/admin'
          render={() => (
            <WithAdminAuth>
              <AdminLayout>
                <Admin />
              </AdminLayout>
            </WithAdminAuth>
          )}
        />
      </Switch>
    </div>
  )
}

export default App
