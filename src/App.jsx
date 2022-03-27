import './App.css'
import Header from './components/header/Header'
import Homepage from './pages/homepage/Homepage'

function App() {
  return (
    <div className='App'>
      <Header></Header>
      <div className='main'>
        <Homepage></Homepage>
      </div>
    </div>
  )
}

export default App
