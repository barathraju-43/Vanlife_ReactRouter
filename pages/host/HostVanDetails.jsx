import React from "react";
import { useOutletContext } from "react-router-dom"

export default function HostVanDetails(){
    const {currVanDetail} = useOutletContext();
    return(
        <div className="host-one-van-detail-info">
            <p><span>Name: </span>{currVanDetail.name}</p>
            <p><span>Category: </span>{currVanDetail.type}</p>
            <p><span>Description: </span>{currVanDetail.description}</p>
            <p><span>Visbility: </span>Public</p>
        </div>
    )
}