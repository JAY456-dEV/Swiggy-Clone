import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Coordinates } from '../../../context/contextApi'
import { addMultiple, removeItem } from '../../../redux/cartSlice'
import { Link } from 'react-router-dom'
import ModelPortal from '../signInSlider/modelPortal'
import { RxCross1 } from 'react-icons/rx'

function Cart() {
    const { coord } = useContext(Coordinates)

    const cart = useSelector((state) => state.cart)
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    async function fetchDataById(res) {
        const response = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${coord.lat}&lng=${coord.lng}&restaurantId=${res}&catalog_qa=undefined&submitAction=ENTER`)
        const data = await response.json()
        console.log(data)
        if (data?.data?.cards) {
            // console.log(data?.data?.cards)
        }
    }

    useEffect(() => {
        fetchDataById(cart.resId)
    }, [cart, coord])


    if (cart && cart.length == 0) {
        return (
            <div className='flex justify-center items-center flex-col h-screen'>
                <h3 className='text-xl mb-2 font-semibold text-zinc-600'>Your cart is empty</h3>
                <p className='text-zinc-400'>You can go to home page to view more restaurants</p>
                <Link to={'/'} className='uppercase mt-5 bg-[#ff5200] py-3 px-5 text-white font-semibold'>SEE restaurants NEAR YOU</Link>
            </div>
        )
    }

    const [showPopupForOrder, setPopupForOrder] = useState('')

    function handlePlaceOrder() {
        if (user?.userInfo !== null) {
            setPopupForOrder('confim')
        } else {
            setPopupForOrder('pleaseLogin')
        }
    }

    return (
        <div className='bg-[#e9ecee]'>
            <div className='w-[65%] mx-auto py-8 relative'>
                {
                    showPopupForOrder == 'confim' && (
                        <ModelPortal>
                            <div className='bg-white w-[500px] h-[230px] absolute top-[50%] left-[50%] -translate-y-[50%]  -translate-x-[50%] p-4 px-6'>
                                <RxCross1 className='absolute right-4 cursor-pointer' size={23} onClick={() => setPopupForOrder('')} />
                                <div className='flex justify-center items-center flex-col mt-14 gap-10'>
                                    <p className='text-orange-500 text-2xl font-bold uppercase '>Order Confirmed</p>
                                    <button className='text-white text-xl font-bold uppercase  bg-orange-500 py-1 px-10 ' onClick={() => setPopupForOrder('')}>CONTINUE</button>
                                </div>
                            </div>
                        </ModelPortal>
                    )
                }
                {
                    showPopupForOrder == 'pleaseLogin' && (
                        <ModelPortal>
                            <div className='bg-white w-[500px] h-[230px] absolute top-[50%] left-[50%] -translate-y-[50%]  -translate-x-[50%] p-4 px-6'>
                                <RxCross1 className='absolute right-4 cursor-pointer' size={23} onClick={() => setPopupForOrder('')} />
                                <div className='flex justify-center items-center flex-col mt-14 gap-10'>
                                    <p className='text-orange-500 text-2xl font-bold uppercase '>Please Login</p>
                                    <button className='text-white text-xl font-bold uppercase  bg-orange-500 py-1 px-10 ' onClick={() => setPopupForOrder('')}>CONTINUE</button>
                                </div>
                            </div>
                        </ModelPortal>
                    )
                }
                <div className='bg-white  w-[40%]'>
                    <div className='flex gap-3 items-center shadow-lg px-6 py-3'>
                        <div>
                            <img className='w-16' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${cart[0]?.imageId}`} />
                        </div>
                        <div>
                            <h5 className='text-[1.1rem] font-semibold'>{cart[0]?.nameOfRes}</h5>
                            <p className='text-sm text-gray-600'>{cart[0]?.LocalityOfRes}</p>
                        </div>

                    </div>

                    <div className='h-[400px] overflow-hidden overflow-y-auto px-6 scrollbar-hide mt-5'>
                        <div>
                            {
                                cart && cart.length ? cart.map((item) => {
                                    return (
                                        <div className='flex justify-between items-center my-5' key={item.id}>
                                            <div className='flex gap-2 w-52'>
                                                {item.itemAttribute?.vegClassifier == 'VEG' ?
                                                    < img className='max-w-4' src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Veg_symbol.svg" alt="" /> :
                                                    <div className='w-4'>
                                                        <img className='w-full' src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/800px-Non_veg_symbol.svg.png' />
                                                    </div>
                                                }
                                                <p className='text-sm break-words'>{item.name}</p>
                                            </div>
                                            <div className='border flex gap-3 px-3 py-1 items-center'>
                                                <div className='cursor-pointer font-bold' onClick={() => dispatch(removeItem(item.id))}>-</div>
                                                <p className='text-[#60b246]'>{item.quantity}</p>
                                                <div className='text-[#60b246] cursor-pointer font-bold' onClick={() => dispatch(addMultiple(item.id))}>+</div>
                                            </div>
                                            <div className='flex flex-col items-center ml-3'>
                                                <p className='text-[0.7rem] line-through'>₹{parseInt(item?.defaultPrice || item?.finalPrice) / 100}</p>
                                                <p className='text-sm'>₹{
                                                    cart.map((prod) => prod.id == item.id && prod?.defaultPrice / 100 * item.quantity).reduce((acc, curr) => {
                                                        return acc + curr
                                                    }, 0).toFixed(2)
                                                }</p>
                                            </div>
                                        </div>
                                    )
                                }) : ''
                            }
                        </div>

                        <div className='bg-[#f9f9f9] px-4 py-1 flex items-start gap-2'>
                            <svg className="w-3 py-1" placeholder='Any Suggestions ? We Will Pass It on...' viewBox="0 0 32 32"><path d="M7.031 14c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7l-0.031-1c0-7.732 6.268-14 14-14v4c-2.671 0-5.182 1.040-7.071 2.929-0.364 0.364-0.695 0.751-0.995 1.157 0.357-0.056 0.724-0.086 1.097-0.086zM25.031 14c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7l-0.031-1c0-7.732 6.268-14 14-14v4c-2.671 0-5.182 1.040-7.071 2.929-0.364 0.364-0.695 0.751-0.995 1.157 0.358-0.056 0.724-0.086 1.097-0.086z"></path></svg>
                            <textarea className='outline-none border-none bg-[#f9f9f9] resize-none text-sm overflow-hidden'></textarea>
                        </div>

                        <div>
                            <p className='font-medium text-sm my-4'>Bill Details</p>
                            <div className='flex flex-col gap-2 text-zinc-500'>
                                <div className='flex items-center justify-between'>
                                    <p className='text-[0.8rem]'>Item Total</p>
                                    <p className='text-[0.8rem]'>₹{
                                        cart.map((item) => item.price / 100 * item.quantity).reduce((acc, curr) => {
                                            return acc + curr
                                        }, 0).toFixed(2)
                                    }</p>
                                </div>
                                <div className='flex items-center justify-between'>

                                    <p className='text-[0.8rem]'>Delivery Fee | 9.9 kms</p>
                                    <p className='text-[0.8rem]'>₹93</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className='text-[0.8rem]'>Extra discount for you</p>
                                    <p className='text-[0.8rem]'>- ₹23</p>
                                </div>
                            </div>
                            <hr className='my-6' />
                            <div className='flex flex-col gap-2'>
                                <div className='flex items-center justify-between'>
                                    <p className='text-[0.8rem] text-zinc-400'>Delivery Tip</p>
                                    <p className='text-[0.8rem] text-orange-600'>Add Tip</p>
                                </div>
                                <div className='flex items-center justify-between'>

                                    <p className='text-[0.8rem] text-zinc-400'>Platform fee</p>
                                    <p className='text-[0.8rem] text-zinc-400'>₹23</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className='text-[0.8rem] text-zinc-400'>GST and Restaurant Charges</p>
                                    <p className='text-[0.8rem] text-zinc-400'>₹45.57</p>
                                </div>
                            </div>
                            <hr className='border-2 my-3 border-black' />
                        </div>
                    </div>
                    <div className=' pt-5 px-6 shadow-md'>
                        <div className='flex justify-between items-center text-[1rem] font-bold'>
                            <p>TO PAY</p>
                            <p>₹{
                                cart.map((item) => item.price / 100 * item.quantity).reduce((acc, curr) => {
                                    return acc + curr
                                }, 116).toFixed(2)
                            }</p>
                        </div>
                        <button className='w-full bg-orange-500 my-4 h-12 uppercase font-bold text-white' onClick={handlePlaceOrder}>
                            ORDER
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Cart
