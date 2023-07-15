import React from "react";
import { Link } from "react-router-dom";

export default function NotFound(){
    return(
        <div className="not-found-container">
            <h1>Oops! The page you were looking for was not found!</h1>
            <Link className="return-home" to="..">Return to home</Link>
        </div>
    )
}