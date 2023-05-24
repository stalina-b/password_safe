import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from "react";
import axios from "axios";

function SidebarCategories() {
  const Endpoint = "https://jsonplaceholder.typicode.com/users";
  const [userData, setUserData] = useState([]);
  const getUserData = async () => {
    try {
      const fetchData = await axios.get(Endpoint, {
        headers: {
          authorization: "Bearer JWT Token",
        },
      });
      setUserData(fetchData.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.addEventListener("load", getUserData);
    console.log(userData);
    return () => {
      window.removeEventListener("load", getUserData);
    };
  }, [userData]);

  return (
    <div className="h-screen flex-col justify-center w-1/5 bg-background">
      <div className="h-5/6">
        <div className="mb-9">
          <h1 className="text-white text-3xl p-5">Hello, Alina</h1>
        </div>
        <div className="mt-9 flex flex-col justify-center items-center h-4/5 overflow-auto">
          {userData.map((item) => {
          return (
            <div className="card p-3 mt-2" key={item.id}>
              <button className="text-background rounded-lg w-56 bg-primary p-3 text-xl hover:outline-secondary hover:outline">{item.username}</button>
            </div>
          );
          })}          
        </div>
        <div className="flex flex-col justify-center items-center">
          <div>
            <button className="text-white text-l mt-3 hover:text-secondary">Edit caterogies</button>
          </div>
        </div>
      </div>
      <div className='h-1/6 flex justify-between'>
        <div>
          <button className="text-white text-2xl hover:text-error ms-4 mt-16 ">Log-out</button>
        </div>
        <div className='mt-16 me-4'>
          <button><FontAwesomeIcon icon={faGear} size="2xl" style={{color: "white",}} /></button>
        </div>
      </div>
    </div>
  );
}

export default SidebarCategories;
