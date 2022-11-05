import React from 'react';
import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Checkout = () => {
    const { _id, title, price } = useLoaderData()
    const { user } = useContext(AuthContext)

    const handlePlaceOrder = event => {
        event.preventDefault()
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregisterd';
        const phone = form.phone.value;
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }
    }

    return (
        <div>
            <h2 className="text-4xl">You are about to order: {title}</h2>
            <h2 className="text-3xl">Price: {price}</h2>
            <form onSubmit={handlePlaceOrder}>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <input name='firstName' type="text" placeholder="First Name" className="input input-bordered input-ghost w-full" />
                    <input name='lastName' type="text" placeholder="Last Name" className="input input-ghost input-bordered w-full" />
                    <input name='phone' type="text" placeholder="Your Phone" className="input input-ghost input-bordered w-full" />
                    <input name='email' type="text" placeholder="Your email" defaultValue={user?.email} className="input input-ghost input-bordered w-full" readOnly />
                </div>
                <textarea name='message' className="textarea textarea-bordered h-24 w-full" placeholder="Your message"></textarea>
                <input name='' className='btn' type="submit" value="Place your order" />
            </form>
        </div>
    );
};

export default Checkout;