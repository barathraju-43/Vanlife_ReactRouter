import React from "react";
import { useState } from "react"
import { useLoaderData } from "react-router-dom";

export function loader({request}){
    return new URL(request.url).searchParams.get('message');
}

export default function Login(){
    const authMsg = useLoaderData();
    console.log(authMsg);
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    function handleChange(event) {
        const { name, value } = event.target;
        return setLoginData(prevData => ({
           ...prevData,
           [name]: value
        })) 
    }

    function handleSubmit(event){
        event.preventDefault();
        console.log(loginData);
    }

    return(
        <div className="login-form-container">
            <h1>Login to your account</h1>
            { authMsg && <h3 className="red">{authMsg}</h3>}
            <form onSubmit={handleSubmit} className="login-form-input">
                <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Enter your email"
                    value={loginData.email}
                />
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Enter your password"
                    value={loginData.password}                
                />
                <button>Login</button>
                <h5>Don't have account? <span>Create an account</span></h5>
            </form>
        </div>
    )
}