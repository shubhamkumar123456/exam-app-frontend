import React, { useEffect, useState } from 'react'


import CreateExamForm from '../components/CreateExamForm'
import CreateQuestion from '../components/CreateQuestion'
import { Button } from 'antd/es/radio';
import ShowQestion from '../components/ShowQestion';
import axios from 'axios';
import ShowExam from '../components/ShowExam';
import AlluserDetails from '../components/AlluserDetails';

const AdminPage = () => {

  const [showExamPage, setShowExamPage] = useState(false);
  const [Exams, setExams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);


  const showModal = () => {
    setIsModalOpen(true);
  };


  const showModal1 = () => {
    setIsModalOpen1(true);
  };
  const showQuestionModal = () => {
    setIsQuestionModalOpen(true);
  };

  const fetchExam = async () => {
    let res = await axios.get('https://exam-app-backend-alyd.onrender.com/exam/getallexam');
    let data = res.data
    // console.log(data)
    if (data.success) {
      console.log(data.exam)
      setExams(data.exam)
    }

  }
  useEffect(() => {
    fetchExam()
  }, [])

  const [allUserDetails, setallUserDetails] = useState([]);
  const handleUserClicked=async()=>{
    let res =await axios.get('https://exam-app-backend-alyd.onrender.com/user/getall')
    let data =res.data;
    setallUserDetails(data.users)
  }
  
  
  return (
    <div className='row bg-warning m-0 p-0 pt-3'>
      <div className="col-md-3">
        <h3 className='text-center border boder-secondary p-1 bg-secondary'>Admin Dashboard</h3>
        <div className="bg-info p-2 d-flex flex-column">
          <Button className='mx-1 my-1' type="primary" onClick={showModal1}>
            Create Exam
          </Button>
          <Button className='mx-1 my-1' type="" onClick={showModal}>
            Create Question
          </Button>
          <Button className='mx-1 my-1' type="primary" onClick={showQuestionModal}>
            Show all questions
          </Button>
          <Button className='mx-1 my-1' onClick={() => setShowExamPage(true)} type="primary" >
            Show Exam papers
          </Button>
          <Button className='mx-1 my-1' onClick={handleUserClicked} type="primary" >
            All users
          </Button>
        </div>
      </div>
      <div className="col-md-8">

        {showExamPage && <ShowExam Exams={Exams} fetchExam={fetchExam}/>}
        <ShowQestion fetchExam={fetchExam} Exams={Exams} isQuestionModalOpen={isQuestionModalOpen} setIsQuestionModalOpen={setIsQuestionModalOpen} />
        <CreateExamForm setIsModalOpen1={setIsModalOpen1} isModalOpen1={isModalOpen1} />
        <CreateQuestion setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
        {allUserDetails.length>0&&<AlluserDetails allUser={allUserDetails} setallUserDetails={setallUserDetails}/>}
      </div>




    </div>
  )
}

export default AdminPage
