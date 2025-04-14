import Absent_Out from '../../component/Mawasdiri-component/absent-out'
import Sidebar from '../../component/Mawasdiri-component/sidebar'
import './cuti-form.css'

const Absent_Page_Out = () => {
    return(
        <>
            <div className='dashboard'>
                <Sidebar/>
                <Absent_Out title="Absensi Keluar"/>
            </div>
        </>
    )
}
export default Absent_Page_Out