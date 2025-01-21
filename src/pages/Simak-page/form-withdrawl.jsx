import Sidebar_simak from '../../component/Simak-component/sidebar-simak'
import Withdraw from '../../component/Simak-component/withdraw'
import './dashboard-simak.css'

const Form_withdrawl = () => {
    return(
        <>
            <div className='dashboard'>
                <Sidebar_simak/>
                <Withdraw/>
            </div>
        </>
    )
}
export default Form_withdrawl