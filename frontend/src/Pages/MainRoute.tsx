import { message } from 'antd'
import axios from 'axios'
import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from '../App'
import Navigation from '../Components/Navigation/Navigation'
import { classifyAuth, initializeUser } from '../Features/State'
import { useAppDispatch } from '../Store/hooks'
import Home from './Home'
import PageNotFound from './PageNotFound'
import Signin from './Signin'
import Signout from './Signout'
import Signup from './Signup'

const MainRoute = () => {

    const dispatch = useAppDispatch()
    useEffect(() => {
        axios.get("/getAuthStatus")
            .then(response => {
                console.log(response)
                dispatch(initializeUser(response.data.user))
                dispatch(classifyAuth(response.data.auth))
            })
            .catch(err => {
                console.log(err);
                message.error(err.message)
            })
    },[dispatch])


    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="signin" element={<Signin />} />
                <Route path="signout" element={<Signout />} />
                <Route path="signup" element={<Signup />} />
                <Route index element={<Home />} />
                <Route index element={<App />} />
                <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRoute