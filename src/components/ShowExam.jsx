import Modal from 'antd/es/modal/Modal';
import React, {  useState } from 'react'
import { Card } from 'antd';
import { Switch } from 'antd';
import axios from 'axios';
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

    const [checked, setchecked] = useState(false);
    const onChange = async(ans) => {
      console.log(ans)
      let enable = ans.enable
      // console.log(`switch to ${checked}`);
      let res =await axios.put(`https://exam-app-backend-alyd.onrender.com/exam/toggleExam/${ans._id}`,{enable:!enable})
      let data = res.data;
      console.log(data)
      props.fetchExam()

    };
  return (
    <div>
      <h3 className='text-center bg-secondary'>Show exam page</h3>
      
      <div className='row gap-2' gutter={16}>
    {props.Exams.map((ele)=>{
      return  <div className='col' key={ele._id} span={8}>
        <Switch checked={ele.enable} onClick={()=>onChange(ele)} />;
      <Card onClick={()=>handleCardClick(ele)} title={`Batch:  ${ele.batch}`} bordered={false}>
        {ele.examName}
      </Card>
    </div>
    })}
   
  </div>

      
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
