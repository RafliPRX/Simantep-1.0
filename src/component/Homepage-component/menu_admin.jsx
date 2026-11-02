import '../css/menu.css'
import absen from '../../assets/absen.png'
 
const Menu_Admin = () => {    
    return(
        <>
            <div className='container-fluid'>
                <div className=' d-flex flex-row justify-content-center flex-wrap gap-5'>
                    <div className='menu flex-column gap-5'>
                        <div className='menu-card p-4 gap-3'>
                            <div className='menu-pic' style={{backgroundImage: `url(${absen})`, backgroundColor: "lightgray", backgroundSize: "cover" }}></div>
                            <div className='text'>
                                <h3 className='menu-h3'>ACCOUNT SETTING</h3>
                                <h5 className='text-white'>Setting Akun SIMANTEB</h5>
                                <button className='menu-button p-3 mt-3' onClick={() => window.location.href = "/Home-Admin/Akun-Dashboard"}>Masuk</button>
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Menu_Admin