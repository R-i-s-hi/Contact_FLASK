import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.styles.css";
import toast from "react-hot-toast";

function Home({ contacts, fetchContacts }) {

  const deleteContact = async (id) => {
    try {
      const option = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        credentials: "include"
      };

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/delete_contact/${id}`, option);

      if (!response.ok) { 
        toast.error("Failed to delete contact!", { duration: 5000, position: "top-center" });
        return;
      }

      toast.success("Contact deleted successfully!", { duration: 5000, position: "top-center" });

      fetchContacts();

    } catch(error) {
      toast.error('Something went wrong!', {duration: 5000, position: "top-center"});
      console.log("Error deleting contacts: ", error);
    }
  }

  return (
    <div className="Home">
      <div className="d-flex justify-content-center align-items-center py-5">
        <span className="text-decoration-underline fs-2 fw-bold">Contacts</span>
        <Link
          className="btn btn-primary d-flex align-items-center rounded-5 ms-4 fw-semibold"
          style={{ fontSize: "13px" }}
          to="/add_contact"
        >
          <i class="fa-solid fa-plus nav-link"></i>&nbsp; Add Contact
        </Link>
      </div>
      <div
        class="container-fluid text-center pb-5"
        style={{ height: "100%" }}
      >
        <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-1 g-3">
          {contacts.map((contact) => {
            return (
              <div key={contact.id} className="col">
                <div
                  class="card border border-2 shadow rounded-3 p-2"
                  style={{ backgroundColor: "#f5f5f5" }}
                >
                  <div class="card-body rounded-3">
                    <span className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-2">
                      <h3 class="card-title me-auto">
                        {contact.firstName}&nbsp;{contact.lastName}
                      </h3>
                      <div className="d-flex gap-2">
                        <button
                          className="btn p-0"
                          style={{ fontSize: "13px" }}
                        >
                          <Link
                            className="nav-link"
                            to={`/edit_contact/${contact.id}`}
                          >
                            <i class="fa-solid fa-pen"></i>
                          </Link>
                        </button>
                        <button
                          className="btn p-0"
                          style={{ fontSize: "13px" }}
                          onClick={() => { deleteContact(contact.id) }}
                        >
                          <i class="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </span>
                    <p class="card-text fw-medium mb-0">
                      Email: {contact.email}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
