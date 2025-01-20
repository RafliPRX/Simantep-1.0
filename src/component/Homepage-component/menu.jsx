import './menu.css'
import absen from '../../assets/absen.png'
import simak from '../../assets/simak.png'
import silaras from '../../assets/silaras.png'
const Menu = () => {
    return(
        <>
            <div className='menu'>
                <div className='card'>
                <div className='pic' style={{backgroundImage: `url(${absen})`, backgroundColor: "lightgray", backgroundSize: "cover" }}></div>
                    <div className='text'>
                        <h3>MAWASDIRI</h3>
                        <h5>Manajemen Pegawai Berbasis Kinerja Mandiri</h5>
                        <button onClick={() => window.location.href = "/Dashboard"}>Masuk</button>
                    </div>
                </div>
                <div className='card'>
                    <div className='pic' style={{backgroundImage: `url(${simak})`, backgroundColor: "lightgray", backgroundSize: "cover" }}></div>
                    <div className='text'>
                        <h3>SIMAK</h3>
                        <h5>Sistem Manajemen Keuangan</h5>
                        <button onClick={() => window.location.href = "/Dashboard"}>Masuk</button>
                    </div>
                </div>
                <div className='card'>
                    <div className='pic' style={{backgroundImage: `url(${silaras})`, backgroundColor: "lightgray", backgroundSize: "cover" }}></div>
                    <div className='text'>
                        <h3>SI LARAS</h3>
                        <h5>Sistem Layanan saran dan Prasarana</h5>
                        <button onClick={() => window.location.href = "/Dashboard-laras"}>Masuk</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Menu