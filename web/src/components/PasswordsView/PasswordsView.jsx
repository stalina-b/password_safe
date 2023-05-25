import React, { useState, useEffect } from "react";
import axios from "axios";
import PasswordItem from "./PasswordItem.jsx";

function Passwords() {
  const [passwords, setPasswords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/passwords", {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer 3|orSLXhlR61KjVL1KQwMnUD2vIhFWLKWobvLRCgEy",
            "Content-Type": "application/json",
          },
        });
        setPasswords(response.data.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPasswords();
  }, []);

  return (
      <div className="row-span-9 col-span-12 bg-white rounded-lg shadow-2xl bg-opacity-20 backdrop-filter backdrop-blur-sm">
        <div className="flex flex-row h-full w-full">
          <div className={"w-1/2 px-4 h-full"}>
            {passwords.map((password) => (
                <div key={password.id} className={"mt-5"}><PasswordItem key={password.id} text={password.title} isLoading={isLoading} /></div>
            ))}
          </div>
          <div className={"w-full h-full border-black border-2"}></div>
        </div>
      </div>
  );
}

export default Passwords;
