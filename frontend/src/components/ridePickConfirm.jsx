import React from 'react'
import './confirmRide.css'
import './captinDetails.css';
import './ridePopUp.css';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const RidePopUp = ({SetconfirmRidePannel,rideWithUser}) => {
   let navigate = useNavigate()
    async function startRide(){
        let rideId = rideWithUser._id;
        let response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`,{rideId},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        if(response.status == 200){
            navigate('/captin-riding',{state:{rideWithUser}})
        }
    }
  return (
    <div className='RidePopup'>
        <h1>Confirm Ride</h1>
        <div className='captin2'>
            <div className='driver'>
                <img src='/images/dp.jpeg' />
                <p className='driv_name'>Shahmir</p>
            </div>
                <p>600 $</p>
            </div>  
        <i
            className='icon ri-arrow-down-wide-line point3'
            onClick={() => {
                SetconfirmRidePannel(false)
            }}
        ></i> 
        <div className='Detailsxx'>
        <i class="ri-map-pin-line point4"></i>
            <p className='location'>{rideWithUser?.pickup}</p>
            {/* <p>street 17D</p> */}
        </div>
        <div className='Detailsxx'>
        <i class="ri-map-pin-2-fill point4"></i>
            <p className='location'>{rideWithUser?.destination}</p>
            {/* <p>street 17D</p> */}
        </div>
        <div className='Detailsxx'>
        <i class="ri-cash-line point4"></i>
            <p className='location'>{rideWithUser?.fare} $</p>
            <p>Cash</p>
        </div>
        {/* <button className='Ride Confirm'>Confirm</button>
        <button className='Ride Ignore'>Ignore</button> */}
        <div className='button-container'>
            {/* <Link to={'/captin-riding'} className='Ride'>Confirm </Link> */}
            <button className='Ride' onClick={startRide}>Start Ride</button>
            <button className='Ride Ignore' onClick={()=>{SetconfirmRidePannel(false)}}>Cancel</button>
        </div>
    </div>
  )
}

export default RidePopUp
