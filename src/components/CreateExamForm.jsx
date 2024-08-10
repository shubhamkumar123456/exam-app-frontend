
import { Modal } from 'antd';
import axios from 'axios';
import React, { useRef } from 'react'
import { toast } from 'react-toastify';

const CreateExamForm = (props) => {

    let batchRef = useRef();
    let examRef = useRef();
    const handleCancel = () => {
      
        props.setIsModalOpen1(false);
      };

      const handleSubmit = async()=>{
        let obj ={
            examName:examRef.current.value,
            batch:batchRef.current.value
        }
        let res = await axios.post('http://localhost:8080/exam/createexam',obj)
        let data = res.data;
        console.log(data);
        if(data.success){
            console.log("yes");
            examRef.current.value = ""
            batchRef.current.value = ""
            toast.success(data.message,{position:'top-center'});
        }else{
        
            toast.error(data.message,{position:'top-center'});
        }
        props.setIsModalOpen1(false);
      }
  return (
    <div>
         <Modal title="Create Exam paper" open={props.isModalOpen1} onOk={handleSubmit} onCancel={handleCancel}>
        <select ref={batchRef} className='form-select' name="" id="">
            <option  value="">Enter your Batch time</option>
            <option value="10-12">10-12</option>
            <option value="12-2">12-2</option>
            <option value="3-5">3-5</option>
            <option value="5-7">5-7</option>
        </select>
     <div className="form-floating my-2">
  <input ref={examRef} type="text" className="form-control" id="floatingPassword" placeholder='exam name..' />
  <label htmlFor="floatingPassword">Enter your exam name</label>
</div>

         

</Modal>
    </div>
  )
}

export default CreateExamForm
