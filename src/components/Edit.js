import React, {useState,useEffect } from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Edit = () => {
    const clickToBackHandler=()=>{
        navigate('/');
    }
   
    const {id}=useParams();
    const navigate = useNavigate();
    const[userField, setUserField]=useState({
        name: "",
        email: "",
        password: ""
    })


    useEffect(() => {
        fetchUser();
    }, [id])

    const fetchUser = async() => {
        try {
            const result = await axios.get("http://localhost:8000/api/users/"+id);
         
            setUserField(result.data.users);
        } catch (err) {
            console.log("Something  wrong");
        }
    }

    const onSubmitChange= async(e) =>{
        e.preventDefault();
        try {
             await axios.put("http://localhost:8000/api/usersupdate/"+id, userField);
            navigate('/');
        
        } catch (err) {
            console.log("Something  wrong");
        }
    }
   
    const changeUserFieldHandler=(e)=>{
       setUserField({
        ...userField,
        [e.target.name]: e.target.value
       });
       console.log(userField);
    }
  return (
    <div className="container">
      
          <h3>Edit Form</h3>
          <form>
            <div className="mb-3 mt-3">
              <label className='form-label'>Id</label>
              <input type="text" className="form-control" name="id" value={id} id="id" placeholder="" disabled />
            </div>
            <div className="mb-3 mt-3">
              <label className='form-label'>Full Name :</label>
              <input type="text" className="form-control" name="name" id="name" placeholder="Enter Your Name" value={userField.name} onChange={e => changeUserFieldHandler(e)}/>
            </div>
            <div className="mb-3 mt-3">
              <label className='form-label'>Email :</label>
              <input type="text" className="form-control" name="email" id="email" placeholder="Enter Your Email" required   value={userField.email} onChange={e => changeUserFieldHandler(e)}/>
            </div>
           
            <div className="mb-3 mt-3">
              <label className='form-label'>Password :</label>
              <input type="password" className="form-control" name="password" id="password" placeholder="Enter Your Password" required   value={userField.password} onChange={e => changeUserFieldHandler(e)}/>
            </div>
           
            <button type='submit' className='btn btn-primary' onClick={e=>onSubmitChange(e)}>Update</button>
          </form>
          <div className='container d-flex justify-content-center'>

        <button className='btn btn-primary' onClick={clickToBackHandler}>Back To Home</button>
        
        </div>
    </div>
       
   
  );
}

export default Edit;
