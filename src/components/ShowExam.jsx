import Modal from 'antd/es/modal/Modal';
import React, { useRef, useState } from 'react'
import { Card, Col, Row } from 'antd';
const ShowExam = (props) => {
  console.log(props.Exams)
  const [selectedExam, setSelectedExam] = useState({question:[]});
  const [showModel, setShowModel] = useState(false);
  
    const handleCancel = () => {
    
        setShowModel(false);
      };

    const handleSubmit = ()=>{
      setShowModel(false);
    }

 

    const handleCardClick=(ans)=>{
      setShowModel(true);
        console.log(ans)
        setSelectedExam(ans)
    }
  return (
    <div>
      <h1>Show exam page</h1>

      <Row gutter={16}>
    {props.Exams.map((ele)=>{
      return  <Col key={ele._id} span={8}>
      <Card onClick={()=>handleCardClick(ele)} title={`Batch:  ${ele.batch}`} bordered={false}>
        {ele.examName}
      </Card>
    </Col>
    })}
   
  </Row>

      
      <Modal title="Exam paper" open={showModel} onOk={handleSubmit} onCancel={handleCancel}>
       
      {  selectedExam.question.map((ele,i)=>{
        return <ol key={ele._id} type='A'>
            <h5>Question {i+1} :{ele.question}</h5>
            {ele.options.map((opt,i)=>{
                return <li key={i} className='form-control my-1'>{opt.text}</li>
            })}
        </ol>
      })}
      {!selectedExam.question.length && <h3>No question is added in the exam</h3>}
         

</Modal>
    </div>
  )
}

export default ShowExam
