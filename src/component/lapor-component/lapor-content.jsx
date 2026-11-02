import Profile from "../profile";
import '../css/content.css';
const Lapor_Content = () => {
    // const [isLoading, setIsLoading] = useState(false);
    return (
        <>
            <div className='container-fluid d-flex flex-column p-5 m-2 overflow-auto'>
                <p className='content-header-p'>Lapor/Daftar Laporan</p>
                    <div className='d-flex flex-row align-items-center justify-content-between gap-5'>
                        <h1 className='content-header-title mt-0'>Sistem Penerima Lapor</h1>
                        <Profile />
                    </div>
                    <div className='container-xxl content-display bg-green-old align-items-start' style={{borderRadius: "20px"}}>
                        <div className='container-xxl d-flex flex-column gap-4'>
                            <div>
                                <h1 className='content-title fw-bold mt-0'>Progress Pengajuan Surat</h1>
                                <div className='header-content'>
                                    <div className='d-flex flex-row gap-2'>
                                        {/* <button className='left' onClick={handlePrev_Surat}><img src={left} alt="" /></button> */}
                                        {/* <input className='page-number' type="text" value={pagination_surat.currentPage} /> */}
                                        {/* <button className='right' onClick={handleNext_Surat}><img src={right} alt="" /></button> */}
                                    </div>                                        
                                    <div className='gap-2 header-search-content'>
                                        <div className='header-month'>
                                            <label className='text-month-search' htmlFor="">Bulan:</label>
                                            {/* <select className='w-100 h-100 rounded-3 fs-6 lh-lg' onChange={handleChangeSearchMonth} value={searchMonth} name="" id="">
                                                <option value="01">Januari</option>
                                                <option value="02">Februari</option>
                                                <option value="03">Maret</option>
                                                <option value="04">April</option>
                                                <option value="05">Mei</option>
                                                <option value="06">Juni</option>
                                                <option value="07">Juli</option>
                                                <option value="08">Agustus</option>
                                                <option value="09">September</option>
                                                <option value="10">Oktober</option>
                                                <option value="11">November</option>
                                                <option value="12">Desember</option>
                                            </select> */}
                                        </div>
                                        <div className='header-year'>
                                            <label className='text-year-search' htmlFor="">Tahun:</label>
                                            {/* <select className='w-100 h-100 rounded-3 fs-6' value={currentYear} name="" id="">
                                                <option value="2025">2025</option>
                                                <option value="2026">2026</option>
                                            </select> */}
                                        </div>
                                    </div>
                                </div>
                                {/* {surat.length > 0 ? (
                                    <div className='mt-3 container-xxl d-flex flex-column gap-4'>
                                        <table className='table-spaced' border="1">
                                            <tr>
                                                <th style={{ textAlign: 'center' }}>Nomor</th>
                                                <th style={{ textAlign: 'center' }}>id Surat</th>
                                                <th style={{ textAlign: 'center' }}>Nama</th>
                                                <th style={{ textAlign: 'center' }}>Keterangan</th>
                                                <th style={{ textAlign: 'center' }}>Jabatan</th>
                                                <th style={{ textAlign: 'center' }}>Jenis Surat</th>
                                                <th style={{ textAlign: 'center' }}>Kasubbag Tata Usaha</th>
                                                <th style={{ textAlign: 'center' }}>Kepala Balai</th>
                                                <th style={{ textAlign: 'center' }}>Opsi Lain</th>
                                            </tr>
                                            {surat.map((item, index) => (
                                                <tr key={item.id_surat}>
                                                    <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.id_surat}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.nama}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.Keterangan}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.jabatan}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.jenis_surat}</td>
                                                    <td style={{ textAlign: 'center', display: item.veri_1 === '1' ? '' : 'none' }}><img src={white} alt="" />Belum di Baca</td>
                                                    <td style={{ textAlign: 'center', display: item.veri_1 === '2' ? '' : 'none' }}><img src={red} alt="" />Tunda</td>
                                                    <td style={{ textAlign: 'center', display: item.veri_1 === '3' ? '' : 'none' }}><img src={green} alt="" />Setuju</td>
                                                    <td style={{ textAlign: 'center', display: item.veri_2 === '1' ? '' : 'none' }}><img src={white} alt="" />Belum di Baca</td>
                                                    <td style={{ textAlign: 'center', display: item.veri_2 === '2' ? '' : 'none' }}><img src={red} alt="" />Tunda</td>
                                                    <td style={{ textAlign: 'center', display: item.veri_2 === '3' ? '' : 'none' }}><img src={green} alt="" />Setuju</td>
                                                    <td className='d-flex flex-column gap-2' style={{ textAlign: 'center' }}> <button onClick={(e) => handleOpenSurat(item.id_surat, item.stat, item.id_notif, e )} className='B-update'>Ubah</button><button onClick={() => confirmDeleteSurat(item.id_surat)} className='B-deleted'>Hapus</button></td>  
                                                </tr>
                                            ))} 
                                        </table>
                                    </div>    
                                ) : (
                                        <p className='no-data-p mt-5 text-center'>tidak ada data</p>
                                )} */}
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default Lapor_Content;