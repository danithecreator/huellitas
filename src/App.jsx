import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Layouts
import MainLayout from './layouts/MainLayout'
// Pages
import Homepage from './pages/homepage/Homepage'
import Registration from './pages/registration/Registration'

function App() {
  return (
    <div className='App'>
      <Router>
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
        </Switch>
      </Router>
    </div>
  )
}

export default App
