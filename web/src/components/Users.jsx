import React, { useState, useEffect } from "react";
import axios from "axios";
function Users() {
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
    <div className="container mt-5">
      <h2 className="mb-4">React Read Dynamic List Values Example</h2>
      {userData.map((item) => {
        return (
          <li className="card p-3 mb-2" key={item.id}>
            <div className="card-body">
              <p className="card-text">{item.username}</p>
            </div>
          </li>
        );
      })}
    </div>
  );
}

export default Users;