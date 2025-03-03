import axios from 'axios';
import './cuti.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const Cuti_Detail_Form = () => {
    const [detail, setDetail] = useState({});
    const param = useParams();
    const getDetail = async () => {
        try {
            const response = await axios.get(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/detail_surat.php?id=${param.id}`, {
                headers: {}
            });
            console.log(response.data);
            setDetail(response.data);            
        } catch (error) {
            console.log(error.response);
        }
    }
    useEffect(() => {
        getDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return(
        <>
            <div className='main-dashboard'>
                <p>Mawasdiri/Pengajuan Cuti</p>
                <h1>Pengajuan Cuti</h1>
                <div className='profile'>
                    <input placeholder='Search' type="text" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <g clipPath="url(#clip0_5_1232)">
                        <path d="M19.29 17.29L18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.62999 5.36 5.99999 7.92 5.99999 11V16L4.70999 17.29C4.07999 17.92 4.51999 19 5.40999 19H18.58C19.48 19 19.92 17.92 19.29 17.29ZM16 17H7.99999V11C7.99999 8.52 9.50999 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17ZM12 22C13.1 22 14 21.1 14 20H9.99999C9.99999 21.1 10.89 22 12 22Z" fill="white"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_5_1232">
                          <rect width="24" height="24" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 18 18" fill="none">
                      <g clipPath="url(#clip0_5_1230)">
                        <path d="M9.95691 18C12.7329 18 15.2683 16.737 16.948 14.6675C17.1965 14.3613 16.9255 13.9141 16.5415 13.9872C12.175 14.8188 8.1651 11.4709 8.1651 7.06303C8.1651 4.52398 9.52431 2.18914 11.7334 0.931992C12.0739 0.738211 11.9883 0.221941 11.6013 0.150469C11.0589 0.0504468 10.5085 8.21369e-05 9.95691 0C4.98902 0 0.956909 4.02578 0.956909 9C0.956909 13.9679 4.98269 18 9.95691 18Z" fill="white"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_5_1230">
                          <rect width="18" height="18" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                    <div className='pic'></div>
                </div>
                <div className='content-col'>
                    <div className='box'>
                        <div className='content-f'>
                            <h1>Data Diri</h1>
                            <table>
                                <tr>
                                  <td>Nama</td>
                                </tr>
                                <tr>
                                  <td className='input'>{detail.nama}</td>
                                </tr>
                                <tr>
                                  <td>NIP/NRK</td>
                                </tr>
                                <tr>
                                  <td className='input'>{detail.nrk}</td>
                                </tr>
                                <tr>
                                  <td>Jabatan</td>
                                </tr>
                                <tr>
                                  <td className='input'>{detail.jabatan}</td>
                                </tr>
                                <tr>
                                  <td>No.Handphone</td>
                                </tr>
                                <tr>
                                  <td className='input'>{detail.no_hp}</td>
                                </tr>
                                <tr>
                                  <td>Alasan</td>
                                </tr>
                                <tr>
                                  <td className='input'>{detail.keterangan}</td>
                                </tr>
                                <tr>
                                  <td>Jenis Surat</td>
                                </tr>
                                <tr>
                                  <td className='input'>{detail.jenis_surat}</td>
                                </tr>
                                <div style={{display: detail.jenis_surat === 'Cuti' ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
                                    <tr>
                                      <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Cuti Kontrak</td>
                                    </tr>
                                    <tr>
                                      <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>{detail.cuti}</td>
                                    </tr>
                                    <tr>
                                      <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Di mulai dari Tanggal</td>
                                    </tr>
                                    <tr style={{display: 'flex', flexDirection: 'row'}}>
                                      <td className='input' style={{display: 'flex' ,alignItems: 'center', width: 'auto', paddingRight: '35px'}}>{detail.cuti_date}</td>
                                      <td className='input' style={{display: 'flex' ,alignItems: 'center', width: 'auto', paddingRight: '35px'}}>s.d</td>
                                      <td className='input' style={{display: 'flex' ,alignItems: 'center', width: 'auto', paddingRight: '35px'}}>{detail.cuti_date_fin}</td>
                                    </tr>
                                </div>
                                <div style={{display: detail.jenis_surat === 'Cuti Alasan Penting' ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
                                    <tr>
                                      <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Cuti Kontrak</td>
                                    </tr>
                                    <tr>
                                      <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>{detail.cuti}</td>
                                    </tr>
                                    <tr>
                                      <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Di mulai dari Tanggal</td>
                                    </tr>
                                    <tr style={{display: 'flex', flexDirection: 'row'}}>
                                      <td className='input' style={{display: 'flex' ,alignItems: 'center', width: 'auto', paddingRight: '35px'}}>{detail.cuti_date}</td>
                                      <td className='input' style={{display: 'flex' ,alignItems: 'center', width: 'auto', paddingRight: '35px'}}>s.d</td>
                                      <td className='input' style={{display: 'flex' ,alignItems: 'center', width: 'auto', paddingRight: '35px'}}>{detail.cuti_date_fin}</td>
                                    </tr>
                                </div>
                                <div style={{display: detail.jenis_surat === 'Izin' ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
                                    <tr>
                                      <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Cuti Kontrak</td>
                                    </tr>
                                    <tr>
                                      <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>{detail.cuti}</td>
                                    </tr>
                                    <tr>
                                      <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Di mulai dari Tanggal</td>
                                    </tr>
                                    <tr style={{display: 'flex', flexDirection: 'row'}}>
                                      <td className='input' style={{display: 'flex' ,alignItems: 'center', width: 'auto', paddingRight: '35px'}}>{detail.cuti_date}</td>
                                      <td className='input' style={{display: 'flex' ,alignItems: 'center', width: 'auto', paddingRight: '35px'}}>s.d</td>
                                      <td className='input' style={{display: 'flex' ,alignItems: 'center', width: 'auto', paddingRight: '35px'}}>{detail.cuti_date_fin}</td>
                                    </tr>
                                </div>
                                <div style={{display: detail.jenis_surat === 'Cuti Hamil' ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
                                    <tr>
                                      <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Cuti Kontrak</td>
                                    </tr>
                                    <tr>
                                      <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>{detail.cuti}</td>
                                    </tr>
                                    <tr>
                                      <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Di mulai dari Tanggal</td>
                                    </tr>
                                    <tr style={{display: 'flex', flexDirection: 'row'}}>
                                      <td className='input' style={{display: 'flex' ,alignItems: 'center', width: 'auto', paddingRight: '35px'}}>{detail.cuti_date}</td>
                                      <td className='input' style={{display: 'flex' ,alignItems: 'center', width: 'auto', paddingRight: '35px'}}>s.d</td>
                                      <td className='input' style={{display: 'flex' ,alignItems: 'center', width: 'auto', paddingRight: '35px'}}>{detail.cuti_date_fin}</td>
                                    </tr>
                                </div>
                                <div style={{display: detail.jenis_surat === 'Sakit' ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
                                    <tr>
                                      <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Cuti Kontrak</td>
                                    </tr>
                                    <tr>
                                      <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>{detail.cuti}</td>
                                    </tr>
                                    <tr>
                                      <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Di mulai dari Tanggal</td>
                                    </tr>
                                    <tr style={{display: 'flex', flexDirection: 'row'}}>
                                      <td className='input' style={{display: 'flex' ,alignItems: 'center', width: 'auto', paddingRight: '35px'}}>{detail.cuti_date}</td>
                                      <td className='input' style={{display: 'flex' ,alignItems: 'center', width: 'auto', paddingRight: '35px'}}>s.d</td>
                                      <td className='input' style={{display: 'flex' ,alignItems: 'center', width: 'auto', paddingRight: '35px'}}>{detail.cuti_date_fin}</td>
                                    </tr>
                                    <tr>
                                        <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}> <img style={{width: '900px', height: 'auto', borderRadius: '10px'}} src={`http://localhost/Simantep_API/MAWASDIRI/Cuti/${detail.gambar}`} alt="" /> </td>
                                    </tr>
                                </div>
                            </table>
                        </div>
                    </div>
                </div>
            </div>        
        </>
    )
}
export default Cuti_Detail_Form