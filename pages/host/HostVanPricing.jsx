import React from "react";
import { useOutletContext } from "react-router-dom"

export default function HostVanPricing(){
    const {currVanDetail} = useOutletContext();
    return(
        <div className="host-van-pricing">
            <p><span>${currVanDetail.price}</span>/day</p>
        </div>
    )
}