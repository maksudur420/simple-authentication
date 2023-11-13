import { useState } from "react"
import auth from "../firebase.config"
import {createUserWithEmailAndPassword,sendEmailVerification,updateProfile} from 'firebase/auth'
import { AiOutlineEyeInvisible,AiOutlineEye} from "react-icons/ai";
import { Link } from "react-router-dom";

const Register = () => {

    const [data,setData] =useState({email:'',password:'',name:''});
    const [regErr,setRegErr] =useState('')
    const [success,setSuccess] =useState('')
    const [showPass,setShowPass] =useState(false)

   

    const handleChange =(e)=>{
        const {name,value} =e.target

        setData({
            ...data,
            [name]:value
            } 
        )
    }
    const handleSubmit = e =>{
        e.preventDefault()
       setData({
        email:'',
        password:'',
        name:''
       }
       )
       setRegErr('');
       setSuccess('')
       const name = data.name
       const email = data.email
       const password = data.password
       const accepted =e.target.terms.checked
       if (password.length<6) {
            setRegErr('Password Should be 6 Character or Longer')
            return;
       }else if(!/[A-Z]/.test(password)){
            setRegErr('Password contain atleast on Uppercase')
            return;
       }else if (!accepted) {
            setRegErr('Please checked our trems and condition')
            return;
       }
       createUserWithEmailAndPassword(auth,email,password)
       .then(res=>{
            console.log(res.user)
            
            // Profile updated!
            updateProfile(res.user, {
                displayName:name, photoURL: "https://example.com/jane-q-user/profile.jpg"
              }).then(() => {
                setSuccess(`User Created Succesfully `)
                
              }).catch((error) => {
                console.log(error.message)
              })
            // Email verification sent!
            sendEmailVerification(res.user)
            .then(() => {
                alert('Please veryfy your email')
            })
       }).catch((error) => {
            setRegErr(error.message)
       })
    }
  return (
    <div className="w-4/5 mx-auto mt-12">
      <form onSubmit={handleSubmit}>
        <input className="w-3/4 mx-auto px-5 py-3 mb-4 border" type="text" placeholder="Your Name" name="name" value={data.name} id="email" onChange={handleChange} required />
        <input className="w-3/4 mx-auto px-5 py-3 mb-4 border" type="email" placeholder="Email Address" name="email" value={data.email} id="email" onChange={handleChange} required />
        <div className="relative">
            <input className="w-3/4 mx-auto px-5 py-3 mb-4 border" type={showPass?'text':'password'} placeholder="Password" value={data.password} name="password" id="password" onChange={handleChange} required/>
            <span className="absolute -ml-8 top-4" onClick={()=>setShowPass(!showPass)}>
                {
                    showPass?<AiOutlineEye/> :<AiOutlineEyeInvisible/>
                }
            </span>
        </div>
        <div className="mb-4">
            <input type="checkbox" name="terms" id="terms" />
            <label htmlFor="terms" className="ml-2">Please accept our <a className="underline text-sky-700" href="##">trems and conditions</a></label>
        </div>
        {
            regErr && <p className="text-red-700 mb-3">{regErr}</p>
        }
        {
            success && <p className="text-green-700 mb-3">{success}</p>
        }
        <input className="w-3/4 mx-auto mb-4 border btn btn-primary" type="submit" name="submit" value='Register' id="submit" />

        <div className="">
            <p>Already have an account please <Link className="underline text-sky-700" to='/login'>Login</Link></p>
        </div>
      </form>
    </div>
  )
}

export default Register
