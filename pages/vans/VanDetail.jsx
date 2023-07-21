import React from "react";
import { Link, useLocation, useLoaderData, defer, Await } from "react-router-dom";
import { getVan }from "../../api";
import { requireAuth } from "../../utils";

export async function loader({ params,request }){
    await requireAuth(request);
    return defer({van: getVan(params.id)});
}

export default function VanDetail(){
    const location = useLocation();
    const vanPromise = useLoaderData();

    const search = location.state?.search || ""; //optional chaining
    // const filteredType = search.split("=")[1] // 1 way of getting the type of filter
    const filteredType = location.state?.type || "all"
    function renderVanDetails(van){
        return(
        <div className="van-detail">
            <img src={van.imageUrl} />
            <i className={`van-type ${van.type} selected`}>{van.type}</i>
            <h2>{van.name}</h2>
            <p className="van-price"><span>${van.price}</span>/day</p>
            <p>{van.description}</p>
            <button className="link-button">Rent this van</button>
        </div>
        )
    }
    return (
        <div className="van-detail-container">
            <Link to={`..${search}`} relative="path" className="back-button">&#x2190; <span>Back to {filteredType} vans</span></Link>
            <React.Suspense fallback={<h2>Loading van details...</h2>}>
                <Await resolve={vanPromise.van}>
                    {renderVanDetails}
                </Await>
            </React.Suspense>
        </div>
    )
}

