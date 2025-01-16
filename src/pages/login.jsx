import './login.css'
const Login = () => {
    return(
        <>
        <div className='login'>
            <div className='col'>
                <div className='form-col'>
                    <form action="/Home">
                        <div className='header'>
                            <h1>Sign in</h1>
                            <h3>Enter Your Email and Password to Sign In</h3>
                        </div>
                        <div className='input-col'>
                            <label>Email</label>
                            <input type="text" />
                            <label>Password</label>
                            <input type="password" />
                            <div className='forget'>
                                <div className='checkbox'>
                                    <input type="checkbox" name="checkbox" id="" />
                                    <label htmlFor="">Keep me logged in</label>
                                </div>
                                <a href="">Forget Password ?</a>    
                            </div>
                            <button>Sign In</button>
                            <div className='register'>
                                <p>Not registered yet?</p>
                                <a href="">Create an Account</a>
                            </div>
                        </div> 
                    </form>
                </div>
                <div className='logo'>
                    <div className='logo-col'>
                    <div className='logo-bg'>
                        <div className='logo'></div>
                    </div>
                        <div className='mask'>
                            <div className='pic'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Login