import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext';
import { toast } from 'react-toastify';

const Landingpage = () => {
  const ctx = useContext(UserContext)
  let userId = ctx.user.user._id


  const [allExams, setallExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  console.log(selectedExam)
  const getAllExams = async () => {
    let res = await axios.get('http://localhost:8080/exam/getallexam');
    let data = res.data;
    // console.log(data.exam)
    setallExams(data.exam)
  }
  useEffect(() => {
    getAllExams();
  }, [])


  let navigate = useNavigate()

  const handleContinue = async () => {
    if (selectedExam) {
      console.log("yes")

      let res = await axios.post(`https://exam-app-backend-alyd.onrender.com/attempted/create/${userId}/${selectedExam._id}`)
      console.log(res)

      if(res.data.success){
        navigate('/studentExam', { state: selectedExam })
      }else{
        toast.warning(res.data.msg,{position:'top-center'})
      }
    } else {
      // alert('Please select a exam')
      toast.info("Please select a exam", { position: 'top-center' })
    }
  }
  return (
    <div>
      <h4 className='text-center mt-3'>Select a exam</h4>
      <form className='d-flex flex-column col-md-4 m-auto p-3 gap-2'>
        {allExams.map((ele) => {
          return <><input name='radio' type='radio'/><label className='' key={ele._id} onClick={() => setSelectedExam(ele)}> {ele.examName}</label></> 
        })}
      </form>

      <div className='d-flex flex-column w-25 gap-2 m-auto'>
        <button onClick={handleContinue} to="/studentExam" className='btn btn-success'>Continue</button>
        <h6 className='text-center'>OR</h6>
        <a href={"/dashboard/student"} className="btn btn-info mt-2">Dashboard</a>
      </div>
    </div>
  )
}

export default Landingpage
