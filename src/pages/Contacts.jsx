import { message } from "antd";
import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
const backendUrl = "https://api.smeduconsultant.com";
// const backendUrl = "http://localhost:5005";
import axios from "axios";

const Contacts = () => {

  const [contactDet, setContactDet] = useState(null);
  const [newContactDet, setNewContactDet] = useState({ address: "", email: "", phno: "", });
  const [contacts, setContacts] = useState([]);

  const fetchData = async () => {
    try {
        const contactDetResponse = await axios.get(`${backendUrl}/api/contactDet`);
        setContactDet(contactDetResponse.data);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await fetch(`${backendUrl}/api/contacts`);

      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      } else {
        message.error("Failed to fetch contacts");
      }
    };

    fetchContacts();
    fetchData();
  }, []);

  const handleSubmitContactDet = async (e) => {
    e.preventDefault();
    try {
      if (contactDet) {
        await axios.put(`${backendUrl}/api/contactDet`, newContactDet);
      } else {
        await axios.post(`${backendUrl}/api/contactDet`, newContactDet);
      }
      setNewContactDet({ address: "", email: "", phno: "", });
      fetchData();
    } catch (error) {
      console.error("Error submitting Contact Details:", error);
    }
  };

  const handleDeleteContactDet = async () => {
    try {
      await axios.delete(`${backendUrl}/api/contactDet`);
      setContactDet(null);
      fetchData();
    } catch (error) {
      console.error("Error deleting hero:", error);
    }
  };

  const handleDelete = async (contactId) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/contacts/${contactId}`);
      if (response.status === 200) {
        setContacts(contacts.filter(contact => contact._id !== contactId));
        message.success("Contact deleted successfully");
      } else {
        message.error("Failed to delete contact");
      }
    } catch (error) {
      message.error("Error deleting contact");
    }
  };

  const downloadCSV = () => {
    const csvData = [
      ["Full Name", "Email", "Institution", "Phone", "Service", "Message"],
      ...contacts.map(contact => [
        contact.fullName,
        contact.email,
        contact.institutionName,
        contact.phone,
        contact.service,
        contact.message,
      ])
    ];

    const csvContent = "data:text/csv;charset=utf-8," 
      + csvData.map(e => e.join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "contacts.csv");
    document.body.appendChild(link); // Required for Firefox

    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Manage Contacts
      </h2>

      <div className="p-4 border rounded shadow mb-5">
        <h3 className="text-xl">Contact Details</h3>
        <form onSubmit={handleSubmitContactDet} className="mt-2">
          <input
            type="text"
            placeholder="address"
            value={newContactDet.address}
            onChange={(e) => setNewContactDet({ ...newContactDet, address: e.target.value })}
            required
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="email"
            value={newContactDet.email}
            onChange={(e) => setNewContactDet({ ...newContactDet, email: e.target.value })}
            required
            className="border p-2 w-full mt-2"
          />
          <input
            type="text"
            placeholder="phone number"
            value={newContactDet.phno}
            onChange={(e) => setNewContactDet({ ...newContactDet, phno: e.target.value })}
            required
            className="border p-2 w-full mt-2"
          />
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded mt-4"
          >
            {contactDet ? "Update Contact Details" : "Add Contact Details"}
          </button>
          {contactDet && (
            <div className="mt-2">
              <h4 className="font-semibold">{contactDet.email}</h4>
              <p>{contactDet.phno}</p>
              <p>{contactDet.address}</p>
              <button
                onClick={handleDeleteContactDet}
                className="bg-red-500 text-white py-1 px-2 rounded mt-2"
              >
                Delete Contact Details
              </button>
            </div>
          )}
        </form>
      </div>

      {/*Get In Touch*/}
      <div className="flex justify-end mb-4">
        <button
          onClick={downloadCSV}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Download CSV
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {contacts.map((contact) => (
          <div
            key={contact._id}
            className="bg-white border rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-200 flex flex-col"
          >
            <div className="flex justify-between items-center w-full mb-2">
              <h3 className="text-xl font-semibold text-blue-600">
                {contact.fullName}
              </h3>
              <button
                onClick={() => handleDelete(contact._id)}
                className="text-red-600 hover:text-red-800 transition"
              >
                Delete
              </button>
            </div>
            <p className="text-gray-700">
              <strong>Email:</strong> {contact.email}
            </p>
            <p className="text-gray-700">
              <strong>Institution:</strong> {contact.institutionName}
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> {contact.phone}
            </p>
            <p className="text-gray-700">
              <strong>Service:</strong> {contact.service}
            </p>
            <p className="text-gray-700">
              <strong>Message:</strong> {contact.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
