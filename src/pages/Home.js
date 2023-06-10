import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const [users, setUser] = useState([]);
  const [error, setError] = useState("");

  const {id} = useParams();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get("error");
    if(errorParam){
      setError(decodeURIComponent(errorParam));
    }
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try{
      const result = await axios.get("http://localhost:8080/users");
      setUser(result.data);
      setError("");
    }catch (error){
      setError("Error loading users:\n" + error);
    }
  };

  const deleteUser = async (id) => {
    try{
      await axios.delete(`http://localhost:8080/users/${id}`);
      loadUsers();
    }catch(error){
      setError("Error loading users:\n" + error);
      console.log("Error deleting user:", error);
    }
  }

  return (
    <div className="container">
      <div className="py-4">
        {error && <div className="alert alert-danger text-center"><pre>{error}</pre></div>}
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
            {users.map((user, index) => (
              <tr>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
