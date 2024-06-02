import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const List = () => {
    const [userData, setUSerData]= useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async() => {
        try {
            const result = await axios("http://localhost:8000/api/users");
            // console.log(result.data.results);
            setUSerData(result.data.results);
        } catch (err) {
            console.log("Something  wrong");
        }
    }

    const handleDelete=async(id)=>{
        console.log(id);
        await axios.delete("http://localhost:8000/api/usersdelete/"+id)
        const newUserData=userData.filter((item)=>{
            return(
                item.id !==id
            )
        })
        setUSerData(newUserData);
    }

    return (
        <div className="container">
            <h3 className="w-100 d-flex justify-content-center p-3">Users Details</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{
                    userData.map((user, i) => {
                        return (
                             <tr key={i}>
                                 <td>{i+1}</td>
                                 <td>{user.name}</td>
                                 <td>{user.email}</td>
                                 <td>
                                    <NavLink to={`/view/${user.id}`} className="btn btn-success mx-2">view</NavLink>
                                    <NavLink to={`/edit/${user.id}`} className="btn btn-info mx-2">Edit</NavLink>
                                    <button onClick={()=>handleDelete(user.id)} className="btn btn-danger">Delete</button>
                                 </td>
                             </tr>
                         )
                     })
                    }
                    
                </tbody>
            </table>
        </div>
    );
}

export default List;
