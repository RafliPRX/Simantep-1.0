import PropTypes from 'prop-types'

const Identity_Component = ({
    level,
    nama,
    nrk_nip,
    username,
    jabatan,
    nama_role,
    kode_role,
    nama_role_c,
    kode_role_c,
    nama_role_b,
    kode_role_b,
    nama_role_a,
    kode_role_a,
    akses_level,
    nama_role_sp,
    bagian_server,
    bagian_form,
    setBagian_form,
    updateStatus
}) => {
    return (
        <>
            {level === 'level-1' && 
              <>

                    <div className='gap-3 col-md-6 id-card'>
                        <h1 className='text-white text-center'>Data Identitas</h1>
                        <form className='container-xl d-flex flex-column gap-3'>
                          <div className='d-flex flex-column fs-5 text-yellow'>
                            <label htmlFor="nama">Nama: </label>
                            <input className='input-form fs-5' disabled value={nama} type="text" />
                          </div>
                          <div className='d-flex flex-column fs-5 text-yellow'>
                            <label htmlFor="nrk_nip">NRK/NIP:</label>
                            <input className='input-form fs-5' disabled value={nrk_nip} type="text" />
                          </div>
                          <div className='d-flex flex-column fs-5 text-yellow'>
                            <label htmlFor="username">Username:</label>
                            <input className='input-form fs-5' disabled value={username} type="text" name="" id="" />
                          </div>
                          <div className='d-flex flex-column fs-5 text-yellow'>
                            <label htmlFor="jabatan">Jabatan:</label>
                            <input className='input-form fs-5' disabled value={jabatan} type="text" />
                          </div>
                          <div className='d-flex flex-column fs-5 text-yellow'>
                            <label htmlFor="nama_role">Unit Kerja:</label>
                            <input className='input-form fs-5' disabled value={nama_role} type="text" />
                          </div>
                          <div className='d-none flex-column fs-5 text-yellow'>
                            <label htmlFor="kode_role">Kode Unit Kerja:</label>
                            <input className='input-form fs-5' disabled value={kode_role} type="text" />
                          </div>
                          <div className='d-none flex-column fs-5 text-yellow'>
                            <label htmlFor="kode_role">Akses Level:</label>
                            <input className='input-form fs-5' disabled value={akses_level} type="text" />
                          </div>
                          <div className='d-none flex-column fs-5 text-yellow'>
                            <label htmlFor="kode_role">Spesial Akses:</label>
                            <input className='input-form fs-5' disabled value={nama_role_sp} type="text" />
                          </div>
                          {bagian_server === '' && 
                            <div className='d-flex flex-column fs-5 text-yellow'>
                              <label htmlFor="bagian">Status Pegawai (Wajib diisi)</label>
                              <div className='row'>                              
                                <select name="" id="" value={bagian_form} onChange={(e) => setBagian_form(e.target.value)}>
                                  <option value="">Wajib diisi</option>
                                  <option value="1">PNS</option>
                                  <option value="2">PPPK Paruh Waktu</option>
                                  <option value="3">PPPK Penuh Waktu</option>
                                  <option value="4">Alih Daya</option>
                                </select>
                                <button className='bagian-button' onClick={(event) => updateStatus(event)}>Perbarui</button>
                              </div>                            
                            </div>
                          }
                          {bagian_server !== '' &&
                            <div className='d-flex flex-column fs-5 text-yellow'>
                              <label htmlFor="kode_role">Status Pegawai: </label>
                              {bagian_server === '1' && <input className='input-form fs-5' disabled value="PNS" type="text" />}
                              {bagian_server === '2' && <input className='input-form fs-5' disabled value="PPPK Paruh Waktu" type="text" />}
                              {bagian_server === '3' && <input className='input-form fs-5' disabled value="PPPK Penuh Waktu" type="text" />}
                              {bagian_server === '4' && <input className='input-form fs-5' disabled value="Alih Daya" type="text" />}
                            </div>
                          }
                          {/* <label htmlFor="">Upload foto Profile</label>
                          <div className='u-profile'>
                              <input onChange={handleChangeProfile} className='file' type="file" name="" id="" />
                              <button onClick={uploadProfile}>Upload Gambar</button>
                          </div> */}
                        </form>
                    </div>
                    <div className='d-flex flex-column align-items-center col-md-6 text-white'>
                      <div className='d-flex flex-column align-items-center gap-4'> 
                        <h2>Identitas Pegawai</h2>
                        <div className='profile-picture'></div>
                        <div className='d-flex flex-column align-items-center text-nowrap'>                                
                            <div className='d-flex flex-row'>
                              <p>Nama: <span className='fw-bold'>{nama}</span></p>
                            </div>
                            <div className='d-flex flex-row'>                                  
                              <p>NIP/NRK: <span className='fw-bold'>{nrk_nip}</span></p>
                            </div>
                            <div className='d-flex flex-row'>
                              <p>Jabatan: <span className='fw-bold'>{jabatan}</span></p>
                            </div>
                            {bagian_server === '' && 
                              <div className='bagian-android fs-5 text-yellow'>
                                <label htmlFor="bagian">Status Pegawai (Wajib diisi)</label>
                                <div className='row'>                              
                                  <select name="" id="" value={bagian_form} onChange={(e) => setBagian_form(e.target.value)}>
                                    <option value="">Wajib diisi</option>
                                    <option value="1">PNS</option>
                                    <option value="2">PPPK Paruh Waktu</option>
                                    <option value="3">PPPK Penuh Waktu</option>
                                    <option value="4">Alih Daya</option>
                                  </select>
                                  <button className='bagian-button' onClick={(event) => updateStatus(event)}>Perbarui</button>
                                </div>                            
                              </div>
                            }
                            {bagian_server !== '' &&
                              <div className='d-flex flex-row'>
                                {bagian_server === '1' && <p>Status Pegawai: <span className='fw-bold'>PNS</span></p>}
                                {bagian_server === '2' && <p>Status Pegawai: <span className='fw-bold'>PPPK Paruh Waktu</span></p>}
                                {bagian_server === '3' && <p>Status Pegawai: <span className='fw-bold'>PPPK Penuh Waktu</span></p>}
                                {bagian_server === '4' && <p>Status Pegawai: <span className='fw-bold'>Alih Daya</span></p>}
                              </div>
                          }
                        </div>
                      </div>  
                    </div>
              </>
            }
            {level === 'level-2' && 
              <>                
                    <div className='gap-3 col-md-6 id-card'>
                        <h1 className='text-white text-center'>Data Identitas</h1>
                        <form className='container-xxl d-flex flex-column gap-3'>
                          <div className='d-flex flex-column fs-5 text-yellow'>
                            <label htmlFor="nama">Nama: </label>
                            <input className='input-form fs-5' disabled value={nama} type="text" />
                          </div>
                          <div className='d-flex flex-column fs-5 text-yellow'>
                            <label htmlFor="nrk_nip">NRK/NIP:</label>
                            <input className='input-form fs-5' disabled value={nrk_nip} type="text" />
                          </div>
                          <div className='d-flex flex-column fs-5 text-yellow'>
                            <label htmlFor="username">Username:</label>
                            <input className='input-form fs-5' disabled value={username} type="text" name="" id="" />
                          </div>
                          <div className='d-flex flex-column fs-5 text-yellow'>
                            <label htmlFor="jabatan">Jabatan:</label>
                            <input className='input-form fs-5' disabled value={jabatan} type="text" />
                          </div>
                          <div className='d-flex flex-column fs-5 text-yellow'>
                            <label htmlFor="nama_role">Unit Kerja:</label>
                            <input className='input-form fs-5' disabled value={nama_role_c} type="text" />
                          </div>
                          <div className='d-none flex-column fs-5 text-yellow'>
                            <label htmlFor="kode_role">Kode Unit Kerja:</label>
                            <input className='input-form fs-5' disabled value={kode_role_c} type="text" />
                          </div>
                          <div className='d-none flex-column fs-5 text-yellow'>
                            <label htmlFor="kode_role">Akses Level:</label>
                            <input className='input-form fs-5' disabled value={akses_level} type="text" />
                          </div>
                          {bagian_server === '' && 
                            <div className='d-flex flex-column fs-5 text-yellow'>
                              <label htmlFor="bagian">Status Pegawai (Wajib diisi)</label>
                              <div className='row'>                              
                                <select name="" id="" value={bagian_form} onChange={(e) => setBagian_form(e.target.value)}>
                                  <option value="">Wajib diisi</option>
                                  <option value="1">PNS</option>
                                  <option value="2">PPPK Paruh Waktu</option>
                                  <option value="3">PPPK Penuh Waktu</option>
                                  <option value="4">Alih Daya</option>
                                </select>
                                <button className='bagian-button' onClick={(event) => updateStatus(event)}>Perbarui</button>
                              </div>                            
                            </div>
                          }
                          {bagian_server !== '' &&
                            <div className='d-flex flex-column fs-5 text-yellow'>
                              <label htmlFor="kode_role">Status Pegawai: </label>
                              {bagian_server === '1' && <input className='input-form fs-5' disabled value="PNS" type="text" />}
                              {bagian_server === '2' && <input className='input-form fs-5' disabled value="PPPK Paruh Waktu" type="text" />}
                              {bagian_server === '3' && <input className='input-form fs-5' disabled value="PPPK Penuh Waktu" type="text" />}
                              {bagian_server === '4' && <input className='input-form fs-5' disabled value="Alih Daya" type="text" />}
                            </div>
                          }
                          {/* <label htmlFor="">Upload foto Profile</label>
                          <div className='u-profile'>
                              <input onChange={handleChangeProfile} className='file' type="file" name="" id="" />
                              <button onClick={uploadProfile}>Upload Gambar</button>
                          </div> */}
                        </form>
                    </div>
                    <div className='d-flex flex-column align-items-center col-md-6 text-white'>
                      <div className='d-flex flex-column align-items-center gap-4'> 
                        <h2>Identitas Pegawai</h2>
                        <div className='profile-picture'></div>
                        <div className='d-flex flex-column align-items-center text-nowrap'>                                
                            <div className='d-flex flex-row'>
                              <p>Nama: <span className='fw-bold'>{nama}</span></p>
                            </div>
                            <div className='d-flex flex-row'>                                  
                              <p>NIP/NRK: <span className='fw-bold'>{nrk_nip}</span></p>
                            </div>
                            <div className='d-flex flex-row'>
                              <p>Jabatan: <span className='fw-bold'>{jabatan}</span></p>
                            </div>
                            {bagian_server === '' && 
                              <div className='bagian-android fs-5 text-yellow'>
                                <label htmlFor="bagian">Status Pegawai (Wajib diisi)</label>
                                <div className='row'>                              
                                  <select name="" id="" value={bagian_form} onChange={(e) => setBagian_form(e.target.value)}>
                                    <option value="">Wajib diisi</option>
                                    <option value="1">PNS</option>
                                    <option value="2">PPPK Paruh Waktu</option>
                                    <option value="3">PPPK Penuh Waktu</option>
                                    <option value="4">Alih Daya</option>
                                  </select>
                                  <button className='bagian-button' onClick={(event) => updateStatus(event)}>Perbarui</button>
                                </div>                            
                              </div>
                            }
                            {bagian_server !== '' &&
                              <div className='d-flex flex-row'>
                                {bagian_server === '1' && <p>Status Pegawai: <span className='fw-bold'>PNS</span></p>}
                                {bagian_server === '2' && <p>Status Pegawai: <span className='fw-bold'>PPPK Paruh Waktu</span></p>}
                                {bagian_server === '3' && <p>Status Pegawai: <span className='fw-bold'>PPPK Penuh Waktu</span></p>}
                                {bagian_server === '4' && <p>Status Pegawai: <span className='fw-bold'>Alih Daya</span></p>}
                              </div>
                          }
                        </div>
                      </div>  
                    </div>
              </>
            }
            {level === 'level-3' && 
              <>                
                    <div className='gap-3 col-md-6 id-card'>
                        <h1 className='text-white text-center'>Data Identitas</h1>
                        <form className='container-xxl d-flex flex-column gap-3'>
                          <div className='d-flex flex-column fs-5 text-yellow'>
                            <label htmlFor="nama">Nama: </label>
                            <input className='input-form fs-5' disabled value={nama} type="text" />
                          </div>
                          <div className='d-flex flex-column fs-5 text-yellow'>
                            <label htmlFor="nrk_nip">NRK/NIP:</label>
                            <input className='input-form fs-5' disabled value={nrk_nip} type="text" />
                          </div>
                          <div className='d-flex flex-column fs-5 text-yellow'>
                            <label htmlFor="username">Username:</label>
                            <input className='input-form fs-5' disabled value={username} type="text" name="" id="" />
                          </div>
                          <div className='d-flex flex-column fs-5 text-yellow'>
                            <label htmlFor="jabatan">Jabatan:</label>
                            <input className='input-form fs-5' disabled value={jabatan} type="text" />
                          </div>
                          <div className='d-flex flex-column fs-5 text-yellow'>
                            <label htmlFor="nama_role">Unit Kerja:</label>
                            <input className='input-form fs-5' disabled value={nama_role_b} type="text" />
                          </div>
                          <div className='d-none flex-column fs-5 text-yellow'>
                            <label htmlFor="kode_role">Kode Unit Kerja:</label>
                            <input className='input-form fs-5' disabled value={kode_role_b} type="text" />
                          </div>
                          <div className='d-none flex-column fs-5 text-yellow'>
                            <label htmlFor="kode_role">Akses Level:</label>
                            <input className='input-form fs-5' disabled value={akses_level} type="text" />
                          </div>
                          {bagian_server === '' && 
                            <div className='d-flex flex-column fs-5 text-yellow'>
                              <label htmlFor="bagian">Status Pegawai (Wajib diisi)</label>
                              <div className='row'>                              
                                <select name="" id="" value={bagian_form} onChange={(e) => setBagian_form(e.target.value)}>
                                  <option value="">Wajib diisi</option>
                                  <option value="1">PNS</option>
                                  <option value="2">PPPK Paruh Waktu</option>
                                  <option value="3">PPPK Penuh Waktu</option>
                                  <option value="4">Alih Daya</option>
                                </select>
                                <button className='bagian-button' onClick={(event) => updateStatus(event)}>Perbarui</button>
                              </div>                            
                            </div>
                          }
                          {bagian_server !== '' &&
                            <div className='d-flex flex-column fs-5 text-yellow'>
                              <label htmlFor="kode_role">Status Pegawai: </label>
                              {bagian_server === '1' && <input className='input-form fs-5' disabled value="PNS" type="text" />}
                              {bagian_server === '2' && <input className='input-form fs-5' disabled value="PPPK Paruh Waktu" type="text" />}
                              {bagian_server === '3' && <input className='input-form fs-5' disabled value="PPPK Penuh Waktu" type="text" />}
                              {bagian_server === '4' && <input className='input-form fs-5' disabled value="Alih Daya" type="text" />}
                            </div>
                          }
                          {/* <label htmlFor="">Upload foto Profile</label>
                          <div className='u-profile'>
                              <input onChange={handleChangeProfile} className='file' type="file" name="" id="" />
                              <button onClick={uploadProfile}>Upload Gambar</button>
                          </div> */}
                        </form>
                    </div>
                    <div className='d-flex flex-column align-items-center col-md-6 text-white'>
                      <div className='d-flex flex-column align-items-center gap-4'> 
                        <h2>Identitas Pegawai</h2>
                        <div className='profile-picture'></div>
                        <div className='d-flex flex-column align-items-center text-nowrap'>                                
                            <div className='d-flex flex-row'>
                              <p>Nama: <span className='fw-bold'>{nama}</span></p>
                            </div>
                            <div className='d-flex flex-row'>                                  
                              <p>NIP/NRK: <span className='fw-bold'>{nrk_nip}</span></p>
                            </div>
                            <div className='d-flex flex-row'>
                              <p>Jabatan: <span className='fw-bold'>{jabatan}</span></p>
                            </div>
                            {bagian_server === '' && 
                              <div className='bagian-android fs-5 text-yellow'>
                                <label htmlFor="bagian">Status Pegawai (Wajib diisi)</label>
                                <div className='row'>                              
                                  <select name="" id="" value={bagian_form} onChange={(e) => setBagian_form(e.target.value)}>
                                    <option value="">Wajib diisi</option>
                                    <option value="1">PNS</option>
                                    <option value="2">PPPK Paruh Waktu</option>
                                    <option value="3">PPPK Penuh Waktu</option>
                                    <option value="4">Alih Daya</option>
                                  </select>
                                  <button className='bagian-button' onClick={(event) => updateStatus(event)}>Perbarui</button>
                                </div>                            
                              </div>
                            }
                            {bagian_server !== '' &&
                              <div className='d-flex flex-row'>
                                {bagian_server === '1' && <p>Status Pegawai: <span className='fw-bold'>PNS</span></p>}
                                {bagian_server === '2' && <p>Status Pegawai: <span className='fw-bold'>PPPK Paruh Waktu</span></p>}
                                {bagian_server === '3' && <p>Status Pegawai: <span className='fw-bold'>PPPK Penuh Waktu</span></p>}
                                {bagian_server === '4' && <p>Status Pegawai: <span className='fw-bold'>Alih Daya</span></p>}
                              </div>
                          }
                        </div>
                      </div>  
                    </div>
              </>
            }
            {level === 'level-4' && 
              <>                
                    <div className='gap-3 col-md-6 id-card'>
                        <h1 className='text-white text-center'>Data Identitas</h1>
                        <form className='container-xxl d-flex flex-column gap-3'>
                          <div className='d-flex flex-column fs-5 text-yellow'>
                            <label htmlFor="nama">Nama: </label>
                            <input className='input-form fs-5' disabled value={nama} type="text" />
                          </div>
                          <div className='d-flex flex-column fs-5 text-yellow'>
                            <label htmlFor="nrk_nip">NRK/NIP:</label>
                            <input className='input-form fs-5' disabled value={nrk_nip} type="text" />
                          </div>
                          <div className='d-flex flex-column fs-5 text-yellow'>
                            <label htmlFor="username">Username:</label>
                            <input className='input-form fs-5' disabled value={username} type="text" name="" id="" />
                          </div>
                          <div className='d-flex flex-column fs-5 text-yellow'>
                            <label htmlFor="jabatan">Jabatan:</label>
                            <input className='input-form fs-5' disabled value={jabatan} type="text" />
                          </div>
                          <div className='d-flex flex-column fs-5 text-yellow'>
                            <label htmlFor="nama_role">Unit Kerja:</label>
                            <input className='input-form fs-5' disabled value={nama_role_a} type="text" />
                          </div>
                          <div className='d-none flex-column fs-5 text-yellow'>
                            <label htmlFor="kode_role">Kode Unit Kerja:</label>
                            <input className='input-form fs-5' disabled value={kode_role_a} type="text" />
                          </div>
                          <div className='d-none flex-column fs-5 text-yellow'>
                            <label htmlFor="kode_role">Akses Level:</label>
                            <input className='input-form fs-5' disabled value={akses_level} type="text" />
                          </div>
                          {bagian_server === '' && 
                            <div className='d-flex flex-column fs-5 text-yellow'>
                              <label htmlFor="bagian">Status Pegawai (Wajib diisi)</label>
                              <div className='row'>                              
                                <select name="" id="" value={bagian_form} onChange={(e) => setBagian_form(e.target.value)}>
                                  <option value="">Wajib diisi</option>
                                  <option value="1">PNS</option>
                                  <option value="2">PPPK Paruh Waktu</option>
                                  <option value="3">PPPK Penuh Waktu</option>
                                  <option value="4">Alih Daya</option>
                                </select>
                                <button className='bagian-button' onClick={(event) => updateStatus(event)}>Perbarui</button>
                              </div>                            
                            </div>
                          }
                          {bagian_server !== '' &&
                            <div className='d-flex flex-column fs-5 text-yellow'>
                              <label htmlFor="kode_role">Status Pegawai: </label>
                              {bagian_server === '1' && <input className='input-form fs-5' disabled value="PNS" type="text" />}
                              {bagian_server === '2' && <input className='input-form fs-5' disabled value="PPPK Paruh Waktu" type="text" />}
                              {bagian_server === '3' && <input className='input-form fs-5' disabled value="PPPK Penuh Waktu" type="text" />}
                              {bagian_server === '4' && <input className='input-form fs-5' disabled value="Alih Daya" type="text" />}
                            </div>
                          }
                          {/* <label htmlFor="">Upload foto Profile</label>
                          <div className='u-profile'>
                              <input onChange={handleChangeProfile} className='file' type="file" name="" id="" />
                              <button onClick={uploadProfile}>Upload Gambar</button>
                          </div> */}
                        </form>
                    </div>
                    <div className='d-flex flex-column align-items-center col-md-6 text-white'>
                      <div className='d-flex flex-column align-items-center gap-4'> 
                        <h2>Identitas Pegawai</h2>
                        <div className='profile-picture'></div>
                        <div className='d-flex flex-column align-items-center text-nowrap'>                                
                            <div className='d-flex flex-row'>
                              <p>Nama: <span className='fw-bold'>{nama}</span></p>
                            </div>
                            <div className='d-flex flex-row'>                                  
                              <p>NIP/NRK: <span className='fw-bold'>{nrk_nip}</span></p>
                            </div>
                            <div className='d-flex flex-row'>
                              <p>Jabatan: <span className='fw-bold'>{jabatan}</span></p>
                            </div>
                            {bagian_server === '' && 
                              <div className='bagian-android fs-5 text-yellow'>
                                <label htmlFor="bagian">Status Pegawai (Wajib diisi)</label>
                                <div className='row'>                              
                                  <select name="" id="" value={bagian_form} onChange={(e) => setBagian_form(e.target.value)}>
                                    <option value="">Wajib diisi</option>
                                    <option value="1">PNS</option>
                                    <option value="2">PPPK Paruh Waktu</option>
                                    <option value="3">PPPK Penuh Waktu</option>
                                    <option value="4">Alih Daya</option>
                                  </select>
                                  <button className='bagian-button' onClick={(event) => updateStatus(event)}>Perbarui</button>
                                </div>                            
                              </div>
                            }
                            {bagian_server !== '' &&
                              <div className='d-flex flex-row'>
                                {bagian_server === '1' && <p>Status Pegawai: <span className='fw-bold'>PNS</span></p>}
                                {bagian_server === '2' && <p>Status Pegawai: <span className='fw-bold'>PPPK Paruh Waktu</span></p>}
                                {bagian_server === '3' && <p>Status Pegawai: <span className='fw-bold'>PPPK Penuh Waktu</span></p>}
                                {bagian_server === '4' && <p>Status Pegawai: <span className='fw-bold'>Alih Daya</span></p>}
                              </div>
                          }
                        </div>
                      </div>  
                    </div>
              </>
            }
            {bagian_server === ''  &&
              <div className='Menu-Info'>
                <div className='title'>
                  <h1 className='Warning'>PERINGATAN!!!!</h1>
                  <h2 className='info'>Harap isi Data Diri diatas untuk Membuka akses Menu</h2>
                </div>
              </div>
            }
        </>
    );
}

Identity_Component.propTypes = {
    level: PropTypes.string.isRequired,
    nama: PropTypes.string.isRequired,
    nrk_nip: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    jabatan: PropTypes.string.isRequired,
    bagian: PropTypes.string.isRequired,
    akses_level: PropTypes.string.isRequired,
    nama_role: PropTypes.string.isRequired,
    kode_role: PropTypes.string.isRequired,
    nama_role_c: PropTypes.string.isRequired,
    kode_role_c: PropTypes.string.isRequired,
    nama_role_b: PropTypes.string.isRequired,
    kode_role_b: PropTypes.string.isRequired,
    nama_role_a: PropTypes.string.isRequired,
    kode_role_a: PropTypes.string.isRequired,
    nama_role_sp: PropTypes.string.isRequired,
    bagian_server: PropTypes.string.isRequired,
    bagian_form: PropTypes.string.isRequired,
    setBagian_form: PropTypes.func.isRequired,
    updateStatus: PropTypes.func.isRequired
};


export default Identity_Component;