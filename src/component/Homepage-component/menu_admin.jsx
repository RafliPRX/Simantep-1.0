import './menu.css'
import absen from '../../assets/absen.png'
 
const Menu_Admin = () => {    
    return(
        <>
            <div className='menu'>
                <div className='menu-disp'>
                    <div className='card'>
                        <div className='pic' style={{backgroundImage: `url(${absen})`, backgroundColor: "lightgray", backgroundSize: "cover" }}></div>
                        <div className='text'>
                            <h3>ACCOUNT SETTING</h3>
                            <h5>Setting Akun SIMANTEB</h5>
                            <button onClick={() => window.location.href = "/Home-Admin/Akun-Dashboard"}>Masuk</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Menu_Admin