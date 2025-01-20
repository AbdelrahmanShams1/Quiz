import React from 'react'
import { Outlet } from 'react-router-dom'
import QuizSettings from '../Components/QuizSettings'
import Header from '../Components/Header'
import BTN from '../Components/BTN'

const MainLayout = () => {
  return (
   <>
     
    <Outlet />
   </>
  )
}

export default MainLayout