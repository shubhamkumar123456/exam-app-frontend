import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { LikeOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
const StudenteDashBoard = () => {
    const [details, setdetails] = useState([]);
    const [selectedExam, setselectedExam] = useState([]);
    console.log(details)
    console.log(selectedExam)
    let user = JSON.parse(localStorage.getItem('user_details'))
  let userId = user.user._id
    let StudentAllExam = async()=>{
        let res = await axios.get(`http://localhost:8080/attempted/getSingleUser/${userId}`);
        let data = res.data
        // console.log(data);
        setdetails(data);
    }
    useEffect(()=>{
        StudentAllExam()
    },[userId])

    const handleClick = (ans)=>{
        console.log(ans);
        setselectedExam(ans);
    }

    let count =0;
    selectedExam?.attemptedQuestion?.forEach((ele)=>{
      if(ele.isCorrect){
        count++;
      }
    })
    console.log(count);
   
  return (
    <div>
      <h1>Student Dashboard</h1>
      <Row color='danger' gutter={16}>
    {details.map((ele)=>{
        return  <Col onClick={()=>handleClick(ele)} color='danger' span={6}>
        <Card title={ele.exam.batch} bordered={false}>
          {ele.exam.examName}
        </Card>
      </Col>
    })}
    
  </Row>


{selectedExam?.attemptedQuestion?.length>=0 &&<div>
  <Row className='text-end' gutter={8}>
    <Col span={6}>
      <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
    </Col>
    <Col span={6}>
      <Statistic title="Score" value={count} suffix={`/${selectedExam?.attemptedQuestion?.length || 0}`} />
    </Col>
  </Row>
{  selectedExam?.attemptedQuestion?.map((ele,i)=>{
        return <ol key={ele._id} type='A'>
            <h5>Question {i+1} :{ele.question}</h5>
            {ele.options.map((opt,i)=>{
              return <li key={i} className={opt._id ===ele.selectedOption._id? 'form-control my-1 bg-success':'form-control my-1'}>{opt.text}</li>
            })}
            {!ele.options.length && <textarea  className='form-control' disabled value={ele.textAnswer}></textarea>}
           {ele.options.length>=0 && <h6 className='bg-info'>YourAnswer: <span className='bg-info'> {JSON.stringify(ele.isCorrect)}</span></h6>}
        </ol>
      })}
</div>}


  
    </div>
  )
}

export default StudenteDashBoard
