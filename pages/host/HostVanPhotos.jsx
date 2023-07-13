import React from "react";
import { useOutletContext } from "react-router-dom"

export default function HostVanPhotos(){

    const {currVanDetail} = useOutletContext();
    return(
        
        <img className="hostDetail-photo" src={currVanDetail.imageUrl} />
    )
}