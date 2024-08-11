import { Col, Modal, Row, Statistic } from 'antd';
import React, {  useRef, useState } from 'react'

import axios from 'axios';
import generatePDF from 'react-to-pdf';
const AlluserDetails = (props) => {
    const targetRef = useRef();
    // console.log(props.allUser)
   
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
    return (
        <div>
            <h1>All user details page</h1>

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


                    {props.allUser.map((ele, index) => {
                        return <>
                            {ele.name !== 'admin' && <tr key={ele._id}>
                                <td>{index + 1}</td>
                                <td>{ele.name}</td>
                                <td>{ele.email}</td>
                                <td>
                                    <select onChange={handleExamChange} className='form-select' >
                                        {ele.Exam.map((el) => {
                                            return <>
                                                <option className='fs-6' >Select a exam</option>
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
                                    {ele.selectedOption && <li key={i} className={opt._id === ele.selectedOption._id ? 'form-control my-1 bg-success' : 'form-control my-1'}>{opt.text}</li>}
                                    {!ele.selectedOption && <li key={i} className="form-control my-1">{opt.text}</li>}

                                </>
                            })}
                            {!ele.options.length && <textarea className='form-control' disabled value={ele.textAnswer}></textarea>}
                            {ele.options.length >= 0 && <h6 style={{ width: "max-content" }} className=' p-2 col-6 align-items-center flex-sm-column flex-md-row d-flex border border-info'>YourAnswer: <span className='bg-info p-1'> {JSON.stringify(ele.isCorrect) || "not attempted"}</span></h6>}
                        </ol>
                    })}
                </div>

            </Modal>

        </div>
    )
}

export default AlluserDetails
