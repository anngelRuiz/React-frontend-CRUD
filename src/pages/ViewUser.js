import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, Location, useLocation } from "react-router-dom";

export default function ViewUser() {

    const [user, setUser] = useState({
        name:"",
        lastName:"",
        email:"",
        age: "",
        gender: "",
        deparment: ""
    });

    const {id} = useParams();

    const location = useLocation();
    const error = new URLSearchParams(location.search).get('error');

    useEffect(() =>{
        loadUser();
    },[]);

    const loadUser = async () =>{
        const result = await axios.get(`http://localhost:8080/users/${id}`);
        setUser(result.data);
    }

  return (
    <div className='container text-center'>
      <div className='row'>        
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>User Details</h2>

          <div className="card">
            <div className='card-header'>
                Detailes of User {user.id}
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item'>
                        <b>Name:</b>
                        {user.name}
                    </li>
                    <li className='list-group-item'>
                        <b>Last name:</b>
                        {user.lastName}
                    </li>
                    <li className='list-group-item'>
                        <b>Email:</b>
                        {user.email}
                    </li>
                    <li className='list-group-item'>
                        <b>Age:</b>
                        {user.age}
                    </li>
                    <li className='list-group-item'>
                        <b>Gender:</b>
                        {user.gender}
                    </li>
                    <li className='list-group-item'>
                        <b>Department:</b>
                        {user.deparment}
                    </li>
                </ul>
            </div>
          </div>
          <Link className='btn btn-primary my-2' to={`/?error=${encodeURIComponent(error)}`} >Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
