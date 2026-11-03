
import { useState } from 'react';
import default_pic from '../../assets/profile.svg';
const Notification_Tab = () => {
    const [activeTab, setActiveTab] = useState('identitas');
    return (
        <>
            <div className='d-flex flex-column gap-3 w-100'>
                <div className='tab-container'>                            
                    <ul className='tab-list'>
                        <li className={`tab-item ${activeTab === 'mawasdiri' ? 'active' : ''}`}
                        onClick={() => setActiveTab('mawasdiri')}>
                            MAWASDIRI
                        </li>
                        <li className={`tab-item ${activeTab === 'simak' ? 'active' : ''}`}
                        onClick={() => setActiveTab('simak')}>
                            SIMAK
                        </li>
                        <li className={`tab-item ${activeTab === 'silaras' ? 'active' : ''}`}
                        onClick={() => setActiveTab('silaras')}>
                            SILARAS
                        </li>
                    </ul>
                </div>
                {activeTab === 'mawasdiri' && (
                    <>                    
                        <h1 className='content-title fw-bold mt-0'>Notifikasi MAWASDIRI</h1>
                        <div className='d-flex flex-row gap-3 align-items-center'>
                            <img src={default_pic} className="rounded-circle bg-blue-profile p-1" alt="" />
                            <p className='text-white'>Jane Doe</p>
                            <p className='text-white'>Subjek Saat ini</p>
                            <div className='d-flex flex-column align-items-center'>
                                <p className='text-white'>Buka</p>
                                <p className='text-white'>Tandai Telah dibaca</p>
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 'simak' && (
                    <>
                        <h1 className='content-title fw-bold mt-0'>Notifikasi SIMAK</h1>
                        <div className='d-flex flex-row gap-3'>
                            <img src={default_pic} className="rounded-circle bg-blue-profile p-1" alt="" />
                            <p className='text-white'>Jane Doe</p>
                            <p className='text-white'>Subjek Saat ini</p>
                            <div className='d-flex flex-column'>
                                <p className='text-white'>Jane Doe</p>
                                <p className='text-white'>Tandai Telah dibaca</p>
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 'silaras' && (
                    <>
                        <h1 className='content-title fw-bold mt-0'>Notifikasi SILARAS</h1>
                        <div className='d-flex flex-row gap-3'>
                            <img src={default_pic} className="rounded-circle bg-blue-profile p-1" alt="" />
                            <p className='text-white'>Jane Doe</p>
                            <p className='text-white'>Subjek Saat ini</p>
                            <div className='d-flex flex-column'>
                                <p className='text-white'>Jane Doe</p>
                                <p className='text-white'>Tandai Telah dibaca</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Notification_Tab