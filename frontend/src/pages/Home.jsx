import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../styles/Home.styles.css';

function Home() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json();
    setContacts(data.contacts);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="Home">
      <div className="d-flex justify-content-center align-items-center py-5">
        <span className="text-decoration-underline fs-2 fw-bold">Contacts</span>
          <Link className="btn btn-primary d-flex align-items-center rounded-5 ms-4 fw-semibold" style={{fontSize: "13px"}} to="/add_contact">
            <i class="fa-solid fa-plus nav-link"></i>&nbsp; Add Contact
          </Link>
        
      </div>
      <div class="container-fluid text-center pb-5" style={{height: "100dvh"}}>
        <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-1 g-3">
          {contacts.map((contact) => {
            return (
              <div key={contact.id} className="col">
                    <div class="card border border-2 shadow rounded-3 p-2" style={{backgroundColor: "#f5f5f5"}}>
                        <div class="card-body rounded-3">
                          <span className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-2">
                            <h3 class="card-title me-auto">{contact.firstName}&nbsp;{contact.lastName}</h3>
                            <div className="d-flex gap-2">
                              <button className="btn p-0" style={{fontSize: "13px"}}>
                                <Link className="nav-link" to={`/edit_contact/${contact.id}`}>
                                  <i class="fa-solid fa-pen"></i>
                                </Link>
                              </button>
                              <button className="btn p-0" style={{fontSize: "13px"}}>
                                  <i class="fa-solid fa-trash-can"></i>
                              </button>
                            </div>

                          </span>
                            <p class="card-text fw-medium mb-0">Email: {contact.email}</p>
                        </div>
                    </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
