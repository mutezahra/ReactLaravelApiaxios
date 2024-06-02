import React, {useState } from 'react';
import List from './List';
import axios from 'axios';
import { renderMatches } from 'react-router-dom';

const Home = () => {
  const[userField, setUserField]=useState({
    name: "",
    email: "",
    password: ""
})


  const changeUserFieldHandler=(e)=>{
    setUserField({
     ...userField,
     [e.target.name]: e.target.value
    });
    console.log(userField);
 }
 const [loading, setLodiang]=useState()

 const onSubmitChange = async(e)=>{
  e.preventDefault();
  try {
     const responce = await axios.post("http://localhost:8000/api/addnew/", userField);
   console.log(responce);
   setLodiang(true);

} catch (err) {
   console.log("Something  wrong",err);
  
}
if(loading){
  return <Home/>
}
 }
  return (
    <div className="container">
      <h2 className="w-100 d-flex justify-content-center p-3">React JS LARAVEL REST API</h2>
      <div className="row">
        <div className="col-md-4">
          <h3>Add Your Detail</h3>
          <form>
            <div className="mb-3 mt-3">
              <label className='form-label'>Full Name :</label>
              <input type="text" className="form-control" name="name" id="name" placeholder="Enter Your Name" onChange={e => changeUserFieldHandler(e)} />
            </div>
            <div className="mb-3 mt-3">
              <label className='form-label'>Email :</label>
              <input type="text" className="form-control" name="email" id="email" placeholder="Enter Your Email" required onChange={e => changeUserFieldHandler(e)} />
            </div>
            <div className="mb-3 mt-3">
              <label className='form-label'>Password:</label>
              <input type="text" className="form-control" name="password" id="password" placeholder="Enter Your Password" required onChange={e => changeUserFieldHandler(e)} />
            </div>
            <button type='submit' className='btn btn-primary'  onClick={e => onSubmitChange(e)}>Add User</button>
          </form>
        </div>
        <div className='col-md-8'>
          <List />
        </div>
      </div>
    </div>
  );
}

export default Home;
