import React from 'react'
import OnYourMind from './onYourMind';
import TopRestaurant from './topRestaurant ';
import OnlineFoodDelivery from './onlineFoodDelivery';

function Body() {

    return (
        <div className='w-[75%] mx-auto'>
            <OnYourMind />
            <TopRestaurant />
            <OnlineFoodDelivery />
        </div>
    )
}
export default Body