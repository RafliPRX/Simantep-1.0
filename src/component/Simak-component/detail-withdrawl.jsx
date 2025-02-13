import { useEffect, useState } from 'react';
import './form.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Detail_Withdraw = () => {
    const param = useParams();
    // const [show, setShow] = useState(false); // Changed to boolean for clarity

    // function handleShow(event) {
    //     setShow(event.target.checked); // Set show based on checkbox state
    // }
    // const [show1, setShow1] = useState(false); // Changed to boolean for clarity

    // function handleShow1(event) {
    //     setShow1(event.target.checked); // Set show based on checkbox state
    // }

    // const [show2, setShow2] = useState(false); // Changed to boolean for clarity

    // function handleShow2(event) {
    //     setShow2(event.target.checked); // Set show based on checkbox state
    // }

    const [detail, setDetail] = useState([]);
    const getDetail = async () => {
        try {
            const response = await axios.get(`http://localhost/Simantep_API/SIMAK/Dana_RPD/detail_dana.php?id=${param.id}`, {
                headers: {}
            });
            setDetail(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    return (
        <>
            <div className='main-dashboard'>
                <p>Simak/Form Penarikan Dana</p>
                <h1>Form Pengajuan Proposal & LPJ</h1>
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
                        <form action="">
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
                                      <td className='input'>{detail.NRK}</td>
                                    </tr>
                                    <tr>
                                      <td>Jabatan</td>
                                    </tr>
                                    <tr>
                                      <td className='input'>{detail.jabatan_pj}</td>
                                    </tr>
                                    <tr>
                                      <td>Nama Kegiatan</td>
                                    </tr>
                                    <tr>
                                      <td className='input'>{detail.nama_kegiatan}</td>
                                    </tr>
                                    <tr>
                                      <td>Rencana Pelaksana</td>
                                    </tr>
                                    <tr>
                                      <td className='input'>{detail.rencana_pelaksana}</td>
                                    </tr>
                                    <tr>
                                      <td>Jabatan</td>
                                    </tr>
                                    <tr>
                                      <td className='input'>{detail.jabatan_pj}</td>
                                    </tr>
                                    <tr>
                                      <td>Jabatan</td>
                                    </tr>
                                    <tr>
                                      <td className='input'>{detail.units}</td>
                                    </tr>
                                    <div style={{display: detail.units === 'Sosial' ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Kebutuhan Akun 521211</td>
                                        </tr>
                                        <tr>
                                          <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>{detail.acc_521211}</td>
                                        </tr>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Kebutuhan 522141</td>
                                        </tr>
                                        <tr style={{}}>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', paddingLeft: '20px'}}>- Sewa Tempat</td>  
                                          <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', marginLeft: '50px'}}>{detail.acc_522141_tempat}</td>
                                        </tr>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', paddingLeft: '20px'}}>- Sewa Kendaraan</td>  
                                          <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', marginLeft: '50px'}}>{detail.acc_522141_kendaraan}</td>
                                        </tr>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Kebutuhan Akun 522151</td>
                                        </tr>
                                        <tr>
                                          <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>{detail.acc_522151}</td>
                                        </tr>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Kebutuhan Akun 524113</td>
                                        </tr>
                                        <tr>
                                          <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>{detail.acc_524113}</td>
                                        </tr>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Kebutuhan Akun 524114</td>
                                        </tr>
                                        <tr>
                                          <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>{detail.acc_524114}</td>
                                        </tr>
                                    </div>
                                    <div style={{display: detail.units === 'Medis' ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Kebutuhan Akun 521211</td>
                                        </tr>
                                        <tr>
                                          <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>{detail.acc_521211}</td>
                                        </tr>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Kebutuhan Akun 522191</td>
                                        </tr>
                                        <tr>
                                          <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>{detail.acc_522191}</td>
                                        </tr>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Keterangan</td>
                                        </tr>
                                        <tr>
                                          <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>{detail.keterangan}</td>
                                        </tr>
                                    </div>
                                    <div style={{display: detail.units === 'Manajemen' ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Total Permintaan Dana</td>
                                        </tr>
                                        <tr>
                                          <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>{detail.total_dana_manajemen}</td>
                                        </tr>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Metode Pembayaran</td>
                                        </tr>
                                        <tr>
                                          <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>{detail.metode}</td>
                                        </tr>
                                    </div>
                                </table>
                            </div>
                            {/* <div className='content-f'>
                                <h1>Nama Kegiatan & Unit</h1>
                                <label htmlFor="">Nama Rencana Kegiatan dan Program</label>
                                <input placeholder={detail.nama_kegiatan} type="text"/>
                                <label htmlFor="">Rencana Pelaksanaan</label>
                                <input placeholder={detail.rencana_pelaksana} type="date"/>
                                <div className='check'>
                                    <input value="Sosial" type="checkbox" id="sosialCheckbox" onChange={(event) => {
                                        handleShow(event);
                                    }} />
                                    <label htmlFor="sosialCheckbox">Sosial</label>
                                    <label htmlFor="" style={{display: detail.units === 'Sosial' ? 'flex' : 'none'}}>Anda Sebelumnya Milih Sosial</label>
                                </div>
                                {show && ( // Conditionally render based on show state
                                    <div className='check-form'>
                                        <label htmlFor="">Kebutuhan Akun 521211</label>
                                        <input placeholder={detail.acc_521211} style={{marginTop: '10px'}} type="text" name="" id="" />
                                        <label htmlFor="">Kebutuhan Akun 522141</label><br /><br />
                                        <label style={{paddingLeft: '25px'}} htmlFor="">o</label>
                                        <label style={{width: '200px'}} htmlFor="">Sewa Tempat</label><br /><br />                  
                                        <input placeholder={detail.acc_522141_tempat} type="text" name="" id="" />
                                        <label style={{paddingLeft: '25px'}} htmlFor="">o</label>
                                        <label style={{width: '200px'}} htmlFor="">Sewa Kendaraan</label><br /><br />                  
                                        <input placeholder={detail.acc_522141_tempat} type="text" name="" id="" />
                                        <label htmlFor="">Kebutuhan Akun 522151</label>
                                        <input placeholder={detail.acc_522151} style={{marginTop: '10px'}} type="text" name="" id="" />
                                        <label htmlFor="">Kebutuhan Akun 524113</label>
                                        <input placeholder={detail.acc_524113} style={{marginTop: '10px'}} type="text" name="" id="" />
                                        <label htmlFor="">Kebutuhan Akun 524114</label>
                                        <input placeholder={detail.acc_524114} style={{marginTop: '10px'}} type="text" name="" id="" />
                                    </div>
                                )}
                                <div className='check'>
                                    <input value="Medis" type="checkbox" id="sosialCheckbox" onChange={(event)=> {
                                        handleShow1(event);                                        
                                    }}/>
                                    <label htmlFor="sosialCheckbox">Medis</label>
                                    <label htmlFor="" style={{display: detail.units === 'Medis' ? 'flex' : 'none'}}>Anda Sebelumnya Milih Medis</label>
                                </div>
                                {show1 && ( // Conditionally render based on show state
                                    <div className='check-form'>
                                        <label htmlFor="">Kebutuhan Akun 521211</label>
                                        <input placeholder={detail.acc_521211} style={{marginTop: '10px'}} type="text" name="" id="" />
                                        <label htmlFor="">Kebutuhan Akun 522191</label>
                                        <input placeholder={detail.acc_522191} style={{marginTop: '10px'}} type="text" name="" id="" />
                                        <label htmlFor="">Keterangan</label>
                                        <input placeholder={detail.keterangan} style={{marginTop: '10px'}} type="text" name="" id="" />
                                    </div>
                                )}
                                <div className='check'>
                                    <input type="checkbox" value="Manajemen" id="sosialCheckbox" onChange={(event) =>{
                                        handleShow2(event)
                                        }} />
                                    <label htmlFor="sosialCheckbox">Manajemen</label>
                                    <label htmlFor="" style={{display: detail.units === 'Manajemen' ? 'flex' : 'none'}}>Anda Sebelumnya Milih Manajemen</label>
                                </div>
                                {show2 && ( // Conditionally render based on show state
                                    <div className='check-form'>
                                        <label htmlFor="">Total Permintaan Dana</label>
                                        <input placeholder={detail.total_dana} style={{marginTop: '10px'}} type="text" name="" id="" />
                                        <label htmlFor="">Metode Pembayaran</label>
                                        <input placeholder={detail.metode} style={{marginTop: '10px'}} type="text" name="" id="" />
                                    </div>
                                )}
                            </div>
                            <button className='submit' type="submit">Submit</button> */}
                        </form>
                    </div>
                </div>
            </div>        
        </>
    );
}

export default Detail_Withdraw
