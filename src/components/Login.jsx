import { signInWithEmailAndPassword,sendPasswordResetEmail } from "firebase/auth";
import auth from "../firebase.config";
import { useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {

    const [data,setData] =useState({email:'',password:''});
    const [loginErr,setRegErr] =useState('')
    const [success,setSuccess] =useState('')

    const handleLoginChange =e =>{
        const {name,value} =e.target
        setData({
            ...data,
            [name]:value
        })
    }

    const handleLogin = e =>{
        e.preventDefault()

        
        const password = data.password
        const email = data.email

        setData({email:'',password:''})
        setRegErr('');
        setSuccess('')

        if (password.length<6) {
            setRegErr('Password Should be 6 Character or Longer')
            return;
       }else if(!/[A-Z]/.test(password)){
            setRegErr('Password contain atleast on Uppercase')
            return;
       }

       signInWithEmailAndPassword(auth,email,password)
       .then(res=>{
            console.log(res.user)
            if (res.user.emailVerified) {
                setSuccess(`Login Succesfully `)
            }else{
                alert('Please veryfy your email')
            }
           
       }).catch((error) => {
            setRegErr(error.message)
       })
    }

    const handleResetPassword=()=>{
        const email = data.email;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!email) {
            console.log('email adress is not found')
            return;
        }else if (!emailRegex.test(email)) {
            console.log('Give a valid email')
            return;
        }
        sendPasswordResetEmail(auth,email)
        .then(res=>{
            console.log('please check your email')
        }).catch(err=>{
            console.log(err.message)
        })
    }
  return (
    <div className="hero min-h-screen bg-base-200">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      </div>
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleLogin} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" name="email" value={data.email} onChange={handleLoginChange} placeholder="email" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" name="password" value={data.password} onChange={handleLoginChange} placeholder="password" className="input input-bordered" required />
            <label className="label">
              <a onClick={handleResetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          {
            loginErr && <p className="text-red-700 mb-3">{loginErr}</p>
        }
        {
            success && <p className="text-green-700 mb-3">{success}</p>
        }
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
          <div className="">
            <p>New to this website please <Link className="underline text-sky-700" to='/register'>Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Login
