import Absent_Out_Malam from '../../component/Mawasdiri-component/absent-out-malam'
import Sidebar from '../../component/Mawasdiri-component/sidebar'
import '../../component/css/dashboard.css';

const Absent_Page_Out_Malam = () => {
    return(
        <>
            <div className='dashboard'>
                <Sidebar/>
                <Absent_Out_Malam title="Absensi Keluar Malam"/>
            </div>
        </>
    )
}
export default Absent_Page_Out_Malam