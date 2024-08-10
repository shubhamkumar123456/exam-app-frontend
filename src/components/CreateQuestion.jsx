import Modal from 'antd/es/modal/Modal';

import axios from 'axios';
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';
const CreateQuestion = (props) => {





    const handleCancel = () => {
        props.setIsModalOpen(false);
    };

    let questionRef = useRef();
    let option1Ref = useRef();
    let option2Ref = useRef();
    let option3Ref = useRef();
    let option4Ref = useRef();
    let answerRef = useRef();
    let categoryRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let obj = {
            question: questionRef.current.value,
            options: [option1Ref.current.value, option2Ref.current.value, option3Ref.current.value, option4Ref.current.value],
            correctOption: answerRef.current.value,
            category: categoryRef.current.value
        }
console.log(obj)
        let res = await axios.post('http://localhost:8080/question/create', obj);
        let data = res.data;
        console.log(data);
        if (data.success) {
            toast.success(data.message, { position: 'top-center' });
            questionRef.current.value = ""
            answerRef.current.value = ""
            option1Ref.current.value = ""
            option2Ref.current.value = ""
            option3Ref.current.value = ""
            option4Ref.current.value = ""
            categoryRef.current.value = ""
        } else {
            toast.error(data.message, { position: 'top-center' });
        }
        props.setIsModalOpen(false);
    }
    return (
        <div className=''>

            <Modal title="Create Question component" open={props.isModalOpen} onOk={handleSubmit} onCancel={handleCancel}>

                <label htmlFor="" className=''>Question</label>
                <textarea ref={questionRef} name="" className='form-control' placeholder='enter question here..'></textarea>
                <label htmlFor="" className='my-1'>Options</label>
                <input type="text" ref={option1Ref} className='form-control my-1' placeholder='enter option 1' />
                <input type="text" ref={option2Ref} className='form-control my-1' placeholder='enter option 2' />
                <input type="text" ref={option3Ref} className='form-control my-1' placeholder='enter option 3' />
                <input type="text" ref={option4Ref} className='form-control my-1' placeholder='enter option 4' />
                <label htmlFor="" className='my-1'>Answer</label>
                <input type="number" ref={answerRef} className='form-control my-1' placeholder='enter correct option number' />
                <select ref={categoryRef} className='form-select my-2' name="" id="">
                    <option value="">select question category</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="JS">JS</option>
                    <option value="REACT JS">REACT JS</option>
                    <option value="NODE JS">NODE JS</option>
                    <option value="EXPRESS JS">EXPRESS JS</option>
                    <option value="NODE JS">NODE JS</option>
                    <option value="MONGO DB">MONGO DB</option>
                </select>

            </Modal>


        </div>
    )
}

export default CreateQuestion
