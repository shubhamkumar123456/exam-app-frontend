import React, { useEffect, useState } from 'react'


import CreateExamForm from '../components/CreateExamForm'
import CreateQuestion from '../components/CreateQuestion'
import { Button } from 'antd/es/radio';
import ShowQestion from '../components/ShowQestion';
import axios from 'axios';
import ShowExam from '../components/ShowExam';

const AdminPage = () => {
  const [Exams, setExams] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
 
  const [isShowExamModalOpen, setIsShowExamModalOpen] = useState(false);
  const showExamModal = () => {
    setIsShowExamModalOpen(true);
  };
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const showModal1 = () => {
    setIsModalOpen1(true);
  };
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const showQuestionModal = () => {
    setIsQuestionModalOpen(true);
  };

  const fetchExam = async()=>{
    let res = await axios.get('http://localhost:8080/exam/getallexam');
    let data = res.data
    // console.log(data)
    if(data.success){
      console.log(data.exam)
      setExams(data.exam)
    }

  }
  useEffect(()=>{
    fetchExam()
  },[])

  return (
   <div className='container-fluid bg-warning'>
    <h3 className='text-center'>Admin Dashboard</h3>
    <div className="bg-info p-2">
    <Button className='mx-1' type="" onClick={showModal}>
       Add Question
      </Button>
    <Button className='mx-1' type="primary" onClick={showModal1}>
       Create Exam
      </Button>
    <Button className='mx-1' type="primary" onClick={showQuestionModal}>
       Show all questions
      </Button>
    <Button className='mx-1' type="primary" >
       Show Exam papers
      </Button>
    </div>
    
     
      <ShowExam Exams={Exams} />
      <ShowQestion fetchExam={fetchExam} Exams={Exams} isQuestionModalOpen={isQuestionModalOpen} setIsQuestionModalOpen={setIsQuestionModalOpen} />
      <CreateExamForm setIsModalOpen1={setIsModalOpen1} isModalOpen1={isModalOpen1}/>
      <CreateQuestion setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}/>

   </div>
  )
}

export default AdminPage
