import './css/profile.css';
import PropTypes from "prop-types";
import { useState } from 'react';
import default_pic from '../assets/profile.jpg';
import Info from './info';
import Info_Simak from './info_simak';
import Info_Silaras from './info_silaras';
const Profile = (
    {nama, f_profile, feature}
) => {
    const [show, setShow] = useState(false)

    const get_Show = () => {
        setShow(!show)
    }
    return(
        <>
            <div className='profile'>
                <p style={{fontFamily: 'Poppins', fontSize: '15px', marginTop: '22px'}}>{nama}</p>
                <svg onClick={get_Show} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g clipPath="url(#clip0_5_1232)">
                    <path d="M19.29 17.29L18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.62999 5.36 5.99999 7.92 5.99999 11V16L4.70999 17.29C4.07999 17.92 4.51999 19 5.40999 19H18.58C19.48 19 19.92 17.92 19.29 17.29ZM16 17H7.99999V11C7.99999 8.52 9.50999 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17ZM12 22C13.1 22 14 21.1 14 20H9.99999C9.99999 21.1 10.89 22 12 22Z" fill="white"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_5_1232">
                      <rect width="24" height="24" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 18 18" fill="none">
                  <g clipPath="url(#clip0_5_1230)">
                    <path d="M9.95691 18C12.7329 18 15.2683 16.737 16.948 14.6675C17.1965 14.3613 16.9255 13.9141 16.5415 13.9872C12.175 14.8188 8.1651 11.4709 8.1651 7.06303C8.1651 4.52398 9.52431 2.18914 11.7334 0.931992C12.0739 0.738211 11.9883 0.221941 11.6013 0.150469C11.0589 0.0504468 10.5085 8.21369e-05 9.95691 0C4.98902 0 0.956909 4.02578 0.956909 9C0.956909 13.9679 4.98269 18 9.95691 18Z" fill="white"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_5_1230">
                      <rect width="18" height="18" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
                <div style={{background: f_profile === '' ? `url(${default_pic})` : `url(https://simantepbareta.cloud/API/${f_profile})`, backgroundSize: "76%", backgroundPosition: "50% 5%"}} className='pic-profile'></div>
            </div>
            <div style={{transition: "all .5s", opacity: !show ? "0" : "1", visibility: !show ? "hidden" : "visible", display: feature === 'mawasdiri' ? "flex" : "none"}} className="notification">
              <Info nama={nama}/>
            </div>
            <div style={{transition: "all .5s", opacity: !show ? "0" : "1", visibility: !show ? "hidden" : "visible", display: feature === 'simak' ? "flex" : "none"}} className="notification">
              <Info_Simak nama={nama}/>
            </div>
            <div style={{transition: "all .5s", opacity: !show ? "0" : "1", visibility: !show ? "hidden" : "visible", display: feature === 'silaras' ? "flex" : "none"}} className="notification">
              <Info_Silaras nama={nama}/>
            </div>    
        </>
    )
}

export default Profile

Profile.propTypes = {
    nama: PropTypes.string,
    f_profile: PropTypes.string,
    feature: PropTypes.string
};