import React, {useState, useEffect} from "react";
import axios from "axios";
import PasswordItem from "./PasswordItem.jsx";
import {Copy, Eye, EyeSlash} from "@phosphor-icons/react";
import PasswordInspect from "./PasswordInspect.jsx";

function Passwords() {
    const [passwords, setPasswords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [selectedPassword, setSelectedPassword] = useState({
        "id": 0,
        "created_at": "2023-05-25T09:24:03.000000Z",
        "updated_at": "2023-05-25T09:24:03.000000Z",
        "user_id": 0,
        "title": "Loading...",
        "username": "Loading...",
        "note": "Loading...",
    });

    useEffect(() => {
        const fetchPasswords = async () => {
            try {
                const response = await axios.get(
                    import.meta.env.VITE_API_URL + "/passwords",
                    {
                        headers: {
                            Accept: "application/json",
                            Authorization: "Bearer " + localStorage.getItem("token"),
                            "Content-Type": "application/json",
                        },
                    }
                );
                setPasswords(response.data.data.data);
                setSelectedPassword(response.data.data.data[0]);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPasswords();
    }, []);

    const handlePasswordItemClick = (password) => {
        console.log(password)
        setSelectedPassword(password);
    };

    return (
        <div
            className="row-span-9 col-span-12 bg-white rounded-lg shadow-2xl bg-opacity-20 backdrop-filter backdrop-blur-sm">
            <div className="flex flex-row h-full w-full">
                <div className={"w-1/2 px-4 h-full border-r-2 border-opacity-20 border-r-white border-spacing-2"}>
                    {passwords.map((password) => (
                        <div onClick={() => handlePasswordItemClick(password)} key={password.id} className={"mt-5"}>
                            <PasswordItem
                                key={password.id}
                                text={password.title}
                                isLoading={isLoading}
                            />
                        </div>
                    ))}
                </div>
                <PasswordInspect Loading={isLoading} password={selectedPassword}/>
            </div>
        </div>
    );
}

export default Passwords;
