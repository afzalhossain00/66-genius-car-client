import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
    const [services, setServices] = useState([]);
    const [isAsc, setIsAsc] = useState(true)
    const [search, setSearch] = useState('')
    const searchRef = useRef();

    useEffect(() => {
        fetch(`http://localhost:5000/services?search=${search}&order=${isAsc ? 'asc' : 'desc'}`)
            .then(res => res.json())
            .then(data => setServices(data))
    }, [isAsc, search])

    const handleSearch = () => {
        setSearch(searchRef.current.value);
    }

    return (
        <div>
            <div className='text-center mb-8'>
                <p className="text-2xl font-bold text-orange-600">Services</p>
                <h2 className='text-5xl font-bold'>Our Service Area</h2>
                <p className='w-1/2 mx-auto'>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                <input className='input input-sm mt-4 mr-4' placeholder='Search' ref={searchRef} type="text" />
                <button onClick={handleSearch} className='btn btn-outline btn-warning btn-sm mr-3'>Search</button>
                <button className="btn btn-outline btn-warning btn-sm" onClick={() => setIsAsc(!isAsc)}>{isAsc ? 'desc' : 'asc'}</button>
            </div>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6'>
                {
                    services.map(service => <ServiceCard
                        key={service._id}
                        service={service}
                    ></ServiceCard>)
                }
            </div>
            <div className='flex justify-center mt-16 mb-36'>
                <button className="btn btn-outline btn-warning">More Services</button>
            </div>
        </div>
    );
};

export default Services;