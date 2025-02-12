import Detail_Withdraw from '../../component/Simak-component/update-withdraw'
import Sidebar_simak from '../../component/Simak-component/sidebar-simak'
import './dashboard-simak.css'

const Detail_Form_withdrawl = () => {
    return(
        <>
            <div className='dashboard'>
                <Sidebar_simak/>
                <Detail_Withdraw/>
            </div>
        </>
    )
}
export default Detail_Form_withdrawl