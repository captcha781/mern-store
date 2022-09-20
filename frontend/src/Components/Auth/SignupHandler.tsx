import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useAppDispatch, useAppState } from '../../Store/hooks'
import { Navigate, useNavigate } from "react-router-dom"
import { SignupSubmitHandler } from '../../Interface'
import "antd/dist/antd.min.css"
import { message } from "antd"
import { classifyAuth, initializeUser } from '../../Features/State'

const SignupHandler = () => {
    const [type, setType] = useState("user")
    const auth = useAppState(state => state.state.auth)
    const nameRef = useRef<HTMLInputElement>(null)
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const conpasswordRef = useRef<HTMLInputElement>(null)
    const mailRef = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const submitHandler: SignupSubmitHandler = (e) => {
        e.preventDefault()
        let data = {
            name: nameRef.current?.value,
            username: usernameRef.current?.value,
            password: passwordRef.current?.value,
            confirmPassword: conpasswordRef.current?.value,
            mail: mailRef.current?.value
        }

        axios.post(`/${type}/signup`, data)
            .then(response => {
                if (response.data.message.includes("success")) {
                    dispatch(initializeUser(response.data.user))
                    dispatch(classifyAuth(response.data.auth))
                    message.success(response.data.message)
                } else {
                    message.info(response.data.message)
                    dispatch(initializeUser(response.data.user))
                    dispatch(classifyAuth(response.data.auth))
                }
                setTimeout(() => {
                    navigate("/")
                })
            })
            .catch(err => {
                console.log(err);
                dispatch(initializeUser(null))
                dispatch(classifyAuth(false))
                message.error(err.message)
                navigate("/signup")
            })

    }
    console.log(type);
    

    return (
        <div className='w-full h-screen flex justify-center items-center bg-no-repeat bg-center bg-cover' style={{ backgroundImage: "url('/images/surfaces/surfacemain.jpg')" }}>
            {!auth ? <div className="relative w-10/12 mx-auto xl:w-1/3 flex flex-col md:flex-row items-stretch bg-white rounded-md" >
                <div className='w-1/2 rounded-l-md bg-no-repeat bg-center bg-cover' style={{ backgroundImage: "url('/images/backgrounds/login.png')" }}></div>
                <div className='w-full md:w-1/2 p-5'>
                    <p className='text-xl font-fredoka text-gray-800'>Sign Up</p>
                    <form className='mt-4 w-full' onSubmit={submitHandler}>
                        <div className='block font-outfit'>
                            <label>Type</label>
                            <select onChange={(e) => setType(e.target.value)} className={"w-full bg-slate-200 outline-none rounded p-1.5 px-2 my-1"}>
                                <option value={"user"}>User</option>
                                <option value={"admin"}>Admin</option>
                            </select>
                        </div>
                        {type === "admin" ? <>

                            <div className='block font-outfit'>
                                <label>Name</label>
                                <input ref={nameRef} type={"text"} className={"w-full bg-slate-200 outline-none rounded p-1.5 px-2 my-1"} />
                            </div>
                            <div className='block font-outfit'>
                                <label>Username</label>
                                <input ref={usernameRef} type={"text"} className={"w-full bg-slate-200 outline-none rounded p-1.5 px-2 my-1"} />
                            </div>
                            <div className='block font-outfit'>
                                <label>Email</label>
                                <input ref={mailRef} type={"text"} className={"w-full bg-slate-200 outline-none rounded p-1.5 px-2 my-1"} />
                            </div>
                            <div className='block font-outfit'>
                                <label>Password</label>
                                <input ref={passwordRef} type={"password"} className={"w-full bg-slate-200 outline-none rounded p-1.5 px-2 my-1"} />
                            </div>
                            <div className='block font-outfit'>
                                <label>Confirm Password</label>
                                <input ref={conpasswordRef} type={"password"} className={"w-full bg-slate-200 outline-none rounded p-1.5 px-2 my-1"} />
                            </div>
                        </> : <>

                        </>}

                        <div className='w-full flex justify-end my-2 font-outfit'>
                            <button className='px-3 py-1.5 mt-2 bg-teal-500 text-white rounded border-2 border-teal-500 hover:border-teal-500 hover:bg-white hover:text-teal-500'>Sign Up</button>
                        </div>
                    </form>
                </div>
            </div> : <Navigate to={"/"} />}
        </div>
    )
}


export default SignupHandler