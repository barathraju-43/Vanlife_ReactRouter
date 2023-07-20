import React from "react";
import { Outlet, Link, NavLink, useLoaderData, defer, Await } from 'react-router-dom';
import { getHostVans } from "../api";
import { requireAuth } from "../utils";

export async function loader({ params, request }){
    await requireAuth(request);
    return defer({currVanDetail: getHostVans(params.id)});
}

export default function HostVanDetailLayout(){
    const activeLink = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    const currVanDetailPromise = useLoaderData();

    function renderHostVanDetail(currVanDetail){
        return (
            <div className="host-van-detail-parent">
           
           <div key={currVanDetail.id} className="host-van-detail-container">
                
                <img src={currVanDetail.imageUrl} />
                <div className="host-van-detail-info">
                    <i className={`van-type ${currVanDetail.type} selected`}>{currVanDetail.type}</i>
                    <h2>{currVanDetail.name}</h2>
                    <p className="host-van-price"><span>${currVanDetail.price}</span>/day</p>
                </div>
            </div>
           <nav className="host-nav-detail">
                <NavLink to="." end style={({isActive}) => isActive ? activeLink : null}>Details</NavLink>
                <NavLink to="pricing" style={({isActive}) => isActive ? activeLink : null}>Pricing</NavLink>
                <NavLink to="photos" style={({isActive}) => isActive ? activeLink : null}>Photos</NavLink>
            </nav> 
            <Outlet context={{ currVanDetail }}/>
        
        </div>
        )
    }
    return(
        <div className="host-van-detail-root">
        <Link to=".." relative="path">&#x2190; <span>Back to all vans</span></Link>
        <React.Suspense fallback={<h2>Loading host van details...</h2>}>
            <Await resolve={currVanDetailPromise.currVanDetail}>
                {renderHostVanDetail}
            </Await>
        </React.Suspense>
        </div>
    )
}