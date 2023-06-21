import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import Skeleton from "../components/skeleton/Skeleton";
import { API_ENDPOINT } from "../config/config";

export default function Home() {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const {id} = useParams();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get("error");
    if(errorParam){
      setError(decodeURIComponent(errorParam));
    }
    if(error){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error,
        customClass: {
          confirmButton: 'swal2-confirm'
        }
      });
    }
    loadUsers();
    
  }, [error]);

  const loadUsers = async () => {
    try{
      const result = await axios.get(API_ENDPOINT + "/users");
      // Simulating loading
      setTimeout(() => {
        const filteredUsers = result.data.filter((user) => user.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()));
        setUser(filteredUsers);
        setError("");
        setLoading(false);
      }, 2000);
    }catch (error){
      setError("Error loading users:\n" + error);
      setLoading(false);
    }
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#e41c1c',
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: 'my-swal-modal',
        confirmButton: 'swal2-confirm'
      }
    }).then( async (result) => {
      if(result.isConfirmed){
        try{
          await axios.delete(`${API_ENDPOINT}/users/${id}`);
          loadUsers();
          Swal.fire(
            'Deleted',
            'The user has been deleted.',
            'success'
          );
        }catch(error){
          setError("Error loading users:\n" + error);
          console.log("Error deleting user:", error);
        }
      }
    });
    
  }

  return (
    <div className="container">    
      <div className="py-4">
          <div class="row">
            <div class="col-md-4 mx-auto">
            
            <div className="input-group">
                  <input id="example-search-input" className="form-control border-end-0 border rounded-pill" type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  <span className="input-group-append">
                      <button className="btn btn-outline-secondary bg-white border-start-0 border rounded-pill ms-n3" type="button">
                          <i className="fas fa-search"></i>
                      </button>
                  </span>
            </div>
        </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Age</th>
              <th scope="col">Gender</th>
              <th scope="col">Department</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
          {!loading ?
              users.length > 0 ? (
              users.map((user, index) => (
              <tr key={user.id}>
                <th key={index} scope="row">{index+1}</th>
                <td>{user.name}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>{user.deparment}</td>
                <td>
                  <Link className="btn btn-primary mx-2" to={`/viewUser/${user.id}?error=${encodeURIComponent(error)}`}>View</Link>
                  <Link className="btn btn-outline-primary mx-2" to={`/editUser/${user.id}`}>Edit</Link>
                  <button className="btn btn-danger mx-2" onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No users found.
                </td>
              </tr>
            ) : ''}
          </tbody>
        </table>
        {loading ? <Skeleton/> : ''}
      </div>
    </div>
  );
}
