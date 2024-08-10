import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { LikeOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import { Flex, Progress } from 'antd';
const StudenteDashBoard = () => {
    const [details, setdetails] = useState([]);
    const [selectedExam, setselectedExam] = useState([]);
    console.log(details)
    console.log(selectedExam)
    let user = JSON.parse(localStorage.getItem('user_details'))
  let userId = user.user._id
    let StudentAllExam = async()=>{
        let res = await axios.get(`https://exam-app-backend-alyd.onrender.com/attempted/getSingleUser/${userId}`);
        let data = res.data
        // console.log(data);
        setdetails(data);
    }
    useEffect(()=>{
        StudentAllExam()
    },[userId])

    const handleClick = (ans)=>{
        console.log(ans);
        setselectedExam(ans.attemptedQuestion);
    }

    let count =0;
    let correctCount=0
    let totalCount =0
    selectedExam?.forEach((ele)=>{
      if(ele.isCorrect){
        count++;
      }
      if(ele.isCorrect===true){
        correctCount++;
      }
      if(ele.isCorrect===false|| ele.isCorrect===true){
        totalCount++
      }
    })
    console.log(count);
    console.log(correctCount);
    console.log(totalCount);
   
  return (
    <div className='p-3'>
      <h3 className='text-center form-control'>Student Dashboard</h3>
      <Row className='col-12' >
    {details.map((ele)=>{
        return  <Col key={ele._id} style={{width:"120px"}}  onClick={()=>handleClick(ele)} className='col-sm-3'>
        <Card title={ele.exam.batch} bordered={true} className='border border-dark'>
          {ele.exam.examName}
        </Card>
      </Col>
    })}
    
  </Row>


{selectedExam?.length>0 &&<div className='pe-3'>
  <Row className='text-end d-flex justify-content-md-end justify-content-center text-center' gutter={8}>
    
    <Col  className='border boder-dark' style={{float:"right",width:"150px"}}>
      <Statistic title="Score of this exam" value={100/selectedExam?.length*count} suffix={`/${ 100}`} />
    </Col>
  </Row>
  
{  selectedExam?.map((ele,i)=>{
        return <ol key={ele._id} type='A'>
            <h5 className='fs-6 fs-md-1'>Question {i+1} :{ele.question}</h5>
            {ele.options.map((opt,i)=>{
              return <>
             {ele.selectedOption && <li key={i} className={opt._id ===ele.selectedOption._id? 'form-control my-1 bg-success':'form-control my-1'}>{opt.text}</li>}
             {!ele.selectedOption && <li key={i} className="form-control my-1">{opt.text}</li>}
            
              </>
            })}
            {!ele.options.length && <textarea  className='form-control' disabled value={ele.textAnswer}></textarea>}
           {ele.options.length>=0 && <h6 style={{width:"max-content"}} className=' p-2 col-6 align-items-center flex-sm-column flex-md-row d-flex border border-info'>YourAnswer: <span className='bg-info p-1'> {JSON.stringify(ele.isCorrect) || "not attempted"}</span></h6>}
        </ol>
      })}
</div>}


  
    </div>
  )
}

export default StudenteDashBoard
