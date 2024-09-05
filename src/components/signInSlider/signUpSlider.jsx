import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RxCross2 } from 'react-icons/rx';

function SignUpSlider({ closeSignInModel, handleLoginAccount }) {
    const variants = {
        hidden: { x: '100%', opacity: 0 },
        visible: { x: '0%', opacity: 1 },
        exit: { x: '100%', opacity: 0 }
    };

    const [checkFocus, setCheckFocus] = useState({
        number: false,
        name: false,
        email: false
    })

    function handleFocus(e) {
        setCheckFocus({ ...checkFocus, [e.target.name]: true })
    }

    function handleblurinput(e) {
        setCheckFocus({ ...checkFocus, [e.target.name]: false })
    }

    return (
        <motion.div
            className='absolute right-0 top-0 w-[37%] h-screen bg-white py-5 px-8 pr-36'
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.2 }}
        >
            {/* Content of your slider */}
            <RxCross2 onClick={closeSignInModel} size={30} color='gray' cursor={'pointer'} />
            <div className='flex justify-between items-center'>
                <div>
                    <h3 className='text-3xl font-semibold'>Sign Up</h3>
                    <p className='mt-2 text-sm'>or <span className='text-orange-500 font-medium cursor-pointer' onClick={handleLoginAccount}>Login into your  account</span></p>
                    <div className='w-10 border-b-2 border-black absolute top-40'></div>
                </div>
                <div>
                    <img className='w-28' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="" />
                </div>
            </div>

            <div className='mt-10 border-collapse'>
                <div className='border border-gray-200 h-16 px-4'>
                    <p onClick={() => setCheckFocus(prev => ({ ...prev, number: true }))} className={`mt-1 font-semibold text-gray-500 w-full ${!checkFocus['number'] ? 'text-base py-4' : 'text-sm'} transition-all`}>Phone Number</p>
                    {
                        checkFocus['number'] ? <input type="number" className='w-full py-1 text-lg font-semibold outline-none border-none' name='number' autoFocus onFocus={handleFocus} onBlur={handleblurinput} /> : null
                    }
                </div>
                <div className='border border-gray-200 h-16 px-4'>
                    <p onClick={() => setCheckFocus(prev => ({ ...prev, name: true }))} className={`font-semibold text-gray-500  ${!checkFocus['name'] ? 'text-base py-5' : 'text-sm'} transition-all`}>Name</p>
                    {
                        checkFocus['name'] ? (<input type="number" className='w-full py-1 text-lg font-semibold outline-none border-none' name='name' onFocus={handleFocus} onBlur={handleblurinput} autoFocus={checkFocus['name']} />) : null
                    }
                </div>
                <div className='border border-gray-200 h-16 px-4'>
                    <p onClick={() => setCheckFocus(prev => ({ ...prev, email: true }))} className={`mt-1 font-semibold text-gray-500  ${!checkFocus['email'] ? 'text-base py-4' : 'text-sm'} transition-all`}>Email</p>
                    {
                        checkFocus['email'] ? (<input type="number" className='w-full py-1 text-lg font-semibold outline-none border-none' name='email' onFocus={handleFocus} onBlur={handleblurinput} autoFocus />) : null
                    }
                </div>
            </div>

            <button className='bg-[#ff5200] text-white text-center mt-6 w-full h-12 text-sm font-bold'>
                LOGIN
            </button>
            <p className='text-[0.73rem] mt-3 font-semibold'><span className='text-gray-500'>By clicking on Login, I accept the</span> Terms & Conditions & Privacy Policy</p>
        </motion.div >
    );
}

export default SignUpSlider;
