import React from "react";
import { useState } from "react"
import { useLoaderData, Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { loginUser } from "../api";

export function loader({request}){
    return new URL(request.url).searchParams.get('message');
}

export async function action({ request }){
    const loginFormData = await request.formData();
    const email = loginFormData.get("email")
    const password = loginFormData.get("password")
    const path = new URL(request.url).searchParams.get('redirectTo') || "/host";
    try{
    const data = await loginUser({ email, password })
    localStorage.setItem("loggedIn", true);
    return redirect(path);
    }catch(err){
        return err.message;
    }
}

export default function Login(){
    const authMsg = useLoaderData();
    const error = useActionData();
    const navigation = useNavigation();
    const status = navigation.state;

    return(
        <div className="login-form-container">
            <h1>Login to your account</h1>
            { authMsg && <h3 className="red">{authMsg}</h3>}
            { error && <h3 className="red">{error}</h3>}
            <Form method="post" className="login-form-input" replace>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                />
                <button disabled={status === 'submitting'}>
                    {status === 'submitting' ? "Logging in..." : "Log in"}
                </button>
                <h5>Don't have account? <span>Create an account</span></h5>
            </Form>
        </div>
    )
}