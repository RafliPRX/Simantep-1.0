import { useState } from 'react';
import Fix_form_Detail from '../../component/Silaras-component/fix-form-detail';
import Fix_form_Update from '../../component/Silaras-component/fix-form-update';
import Sidebar_laras from '../../component/Silaras-component/sidebar-laras';
import './fix-form.css';

const Fix_Detail = () => {
    const [showDetail, setShowDetail] = useState(true);

    const toggleForm = () => {
        setShowDetail(!showDetail);
    };

    return (
        <> 
            <div className="dashboard">
            <Sidebar_laras/>
                <div className='content'>
                
                <button className='switch' onClick={toggleForm}>
                    {showDetail ? 'Switch to Update Form' : 'Switch to Detail Form'}
                </button>
                {showDetail ? <Fix_form_Detail/> : <Fix_form_Update/>}
                </div>
            </div>
        </>
    );
}

export default Fix_Detail;
