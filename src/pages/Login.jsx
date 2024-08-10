import React, { useContext, useRef } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
import { toast } from 'react-toastify';
const Login = () => {
  const ctx = useContext(UserContext)
  // console.log(ctx)
  let emailRef = useRef()
  let passwordRef = useRef()
  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    let obj ={
      email:emailRef.current.value,
      password:passwordRef.current.value
    }
    let res = await axios.post('http://localhost:8080/user/login',obj)
    let data = res.data;
    // console.log(data)
    if(data.success){
      localStorage.setItem('user_details',JSON.stringify({
        login:true,
        user:data.user,
      }))
      ctx.setuser({login:true,user:data.user})
      if(data.user.isAdmin){
        navigate('/admin')
        toast.success(data.msg,{position:'top-center'})
      }else{

        navigate('/landingpage')
        toast.success(data.msg,{position:'top-center'})
      }
      // navigate('/landingpage')
    }
    else{
      toast.error(data.msg,{position:'top-center'})
      // alert(data.msg)
    }
  }
  return (
    <div>
<form className='col-md-6 p-4 m-auto mt-5 border border-dark'>
  <h3 className='text-center'>Login page</h3>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input ref={emailRef} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input ref={passwordRef} type="password" className="form-control" id="exampleInputPassword1" />
  </div>

  <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
  <p className='text-center'>Don't have an account? <Link to={'/signup'}>Register</Link></p>
</form>

    </div>
  )
}

export default Login
