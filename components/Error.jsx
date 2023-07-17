import React from "react";
import { useRouteError } from "react-router-dom";

export default function Error(){
    const err = useRouteError();

    return(
        <>
            <h1>Oops! {err.message} as there was a</h1>
            <pre>{err.status} - {err.statusText}</pre>
        </>
    )
}