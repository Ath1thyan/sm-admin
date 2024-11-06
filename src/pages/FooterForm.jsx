import React, { useState, useEffect } from "react";
import axios from "axios";
const backendUrl = "https://api.smeduconsultant.com";

const FooterForm = () => {
    const [footerHero, setFooterHero] = useState(null);
    const [newFooterHero, setNewFooterHero] = useState({ title: "", description: "" });

    const [ContactInfo, setContactInfo] = useState(null);
    const [newContactInfo, setNewContactInfo] = useState({ address: "", email: "", phno: "", });

    const [links, setLinks] = useState([]);
    const [newLinks, setNewLinks] = useState({ name: "", linkAddress: "", });
    const [editingLinks, setEditingLinks] = useState(null);

    const [SMLinks, setSMLinks] = useState([]);
    const [newSMLinks, setNewSMLinks] = useState({ platformName: "", linkAddress: "", });
    const [editingSMLinks, setEditingSMLinks] = useState(null);
  

    const fetchData = async () => {
    try {
        const footerHeroResponse = await axios.get(`${backendUrl}/api/footerHero`);
        const contactInfoResponse = await axios.get(`${backendUrl}/api/contactInfo`);
        const linksResponse = await axios.get(`${backendUrl}/api/links`);
        const SMLinksResponse = await axios.get(`${backendUrl}/api/smlinks`);

        setFooterHero(footerHeroResponse.data);
        setContactInfo(contactInfoResponse.data);
        setLinks(linksResponse.data);
        setSMLinks(SMLinksResponse.data);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmitHero = async (e) => {
    e.preventDefault();
    try {
      if (footerHero) {
        await axios.put(`${backendUrl}/api/footerHero`, newFooterHero);
      } else {
        await axios.post(`${backendUrl}/api/footerHero`, newFooterHero);
      }
      setNewFooterHero({ title: "", description: "" });
      fetchData();
    } catch (error) {
      console.error("Error submitting hero:", error);
    }
  };

  const handleDeleteHero = async () => {
    try {
      await axios.delete(`${backendUrl}/api/footerHero`);
      setFooterHero(null);
      fetchData();
    } catch (error) {
      console.error("Error deleting hero:", error);
    }
  };

  const handleSubmitContactInfo = async (e) => {
    e.preventDefault();
    try {
      if (ContactInfo) {
        await axios.put(`${backendUrl}/api/contactInfo`, newContactInfo);
      } else {
        await axios.post(`${backendUrl}/api/contactInfo`, newContactInfo);
      }
      setNewContactInfo({ address: "", email: "", phno: "", });
      fetchData();
    } catch (error) {
      console.error("Error submitting contact Information:", error);
    }
  };

  const handleDeleteContactInfo = async () => {
    try {
      await axios.delete(`${backendUrl}/api/contactInfo`);
      setContactInfo(null);
      fetchData();
    } catch (error) {
      console.error("Error deleting contact Information:", error);
    }
  };


  const handleSubmitLinks = async (e) => {
    e.preventDefault();
    if (editingLinks) {
        await axios.put(`${backendUrl}/api/links/${editingLinks._id}`, newLinks);
        setEditingLinks(null);
    } else {
        await axios.post(`${backendUrl}/api/links`, newLinks);
    }
    setNewLinks({ name: "", linkAddress: "", });
    fetchData();
};

const handleEditLinks = (links) => {
    setEditingLinks(links);
    setNewLinks(links);
};

const handleDeleteLinks = async (id) => {
    await axios.delete(`${backendUrl}/api/links/${id}`);
    fetchData();
};

const handleSubmitSMLinks = async (e) => {
    e.preventDefault();
    if (editingSMLinks) {
        await axios.put(`${backendUrl}/api/smlinks/${editingSMLinks._id}`, newSMLinks);
        setEditingSMLinks(null);
    } else {
        await axios.post(`${backendUrl}/api/smlinks`, newSMLinks);
    }
    setNewSMLinks({ platformName: "", linkAddress: "", });
    fetchData();
};

const handleEditSMLinks = (SMLinks) => {
    setEditingSMLinks(SMLinks);
    setNewSMLinks(SMLinks);
};

const handleDeleteSMLinks = async (id) => {
    await axios.delete(`${backendUrl}/api/smlinks/${id}`);
    fetchData();
};
  return(
    <div className="p-5">
        <h2 className="text-2xl mb-5">Footer Form</h2>

        {/* Hero Section */}
      <div className="p-4 border rounded shadow mb-5">
        <h3 className="text-xl">Footer Hero</h3>
        <form onSubmit={handleSubmitHero} className="mt-2">
          <input
            type="text"
            placeholder="Footer Hero Title"
            value={newFooterHero.title}
            onChange={(e) => setNewFooterHero({ ...newFooterHero, title: e.target.value })}
            required
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Footer Hero Description"
            value={newFooterHero.description}
            onChange={(e) => setNewFooterHero({ ...newFooterHero, description: e.target.value })}
            required
            className="border p-2 w-full mt-2"
          />
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded mt-4"
          >
            {footerHero ? "Update Footer Hero" : "Add Footer Hero"}
          </button>
          {footerHero && (
            <div className="mt-2">
              <h4 className="font-semibold">{footerHero.title}</h4>
              <p>{footerHero.description}</p>
              <button
                onClick={handleDeleteHero}
                className="bg-red-500 text-white py-1 px-2 rounded mt-2"
              >
                Delete Footer Hero
              </button>
            </div>
          )}
        </form>
      </div>

      {/*Contact Information Section*/}
      <div className="p-4 border rounded shadow mb-5">
        <h3 className="text-xl">Contact Information</h3>
        <form onSubmit={handleSubmitContactInfo} className="mt-2">
          <input
            type="text"
            placeholder="Address"
            value={newContactInfo.address}
            onChange={(e) => setNewContactInfo({ ...newContactInfo, address: e.target.value })}
            required
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="email"
            value={newContactInfo.email}
            onChange={(e) => setNewContactInfo({ ...newContactInfo, email: e.target.value })}
            required
            className="border p-2 w-full mt-2"
          />
          <input
            type="text"
            placeholder="phone number"
            value={newContactInfo.phno}
            onChange={(e) => setNewContactInfo({ ...newContactInfo, phno: e.target.value })}
            required
            className="border p-2 w-full mt-2"
          />
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded mt-4"
          >
            {ContactInfo ? "Update Contact Information" : "Add Contact Information"}
          </button>
          {ContactInfo && (
            <div className="mt-2">
              <h4 className="font-semibold">{ContactInfo.address}</h4>
              <p>{ContactInfo.email}</p>
              <p>{ContactInfo.phno}</p>
              <button
                onClick={handleDeleteContactInfo}
                className="bg-red-500 text-white py-1 px-2 rounded mt-2"
              >
                Delete Contact Information
              </button>
            </div>
          )}
        </form>
      </div>

      {/*Quick Links*/}
      <div className="p-4 border rounded shadow">
                    <h3 className="text-xl">Links</h3>
                    <form onSubmit={handleSubmitLinks} className="mt-2">
                        <input
                            type="text"
                            placeholder="name"
                            value={newLinks.name}
                            onChange={(e) => setNewLinks({ ...newLinks, name: e.target.value })}
                            required
                            className="border p-2 w-full"
                        />
                        
                        <input
                            type="text"
                            placeholder="link"
                            value={newLinks.linkAddress}
                            onChange={(e) => setNewLinks({ ...newLinks, linkAddress: e.target.value })}
                            required
                            className="border p-2 w-full"
                        />
                        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded mt-2">
                            {editingLinks ? 'Update Link' : 'Add Link'}
                        </button>
                    </form>
                    <ul className="mt-2">
                        {links.map(a => (
                            <li key={a._id} className="flex justify-between items-center">
                                {a.name} - {a.linkAddress}
                                <div>
                                    <button onClick={() => handleEditLinks(a)} className="bg-blue-500 text-white py-1 px-2 rounded ml-2">Edit</button>
                                    <button onClick={() => handleDeleteLinks(a._id)} className="bg-red-500 text-white py-1 px-2 rounded ml-2">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>


                {/*Social Media Links*/}
      <div className="p-4 border rounded shadow">
                    <h3 className="text-xl">Social Media Links</h3>
                    <form onSubmit={handleSubmitSMLinks} className="mt-2">
                        <input
                            type="text"
                            placeholder="platform name"
                            value={newSMLinks.platformName}
                            onChange={(e) => setNewSMLinks({ ...newSMLinks, platformName: e.target.value })}
                            required
                            className="border p-2 w-full"
                        />
                        
                        <input
                            type="text"
                            placeholder="link"
                            value={newSMLinks.linkAddress}
                            onChange={(e) => setNewSMLinks({ ...newSMLinks, linkAddress: e.target.value })}
                            required
                            className="border p-2 w-full"
                        />
                        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded mt-2">
                            {editingLinks ? 'Update Social Media Link' : 'Add Social Media Link'}
                        </button>
                    </form>
                    <ul className="mt-2">
                        {SMLinks.map(a => (
                            <li key={a._id} className="flex justify-between items-center">
                                {a.platformName} - {a.linkAddress}
                                <div>
                                    <button onClick={() => handleEditSMLinks(a)} className="bg-blue-500 text-white py-1 px-2 rounded ml-2">Edit</button>
                                    <button onClick={() => handleDeleteSMLinks(a._id)} className="bg-red-500 text-white py-1 px-2 rounded ml-2">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
    </div>
  );
};

export default FooterForm;