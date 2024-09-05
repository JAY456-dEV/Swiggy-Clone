import React from 'react';
import { motion } from 'framer-motion';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';

function LoginUserSlider({ closeSignInModel, logoutUser }) {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    // console.log(user)

    const variants = {
        hidden: { x: '100%', opacity: 0 },
        visible: { x: '0%', opacity: 1 },
        exit: { x: '100%', opacity: 0 }
    };

    console.log(user)
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
                    <div>
                        <img className='w-20 mt-6 mb-5 rounded-full' src={user?.userInfo?.img} alt="" />
                    </div>
                    <h3 className='text-3xl font-semibold'>{user?.userInfo?.name}</h3>
                    <p className='mt-2 text-sm'><span className='text-orange-500 font-medium cursor-pointer' >Hey, How Are Your</span></p>
                    {/* <div className='w-10 border-b-2 border-black absolute top-40'></div> */}
                </div>
            </div>
            <button className='bg-[#ff5200] text-white text-center mt-6 w-full h-12 text-sm font-bold' onClick={logoutUser} >
                LOGOUT
            </button>
        </motion.div >
    );
}

export default LoginUserSlider;
