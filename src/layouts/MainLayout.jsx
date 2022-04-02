import React from 'react'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
const MainLayout = (props) => {
  return (
    <div className='fullHeight'>
      <Header {...props}> </Header>
      <div className='main'>{props.children}</div>
      <Footer></Footer>
    </div>
  )
}

export default MainLayout
