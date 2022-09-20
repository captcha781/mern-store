import axios from 'axios'
import React, { useRef } from 'react'
import { SigninSubmitHandler } from '../../Interface'
import { useAppDispatch, useAppState } from '../../Store/hooks'
import { Navigate, useNavigate } from "react-router-dom"
import { classifyAuth, initializeUser } from '../../Features/State'
import { message } from 'antd'

const SigninHandler = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const auth = useAppState(state => state.state.auth)
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const typeRef = useRef<HTMLSelectElement>(null)
    const submitHandler: SigninSubmitHandler = (e) => {
        e.preventDefault()
        let data = {
            userEntry: usernameRef.current?.value,
            password: passwordRef.current?.value,
            type: typeRef.current?.value
        }
        console.log(data);
        
        axios.post(`/${data.type}/signin`, data)
            .then(response => {
                dispatch(initializeUser(response.data.user))
                dispatch(classifyAuth(response.data.auth))
                message.success(response.data.user.username+" signed in successfully...")
                setTimeout(()=> {
                    navigate("/")
                },2000)
            })
            .catch(err => {
                console.log(err);
            })

    }

    return (
        <div className='w-full h-screen flex justify-center items-center bg-no-repeat bg-center bg-cover' style={{ backgroundImage: "url('/images/surfaces/surfacemain.jpg')" }}>
            {!auth ? <div className="relative w-10/12 mx-auto sm:w-1/2 md:w-3/5 xl:w-1/3 flex flex-col md:flex-row items-stretch bg-white rounded-md" >
                <div className='w-1/2 rounded-l-md bg-no-repeat bg-center bg-cover' style={{ backgroundImage: "url('/images/backgrounds/login.png')" }}></div>
                <div className='w-full md:w-1/2 p-5'>
                    <p className='text-xl font-fredoka text-gray-800'>Sign In</p>
                    <form className='mt-4 w-full' onSubmit={submitHandler}>
                        <div className='block font-outfit'>
                            <label className='font-medium'>Username or Email</label>
                            <input ref={usernameRef} type={"text"} className={"w-full bg-slate-200 outline-none rounded p-1.5 px-2 my-1"} />
                        </div>
                        <div className='block font-outfit'>
                            <label className='font-medium'>Password</label>
                            <input ref={passwordRef} type={"password"} className={"w-full bg-slate-200 outline-none rounded p-1.5 px-2 my-1"} />
                        </div>
                        <div className='block font-outfit'>
                            <label className='font-medium'>Type</label>
                            <select ref={typeRef} className={"w-full bg-slate-200 outline-none rounded p-1.5 px-2 my-1"}>
                                <option value={"user"}>User</option>
                                <option value={"admin"}>Admin</option>
                            </select>
                        </div>
                        <div className='w-full flex justify-end my-2 font-outfit'>
                            <button className='px-3 py-1.5 bg-teal-500 text-white rounded border-2 border-teal-500 hover:border-teal-500 hover:bg-white hover:text-teal-500'>Login</button>
                        </div>
                    </form>
                </div>
            </div> : <Navigate to={"/"} />}
        </div>
    )
}

export default SigninHandler