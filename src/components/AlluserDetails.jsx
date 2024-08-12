import { Col, Modal, Row, Statistic } from 'antd';
import React, {  useRef, useState } from 'react'
import { TiTick } from "react-icons/ti";

import axios from 'axios';
import generatePDF from 'react-to-pdf';
const AlluserDetails = (props) => {

    const targetRef = useRef();
    console.log(props.allUser)
   
    // console.log(ctx)
    const [showModal, setshowModal] = useState(false);
    const [result, setresult] = useState([]);
    console.log(result)

    const handleExamChange = async (e) => {
        let value = e.target.value;
        let userId = value.split('&')[0]
        let examId = value.split('&')[1]
        // console.log(userId)
        // console.log(examId)
        let res = await axios.get(`https://exam-app-backend-alyd.onrender.com/attempted/getSingleAttempted/${userId}/${examId}`);
        let data = res.data;
        // console.log(data.result)
        setresult(data.result)

        // let res = await
        setshowModal(true)
    }
    const handleSubmit = () => {
        setshowModal(false)
    }

    const handleCancel = () => {
        setshowModal(false)
    }

    let count =0;
    let correctCount=0
    let totalCount =0
    result?.attemptedQuestion?.forEach((ele)=>{
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
   
    let filteredUsers=[...props.allUser];
    const [x, setX] = useState("");
    filteredUsers = props.allUser.filter((ele)=>ele.name.toLowerCase().includes(x))
    const handleSearcChanger = (e)=>{
        setX(e.target.value)
    }

    // pagination code starts here
  const [currentPage, setcurrentPage] = useState(1);
  let itemPerPage = 8;
  let lastIndex = itemPerPage*currentPage;
  let firstIndex = lastIndex-itemPerPage;
  let slicedArr = filteredUsers.slice(firstIndex,lastIndex);
  let noOfButton = Math.ceil(filteredUsers.length/itemPerPage);
  let btnArr = [...Array(noOfButton+1).keys()].slice(1)

  const handlePrev = ()=>{
    if(currentPage>1){
        setcurrentPage(currentPage-1)
    }
  }
  const handleNext = ()=>{
    if(currentPage<noOfButton){
        setcurrentPage(currentPage+1)
    }
  }
    return (
        <div>
            <h3 className='text-center'>All user details page</h3>
           <form action="" className='col-md-6 m-auto'>
           <input className='form-control my-1' type="text" placeholder='search user by user name..' onChange={handleSearcChanger} />
           </form>

           <div className='table-responsive'>
           <table className="table text-center table-dark">
                <thead>
                    <tr>
                        <th scope="col">sno</th>
                        <th scope="col">Name</th>
                        <th scope="col">email</th>
                        <th scope="col">exams</th>
                    </tr>
                </thead>
                <tbody>


                    {slicedArr.map((ele, index) => {
                        return <>
                            {ele.name !== 'admin' && <tr key={ele._id}>
                                <td>{index + 1}</td>
                                <td>{ele.name}</td>
                                <td>{ele.email}</td>
                                <td>
                                    <select onChange={handleExamChange} className='form-select' >
                                        <option className='fs-6' >Select a exam</option>
                                        {ele.Exam.map((el) => {
                                            return <>
                                                <option value={`${ele._id}&${el._id}`} className='fs-6'>{el.examName}</option>
                                            </>
                                        })}
                                    </select>
                                </td>
                            </tr>}
                        </>

                    })}


                </tbody>
            </table>
          <nav aria-label="Page navigation example">
  <ul className="pagination flex-wrap">
    <li onClick={handlePrev} className="page-item"><a className="page-link" href="#">Previous</a></li>
   {btnArr.map((ele)=>{
    return  <li onClick={()=>setcurrentPage(ele)} key={ele} className={currentPage===ele?"page-item active":"page-item"}><a className="page-link" href="#">{ele}</a></li>
   })}
    
    <li onClick={handleNext} className="page-item"><a className="page-link" href="#">Next</a></li>
  </ul>
</nav>

           </div>
            <Modal title="Create Question component" open={showModal} onOk={handleSubmit} onCancel={handleCancel}>
                <button onClick={() => generatePDF(targetRef, { filename: 'page.pdf' })}>Download PDF</button>

                <div ref={targetRef}>
                    
                <Row className='text-end d-flex justify-content-md-end justify-content-center text-center' gutter={8}>

<Col className='border boder-dark' style={{ float: "right", width: "150px" }}>
    <Statistic title="Score of this exam" value={100 / result?.attemptedQuestion?.length * count} suffix={`/${100}`} />
</Col>
</Row>
                    <h3>User attempted question</h3>
                    <span>{result.attemptedAt}</span>

                    {result?.attemptedQuestion?.map((ele, i) => {
                        return <ol key={ele._id} type='A'>
                            <h5 className='fs-6 fs-md-1'>Question {i + 1} :{ele.question}</h5>
                            {ele.options.map((opt, i) => {
                                return <>
                                    {ele.selectedOption && <li key={i} className={opt._id === ele.selectedOption._id ? 'form-control my-1 bg-success' : 'form-control my-1'}>{opt.text} <span>{ele.correctOption._id===opt._id?<TiTick color='blue' size={30}/>:""} </span></li>}
                                    {!ele.selectedOption && <li key={i} className="form-control my-1">{opt.text}</li>}

                                </>
                            })}
                            {!ele.options.length && <textarea className='form-control' disabled value={ele.textAnswer}></textarea>}
                            {ele.options.length >= 0 && <h6 style={{ width: "max-content" }} className=' p-2 col-6 align-items-center flex-sm-column flex-md-row d-flex border border-info'>YourAnswer: <span className={ele.isCorrect===true?'bg-info p-1':'bg-danger p-1'}> {JSON.stringify(ele.isCorrect)==="true"?"correct":"incorrect" || "not attempted"}</span></h6>}
                        </ol>
                    })}
                </div>

            </Modal>

        </div>
    )
}

export default AlluserDetails
