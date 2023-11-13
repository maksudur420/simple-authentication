import { useState } from "react"
import auth from "../firebase.config"
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { AiOutlineEyeInvisible,AiOutlineEye} from "react-icons/ai";

const Register = () => {

    const [data,setData] =useState({email:'',password:''});
    const [regErr,setRegErr] =useState('')
    const [success,setSuccess] =useState('')
    const [show,setShow] =useState(false)

    console.log(data)

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
        password:''
       }
       )
       setRegErr('');
       setSuccess('')

       const email = data.email
       const password = data.password
       if (password.length<6) {
            setRegErr('Password Should be 6 Character or Longer')
            return;
       }else if(!/[A-Z]/.test(password)){
            setRegErr('Password contain atleast on Uppercase')
            return;
       }
       createUserWithEmailAndPassword(auth,email,password)
       .then(res=>{
            console.log(res.user)
            setSuccess(`User Created Succesfully `)
       }).catch((error) => {
            setRegErr(error.message)
       })
    }
  return (
    <div className="w-4/5 mx-auto mt-12">
      <form onSubmit={handleSubmit}>
        <input className="w-3/4 mx-auto px-5 py-3 mb-4 border" type="email" placeholder="Email Address" name="email" value={data.email} id="email" onChange={handleChange} required />
        <input className="w-3/4 mx-auto px-5 py-3 mb-4 border" type={show?'text':'password'} placeholder="Password" value={data.password} name="password" id="password" onChange={handleChange} required/>
        <span className="ml-3" onClick={()=>setShow(!show)}>
            {
                show?<AiOutlineEye/> :<AiOutlineEyeInvisible/>
            }
        </span>
        {
            regErr && <p className="text-red-700 mb-3">{regErr}</p>
        }
        {
            success && <p className="text-green-700 mb-3">{success}</p>
        }
        <input className="w-3/4 mx-auto mb-4 border btn btn-primary" type="submit" name="submit" value='Register' id="submit" />
      </form>
    </div>
  )
}

export default Register
