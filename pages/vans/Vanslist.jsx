import React from "react"
import { Link, useLoaderData, useSearchParams } from 'react-router-dom'
import { getVans } from "../../api"
import { requireAuth } from "../../utils";

export async function loader({request}){
    await requireAuth(request);
    return getVans()
}

export default function Vanslist() {
    const [searchParams, setSearchParams] = useSearchParams();
    const vanTypeFilter = searchParams.get('type');

    const vans = useLoaderData();

    const displayedVans = vanTypeFilter ? vans.filter(van => van.type.toLowerCase() === vanTypeFilter) : vans
    
    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if(value === null){
               prevParams.delete(key);
            } else{
                prevParams.set(key, value);
            }
            return prevParams;
        })
    }
    const vanElements = displayedVans.map(van => (
        <div key={van.id} className="van-tile">
            <Link to={van.id} state={{ search: `?${searchParams.toString()}`,type: vanTypeFilter }}>
            <img src={van.imageUrl} />
            <div className="van-info">
                <h3>{van.name}</h3>
                <p>${van.price}<span>/day</span></p>
            </div>
            <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ))
    
    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list-filter-buttons">
                <button className={`van-type simple ${vanTypeFilter==="simple" ? "selected" : ""}`} onClick={()=> handleFilterChange("type", "simple")}>Simple</button>
                <button className={`van-type rugged ${vanTypeFilter==="rugged" ? "selected" : ""}`} onClick={()=> handleFilterChange("type", "rugged")}>Rugged</button>
                <button className={`van-type luxury ${vanTypeFilter==="luxury" ? "selected" : ""}`} onClick={()=> handleFilterChange("type", "luxury")}>Luxury</button>
                { vanTypeFilter ? (<button className="van-type clear-filters" onClick={() => handleFilterChange("type", null)}>Clear filters</button>) : null }
            </div>
            <div className="van-list">
                {vanElements}
            </div>
        </div>

    );
}