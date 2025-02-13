import Sidebar_simak from '../../component/Simak-component/sidebar-simak'
import './dashboard-simak.css'
import Update_Withdraw from '../../component/Simak-component/update-withdraw'
import Detail_Withdraw from '../../component/Simak-component/detail-withdrawl';
import { useState } from 'react';

const Detail_Form_withdrawl = () => {
        const [showDetail, setShowDetail] = useState(true);
        const toggleForm = () => {
            setShowDetail(!showDetail);
        };    
    
    return(
        <>
            <div className='dashboard'>
                <Sidebar_simak/>
                <div className='content'>
                    <button className='switch' onClick={toggleForm}>
                        {showDetail ? 'Switch to Update Form' : 'Switch to Detail Form'}
                    </button>
                    {showDetail ? <Detail_Withdraw/> : <Update_Withdraw/>}
                </div>                
            </div>
        </>
    )
}
export default Detail_Form_withdrawl