import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const View = () => {
    const{id}=useParams();
    const[user,setUser]= useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        fetchUser();
    },[id]);
    const fetchUser= async() => {
        try {
            const result = await axios.get("http://localhost:8000/api/users/"+id);
            // console.log(result.data.results);
            console.log(result.data.users);
            setUser(result.data.users);
        } catch (err) {
            console.log("Something  wrong");
        }
    }
    const clickToBackHandler=()=>{
        navigate('/');
    }
   

    return <div>
        <div className="container">
            <div className="row">  
             <div className="col-md-12">

             <h1>User Detail</h1>
                <table className='table'> 
                   
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Full Name</th>
                        <th>Email</th>
                     
                    </tr>

                    </thead>
                    <tbody>
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    </tbody>
                </table>
                   
                
               
            </div>
        </div>
    </div> 
    
    <div className='container d-flex justify-content-center'>
        <div><button onClick={clickToBackHandler} className='btn btn-primary'>Back To Home</button></div>
    </div></div>
         
        

};

export default View;
