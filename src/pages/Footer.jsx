import axios from "axios";
import React, { useEffect, useState } from "react";

const Footer = () => {
  const backendUrl = "https://api.smeduconsultant.com/footer";
  // const backendUrl = "http://localhost:5005/footer";

  const [titleData, setTitleData] = useState([]);
  const [quickLink, setQuickLink] = useState([]);
  const [connectLink, setConnectLink] = useState([]);
  const [contactData, setContactData] = useState([]);

  const [newTitle, setNewTitle] = useState({ title1: "", title2: "" });
  const [newQuickLink, setNewQuickLink] = useState({
    name: "",
    link: "",
  });
  const [newConnectLink, setNewConnectLink] = useState({
    name: "",
    link: "",
  });
  const [newContact, setNewContact] = useState({
    address: "",
    email: "",
    PhoneNo: "",
  });

  const [editingQuickLink, setEditingQuickLink] = useState(null);
  const [editingConnectLink, setEditingConnectLink] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const TitleData = await axios.get(`${backendUrl}/title`);
    setTitleData(TitleData.data);

    const QuickLinkData = await axios.get(`${backendUrl}/links`);
    setQuickLink(QuickLinkData.data);

    const ConnectLinkData = await axios.get(`${backendUrl}/connect-links`);
    setConnectLink(ConnectLinkData.data);

    const ContactData = await axios.get(`${backendUrl}/contact`);
    setContactData(ContactData.data);
  };

  const handleSubmitLogo = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (newLogo.image) {
      formData.append("image", newLogo.image);
    }

    if (logo) {
      await axios.put(`${backendUrl}/logo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      await axios.post(`${backendUrl}/logo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    setNewLogo({ image: "" });
    fetchData();
  };

  const handleDeleteLogo = async () => {
    await axios.delete(`${backendUrl}/logo`);
    setLogo(null);
    fetchData();
  };

  const handleSubmitTitle = async (e) => {
    e.preventDefault();
    if (titleData.length > 0) {
      await axios.put(`${backendUrl}/title/${titleData[0]._id}`, newTitle);
    } else {
      await axios.post(`${backendUrl}/title`, newTitle);
    }
    setNewTitle({ title1: "", title2: "" });
    fetchData();
  };

  const handleDeleteTitle = async () => {
    await axios.delete(`${backendUrl}/title/${titleData[0]._id}`);
    setTitleData(null);
    fetchData();
  };

  const handleSubmitQuickLink = async (e) => {
    e.preventDefault();
    if (editingQuickLink) {
      await axios.put(
        `${backendUrl}/links/${editingQuickLink._id}`,
        newQuickLink
      );
      setEditingQuickLink(null);
    } else {
      await axios.post(`${backendUrl}/links`, newQuickLink);
    }
    setNewQuickLink({ name: "", link: "" });
    fetchData();
  };

  const handleEditQuickLink = (QuickLink) => {
    setEditingQuickLink(QuickLink);
    setNewQuickLink(QuickLink);
  };

  const handleDeleteQuickLink = async (id) => {
    await axios.delete(`${backendUrl}/links/${id}`);
    fetchData();
  };

  const handleSubmitConnectLink = async (e) => {
    e.preventDefault();
    if (editingConnectLink) {
      await axios.put(
        `${backendUrl}/connect-links/${editingConnectLink._id}`,
        newConnectLink
      );
      setEditingConnectLink(null);
    } else {
      await axios.post(`${backendUrl}/connect-links`, newConnectLink);
    }
    setNewConnectLink({ name: "", link: "" });
    fetchData();
  };

  const handleEditConnectLink = (ConnectLink) => {
    setEditingConnectLink(ConnectLink);
    setNewConnectLink(ConnectLink);
  };

  const handleDeleteConnectLink = async (id) => {
    await axios.delete(`${backendUrl}/connect-links/${id}`);
    fetchData();
  };

  const handleSubmitContact = async (e) => {
    e.preventDefault();
    if (contactData.length > 0) {
      await axios.put(
        `${backendUrl}/contact/${contactData[0]._id}`,
        newContact
      );
    } else {
      await axios.post(`${backendUrl}/contact`, newContact);
    }
    setNewContact({ adresss: "", email: "", PhoneNo: "" });
    fetchData();
  };

  const handleDeleteContact = async () => {
    await axios.delete(`${backendUrl}/contact/${contactData[0]._id}`);
    setContactData(null);
    fetchData();
  };

  return (
    <div className="pt-10">
      {/* Title */}
      <div className="p-4 border rounded shadow">
        <h3 className="text-xl">Hero</h3>
        <form onSubmit={handleSubmitTitle} className="mt-2">
          <input
            type="text"
            placeholder="Title1"
            value={newTitle.title1}
            onChange={(e) =>
              setNewTitle({ ...newTitle, title1: e.target.value })
            }
            required
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Title2"
            value={newTitle.title2}
            onChange={(e) =>
              setNewTitle({ ...newTitle, title2: e.target.value })
            }
            required
            className="border p-2 w-full mt-2"
          />
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded mt-2"
          >
            {titleData && titleData.length > 0 ? "Update Title" : "Add Title"}
          </button>
          {titleData && titleData.length > 0 && (
            <button
              onClick={handleDeleteTitle}
              className="bg-red-500 text-white py-1 px-2 rounded mt-2 ml-2"
            >
              Delete Title
            </button>
          )}
        </form>
        {titleData && titleData.length > 0 && (
          <div className="mt-2">
            <h4 className="font-semibold">{titleData[0].title1}</h4>
            <p>{titleData[0].title2}</p>
            <button
              onClick={() =>
                setNewTitle({
                  title1: titleData[0].title1,
                  title2: titleData[0].title2,
                })
              }
              className="bg-blue-500 text-white py-1 px-2 rounded mt-2"
            >
              Edit Title
            </button>
          </div>
        )}
      </div>
      {/* quick links */}

      <div className="p-4 border rounded shadow">
        <h3 className="text-xl">Quick Links</h3>
        <form onSubmit={handleSubmitQuickLink} className="mt-2">
          <input
            type="text"
            placeholder="Name"
            value={newQuickLink.name}
            onChange={(e) =>
              setNewQuickLink({ ...newQuickLink, name: e.target.value })
            }
            required
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Link"
            value={newQuickLink.link}
            onChange={(e) =>
              setNewQuickLink({ ...newQuickLink, link: e.target.value })
            }
            required
            className="border p-2 w-full mt-2"
          />
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded mt-2"
          >
            {editingQuickLink ? "Update QuickLink" : "Add QuickLink"}
          </button>
        </form>
        <ul className="mt-2">
          {quickLink.map((t) => (
            <li key={t._id} className="flex justify-between items-center">
              {t.name} - {t.link}
              <div>
                <button
                  onClick={() => handleEditQuickLink(t)}
                  className="bg-blue-500 text-white py-1 px-2 rounded ml-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteQuickLink(t._id)}
                  className="bg-red-500 text-white py-1 px-2 rounded ml-2"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* connect Link */}
      <div className="p-4 border rounded shadow">
        <h3 className="text-xl">Connect Links</h3>
        <form onSubmit={handleSubmitConnectLink} className="mt-2">
          <input
            type="text"
            placeholder="Name"
            value={newConnectLink.name}
            onChange={(e) =>
              setNewConnectLink({ ...newConnectLink, name: e.target.value })
            }
            required
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Link"
            value={newConnectLink.link}
            onChange={(e) =>
              setNewConnectLink({ ...newConnectLink, link: e.target.value })
            }
            required
            className="border p-2 w-full mt-2"
          />
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded mt-2"
          >
            {editingConnectLink ? "Update ConnectLink" : "Add ConnectLink"}
          </button>
        </form>
        <ul className="mt-2">
          {connectLink.map((t) => (
            <li key={t._id} className="flex justify-between items-center">
              {t.name} - {t.link}
              <div>
                <button
                  onClick={() => handleEditConnectLink(t)}
                  className="bg-blue-500 text-white py-1 px-2 rounded ml-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteConnectLink(t._id)}
                  className="bg-red-500 text-white py-1 px-2 rounded ml-2"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Contact */}
      <div className="p-4 border rounded shadow">
        <h3 className="text-xl">Contact</h3>
        <form onSubmit={handleSubmitContact} className="mt-2">
          <input
            type="text"
            placeholder="Address"
            value={newContact.address}
            onChange={(e) =>
              setNewContact({ ...newContact, address: e.target.value })
            }
            required
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Email"
            value={newContact.email}
            onChange={(e) =>
              setNewContact({ ...newContact, email: e.target.value })
            }
            required
            className="border p-2 w-full mt-2"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={newContact.PhoneNo}
            onChange={(e) =>
              setNewContact({ ...newContact, PhoneNo: e.target.value })
            }
            required
            className="border p-2 w-full mt-2"
          />
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded mt-2"
          >
            {contactData && contactData.length > 0
              ? "Update Contact"
              : "Add Contact"}
          </button>
          {contactData && contactData.length > 0 && (
            <button
              onClick={handleDeleteContact}
              className="bg-red-500 text-white py-1 px-2 rounded mt-2 ml-2"
            >
              Delete Contact
            </button>
          )}
        </form>
        {contactData && contactData.length > 0 && (
          <div className="mt-2">
            <p>{contactData[0].address}</p>
            <p>{contactData[0].email}</p>
            <p>{contactData[0].PhoneNo}</p>
            <button
              onClick={() =>
                setNewContact({
                  address: contactData[0].address,
                  email: contactData[0].email,
                  PhoneNo: contactData[0].PhoneNo,
                })
              }
              className="bg-blue-500 text-white py-1 px-2 rounded mt-2"
            >
              Edit Contact
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;
