import Sidebar from '../../component/Mawasdiri-component/sidebar'
import './cuti-form.css'
import Cuti_Detail_Form from '../../component/Mawasdiri-component/detail-cuti'
import { useState } from 'react';
import Cuti_form_Update from '../../component/Mawasdiri-component/update-cuti';
const Cuti_Detail = () =>  {
    const [showDetail, setShowDetail] = useState(true);

    const toggleForm = () => {
        setShowDetail(!showDetail);
    }
    return(
        <> 
            <div className="dashboard">
                <Sidebar/>
                <div className='content'>
                <button className='switch' onClick={toggleForm}>
                    {showDetail ? 'Switch to Update Form' : 'Switch to Detail Form'}
                </button>
                {showDetail ? <Cuti_Detail_Form/> : <Cuti_form_Update/>}
                </div>
            </div>
        </>
    )
}
export default Cuti_Detail