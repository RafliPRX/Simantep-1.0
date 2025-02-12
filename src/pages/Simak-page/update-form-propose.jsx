import Proposed_Detail from '../../component/Simak-component/propose-update'
import Sidebar_simak from '../../component/Simak-component/sidebar-simak'
import './dashboard-simak.css'

const Detail_Form_Propose = () => {
    return(
        <>
            <div className='dashboard'>
                <Sidebar_simak/>
                <Proposed_Detail/>
            </div>
        </>
    )
}
export default Detail_Form_Propose