import { useState } from 'react';
import Proposed_Update from '../../component/Simak-component/proposed_update'
import Sidebar_simak from '../../component/Simak-component/sidebar-simak'
import './dashboard-simak.css'
import Proposed_Detail from '../../component/Simak-component/proposed-detail';

const Detail_Form_Propose = () => {
    const [showDetail, setShowDetail] = useState(true);
    const toggleForm = () => {
        setShowDetail(!showDetail);
    };    
    return(
        <>
            <div className='dashboard'>
            <Sidebar_simak/>
                <div className='content'>
                    <button className='switch1' onClick={toggleForm}>
                        {showDetail ? 'Switch to Update Form' : 'Switch to Detail Form'}
                    </button>
                    {showDetail ? <Proposed_Detail/> : <Proposed_Update/>}
                </div>
            </div>
        </>
    )
}
export default Detail_Form_Propose