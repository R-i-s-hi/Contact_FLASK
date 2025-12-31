import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import "../styles/form.styles.css"

function Form() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const fetchContact = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/contacts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        credentials: "include"
      });

      if (!response.ok) {
        toast.error('Something went wrong while fetching contacts!', {duration: 3000, position: 'top-center'});
      }

      const data = await response.json();
      setContact(data.contacts);
    } catch (error) {
      toast.error('Something went wrong while fetching contacts!', {duration: 3000, position: 'top-center'});
      console.error("Failed to fetch contacts:", error);
    }
  };


  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email
    }
    const url = "http://127.0.0.1:5000/create_contact";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    }

    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        toast.error('Failed to create contacts!', {duration: 5000, position: 'top-center'});
      }
      const result = await response.json();
      console.log(result);

      toast.success('Contact created successfully!', {duration: 5000, position: 'top-center'});
      
      setTimeout(() => {
        navigate("/", {state: {showToast: true}});
      }, 2000);

      setFirstName("");
      setLastName("");
      setEmail("");
      
    } catch (error) {
      toast.error('Failed to create contacts!', {duration: 3000, position: 'top-center'});
      console.error("Error creating contact:", error);
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100wv", backgroundColor: "#f2f2f2" }}>
      <form class="mx-auto my-center p-5 border border-2 rounded-3 shadow" onSubmit={onSubmit}>
        <div class="mb-3">
          <label htmlFor="exampleInputEmail1" class="form-label">First Name</label>
          <input type="text" class="form-control" id="exampleInputEmail1" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div class="mb-3">
          <label htmlFor="exampleInputEmail1" class="form-label">Last Name</label>
          <input type="text" class="form-control" id="exampleInputEmail1" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div class="mb-4">
          <label htmlFor="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary w-100 fw-medium mt-2" style={{"borderRadius" : "25px"}}>Submit</button>
      </form>
    </div>
  )
}

export default Form