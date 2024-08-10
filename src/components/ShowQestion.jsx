import Modal from 'antd/es/modal/Modal';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

const ShowQestion = (props) => {
    const [questions, setquestions] = useState([]);
    const [filteredItem, setFilteredItem] = useState([]);
    const [isModalAddQuestionOpen, setIsModalAddQuestionOpen] = useState(false);
    const [question, setquestion] = useState("");
    const [examId, setexamId] = useState("");
    const getData = async()=>{
        let res = await axios.get('http://localhost:8080/question/getall');
        let data = res.data;
        // console.log(data.questions);
        setquestions(data.questions);
        setFilteredItem(data.questions)
    }
    useEffect(()=>{
        getData();
    },[])

    const handleSubmit=()=>{
        props.setIsQuestionModalOpen(false);
    }
    const handleCancel = ()=>{
        props.setIsQuestionModalOpen(false);
    }

    let filteredQuestion;
    const handleCategory=(e)=>{
        let category = e.target.value
        console.log(category)
        if(category==="All"){
            setFilteredItem([...questions])
        }else{
            filteredQuestion=questions.filter((ele)=>ele.category.toLowerCase()===category.toLowerCase())
            if(filteredQuestion){
                setFilteredItem(filteredQuestion)
            }
            else{
                setFilteredItem([...questions])
            }
        }
       
    }

    const handleQuestionClick = (obj)=>{
        console.log(obj)
        setquestion(obj)
        setIsModalAddQuestionOpen(true)
    }

   
    const submitAddQuestion=async()=>{
        // http://localhost:8080/exam/addquestion/66b27cbf00e6f955be0e1df5
        let obj={
         question:question._id
        }
        let res = await axios.put(`http://localhost:8080/exam/addquestion/${examId}`, obj)
        let data = res.data;
        console.log(data)
        props.fetchExam()
        // console.log(obj)
        // console.log("examId-->",examId)
        setquestion("")
        setIsModalAddQuestionOpen(false)
    }
    const cancelAddQuestion=()=>{
        setIsModalAddQuestionOpen(false)
    }

  
  return (
    <div>
        <Modal title="Show Question" open={props.isQuestionModalOpen} onOk={handleSubmit} onCancel={handleCancel}>
        <select onChange={handleCategory} className='form-select my-2' name="" id="">
                    <option value="All">select question category</option>
                    <option value="All">All Questions</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="JS">JS</option>
                    <option value="REACT JS">REACT JS</option>
                    <option value="NODE JS">NODE JS</option>
                    <option value="EXPRESS JS">EXPRESS JS</option>
                    <option value="NODE JS">NODE JS</option>
                    <option value="MONGO DB">MONGO DB</option>
                </select>
       
        {filteredItem.map((ele,i)=>{
        return <ol key={ele._id} type='A'>
            <h5>Question {i+1} :{ele.question}</h5><span onClick={()=>handleQuestionClick(ele)} className='btn btn-outline-primary'>Add question in exam</span>
            {ele.options.map((opt,i)=>{
                return <li key={i} className='form-control my-1'>{opt.text}</li>
            })}
            {ele.correctOption && <li className='list-group-item my-1 bg-info ps-2'>Correct Answer = {ele.correctOption.text} </li>}
        </ol>
      })}
         

       </Modal>

       <Modal zIndex={2000} title="Add question to exam" open={isModalAddQuestionOpen} onOk={submitAddQuestion} onCancel={cancelAddQuestion}>
       <select onChange={(e)=>setexamId(e.target.value)} className='form-select'>
           <option value="">select a exam</option>
            {props.Exams.map((ele)=>{
                return <option key={ele._id}  value={ele._id}>Batch: {ele.batch} || ExamName: {ele.examName}</option>
                    
                })}
                </select>
                <label htmlFor="">Question Selected</label>
                <p className='form-control'>{question.question}</p>
       </Modal>
    </div>
  )
}

export default ShowQestion
