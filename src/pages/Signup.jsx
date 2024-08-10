import React, { useRef } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
const Signup = () => {

  let emailRef = useRef()
  let nameRef = useRef()
  let passwordRef = useRef()
  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    let obj ={
      name:nameRef.current.value,
      email:emailRef.current.value,
      password:passwordRef.current.value
    }
    // console.log(obj)
    let res = await axios.post('http://localhost:8080/user/create',obj)
    let data = res.data;
    // console.log(data)
    if(data.success){
      navigate('/login')
      toast.success(data.msg,{position:'top-center'})
    }
    else{
      toast.error(data.msg,{position:'top-center'})
    }
  }
  return (
    <div>
<form className='m-auto p-5 col-md-6 mt-5 border border-dark'>
  <h3 className='text-center'>Signup page</h3>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
    <input ref={nameRef} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input ref={emailRef} type="email" className="form-control" id="name" aria-describedby="emailHelp" />

  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input ref={passwordRef} type="password" className="form-control" id="exampleInputPassword1" />
  </div>

  <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
  <p className='text-center mt-2'>Already have an account? <Link to={'/login'}>Login</Link></p>
</form>

    </div>
  )
}

export default Signup
