import React, { useState, useEffect } from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast';
import "../styles/form.styles.css"

function Form({updateCallback}) {

  const {id} = useParams();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const isUpdating = Boolean(id);


  useEffect(() => {
    if(isUpdating) {

      const fetchContact = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/contact/${id}`, {
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
          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");
          setEmail(data.email || "");

        } catch (error) {
          toast.error('Something went wrong while fetching contact!', {duration: 3000, position: 'top-center'});
          console.error("Failed to fetch contact:", error);
        }
      };
      fetchContact();
    }
  }, [id, isUpdating]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email
    }
    const url = `${import.meta.env.VITE_BACKEND_URI}/` + (isUpdating ? `update_contact/${id}` : "create_contact");
    const options = {
      method: `${isUpdating ? "PUT" : "POST"}`,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    }

    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        toast.error(`Failed to ${isUpdating ? "update" : "create"} contact!`, {duration: 5000, position: 'top-center'});
      } else {
        if (updateCallback) updateCallback();
        toast.success(`Contact ${isUpdating ? "updated" : "created"} successfully!`, {duration: 5000, position: 'top-center'});
        setTimeout(() => {
          navigate("/", {state: {showToast: true}});
        }, 2000);
      }
    } catch (error) {
      toast.error(`Error while ${isUpdating ? "updating" : "creating"} contact!`, { duration: 5000, position: 'top-center' });
      console.error("Error:", error);
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
        <button type="submit" className="btn btn-primary w-100 fw-medium mt-2" style={{"borderRadius" : "25px"}}>
          {isUpdating ? "Update Contact" : "Add Contact"}
        </button>
      </form>
    </div>
  )
}

export default Form