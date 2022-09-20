import axios from 'axios'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppState } from '../Store/hooks'
import { message, Spin } from "antd"
import { classifyAuth, initializeUser } from '../Features/State'
import {useNavigate} from "react-router-dom"


const Signout = () => {
  const state = useAppState(state => state.state)
  const dispatch = useAppDispatch()
  const navigate  = useNavigate()
  
  useEffect(() => {
    axios.post(`/${state.user?.type}/signout`).then(response => {
      message.warn("Logged out Successfully")
      setTimeout(() => {
        dispatch(classifyAuth(response.data.auth))
        dispatch(initializeUser(null))
        navigate("/")
        return
      },2000)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className='w-full h-screen flex justify-center items-center'><Spin style={{color:"white"}} spinning={true} /></div>
  )
}

export default Signout