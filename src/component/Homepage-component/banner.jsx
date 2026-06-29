/* eslint-disable react/prop-types */
import '../css/banner.css'
const Banner = ({Logout}) => {
    return(
        <>
            <div className='container-fluid p-5'>
                <div className='d-flex p-banner mt-3 position-relative align-items-center rounded-5 banner-pic border-0 flex-row'>
                    <div className='banner-text text-white d-flex flex-column gap-3'>
                        <h1 className='banner-h1'>Selamat Datang</h1>
                        <h2 className='banner-h2'>Sistem Manajemen Terpadu</h2>
                        <h3 className='banner-h3'>Balai Rehabilitasi Narkotika Tanah Merah</h3>
                        <div className='d-flex flex-row gap-5 align-items-center'>
                            <button className='banner-button mt-5' onClick={Logout}>Keluar</button>
                            <a className='mt-5 banner-a' href="https://wa.me/6287777165162 ">Butuh Bantuan ?</a>
                        </div>
                    </div>
                    <div className='asset'></div>
                </div>
            </div>
        </>
    )
}
export default Banner