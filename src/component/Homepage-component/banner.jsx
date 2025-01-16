/* eslint-disable react/prop-types */
import './banner.css'
const Banner = ({onDiscoveryClick}) => {
    return(
        <>
            <div className='banner'>
                <div className='banner-pic'>
                    <div className='text-group'>
                        <h1>Selamat Datang</h1>
                        <h2>di Sistem Manajemen Terpadu</h2>
                        <h3>Balai Rehabilitasi BNN Tanah Merah</h3>
                        <button onClick={onDiscoveryClick}>Discover Now</button>
                        <a href="https://wa.me/6287777165162 ">Need Help ?</a>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Banner