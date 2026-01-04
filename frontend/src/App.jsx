import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home.jsx";

function App() {

  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/contacts`);
    const data = await response.json();
    setContacts(data.contacts);
  };
  
  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "#f2f2f2" }}>
        <Home contacts={contacts} fetchContacts={fetchContacts} />
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </>
  );
}

export default App;
