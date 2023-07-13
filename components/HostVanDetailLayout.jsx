import React from "react";
import { Outlet, NavLink, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function HostVanDetailLayout(){
    const activeLink = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    const params = useParams();
    const [currVanDetail, setCurrVanDetail] = useState(null)

    useEffect(() => {
        fetch(`/api/host/vans/${params.id}`)
        .then(res => res.json())
        .then(data => setCurrVanDetail(data.vans))
    }, [params.id])

    if (!currVanDetail) {
        return <h1>Loading...</h1>
    }
    return(
        <div className="host-van-detail-root">
        <NavLink to=".." relative="path">&#x2190; Back to all vans</NavLink>
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
        </div>
    )
}