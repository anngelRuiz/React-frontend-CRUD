import React, { useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams } from 'react-router-dom';
import { API_ENDPOINT } from '../config/config';
import Swal from 'sweetalert2';

export default function EditUser() {

  const [error, setError] = useState("");

  let navigate = useNavigate();

  const {id} = useParams();

  const [user, setUser] = useState({
    name:"",
    lastName:"",
    email:"",
    age: "",
    gender: "",
    deparment: ""
  });

  const {name, lastName, email, age, gender, deparment} = user;

  const [userChanged, setUserChanged] = useState(false);

  const onInputChange = (e) =>{
      setUser({...user, [e.target.name]: e.target.value});
      setUserChanged(true);
  };

  useEffect(() =>{
    loadUser();
  },[]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if(userChanged){
      try{
        console.log("sending axios put");
        await axios.put(`${API_ENDPOINT}/users/${id}`, user);
        setUserChanged(false);
        navigate("/");
      }catch (error){
        setError(error);
        console.log("Error editing user:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error Editing user',
          text: error,
          customClass: {
            confirmButton: 'swal2-confirm'
          }
        });
      }   
    }else{
      Swal.fire({
        title: "No changes",
        text: "There are no changes in the form.",
        icon: "warning",
        confirmButtonColor: '#3085d6',
        customClass: {
          popup: 'my-swal-modal',
          confirmButton: 'swal2-confirm'
        }
      });
    }
     
  };

  const loadUser = async () => {
    const result = await axios.get(`${API_ENDPOINT}/users/${id}`);
    setUser(result.data);
  }
  

  const handleCancel = (e) => {
    e.preventDefault();
    if(userChanged){
      Swal.fire({
        title: "Are you sure?",
        text: "You made some changes in the user data",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#e41c1c',        
        confirmButtonText: "Cancel Edit",        
        cancelButtonColor: '#c1c1c1',
        cancelButtonText: "Keep editing",

      }).then((result) => {
        if(result.isConfirmed){
          try{
            navigate("/");
          }catch(error){
            setError("Error editing users:\n" + error);
            console.log("Error editing user:", error);
          }
        }
      });
    }else{
      navigate("/");
    }
  }

  return (
    <div className='container text-center'>
      <div className='row'>        
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Edit User</h2>
          <form onSubmit={(e) => {onSubmit(e)}}>
            <div className='mb-3'>
              <label htmlFor='Name' className='form-label'>Name</label>
              <input type={"text"} className='form-control' placeholder='Enter your name' name="name" value={name} onChange={(e) => onInputChange(e)}></input>
            </div>
            <div className='mb-3'>
              <label htmlFor='lastName' className='form-label'>Last Name</label>
              <input type={"text"} className='form-control' placeholder='Enter your Last name' name="lastName" value={lastName} onChange={(e) => onInputChange(e)}></input>
            </div>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>Email</label>
              <input type={"text"} className='form-control' placeholder='Enter your Email' name="email" value={email} onChange={(e) => onInputChange(e)}></input>
            </div>
            <div className='mb-3'>
              <label htmlFor='age' className='form-label'>Age</label>
              <input type={"number"} className='form-control' placeholder='Enter your Age' name="age" value={age} onChange={(e) => onInputChange(e)}></input>
            </div>
            <div class="input-group mb-3">
            <select class="form-select" id="inputGender" name="gender" value={gender} onChange={(e) => onInputChange(e)}>
              <option>Choose gender...</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
            <label class="input-group-text" for="inputGender">Gender</label>
            </div>

            <div class="input-group mb-3">
              <select class="form-select" id="inputDepartment" name="deparment" value={deparment} onChange={(e) => onInputChange(e)}>
                <option>Choose Deparment...</option>
                <option value="IT">IT</option>
                <option value="ACCOUNT">ACCOUNT</option>
                <option value="CALL">CALL</option>
              </select>
              <label class="input-group-text" for="inputDepartment">Deparment</label>
            </div>
            
            <button type="submit" className='btn btn-primary'>Submit</button>
            <button className='btn btn-outline-secondary mx-2' onClick={(e) =>handleCancel(e)}>Cancel</button>            
          </form>
        </div>

      </div>      
    </div>
  )
}
