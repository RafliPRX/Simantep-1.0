import Absent_Malam from '../../component/Mawasdiri-component/absent_malam'
import Sidebar from '../../component/Mawasdiri-component/sidebar'
import './cuti-form.css'

const Absent_Page_Malam = () => {
    return(
        <>
            <div className='dashboard'>
                <Sidebar/>
                <Absent_Malam title="Absensi Malam"/>
            </div>
        </>
    )
}
export default Absent_Page_Malam