import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import Modal from "./SecurityCheckPopupModal.jsx"; // Import the modal component

import jpg from "../../assets/render.jpg";
import GlassmorphicButton from "../Sidebar/CategoriesButton.jsx";
import { Copy, Eye, EyeSlash, SignOut, UserGear } from "@phosphor-icons/react";
import PasswordItem from "../PasswordsView/PasswordItem.jsx";
import PasswordInspect from "../PasswordsView/PasswordInspect.jsx";
import SecurityCheckPopupModal from "./SecurityCheckPopupModal.jsx";
import MasterPasswordPopupModal from "./MasterPasswordPopupModal.jsx";
import CategoriesCrudPopupModal from "./CategoriesCrudPopupModal.jsx";
import UserCrudPopupModal from "./UserCrudPopupModal.jsx";


const MyContext = createContext();

export const Dashboard = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [passwords, setPasswords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activePassword, setActivePassword] = useState({
        id: 0,
        created_at: "2023-05-25T09:24:03.000000Z",
        updated_at: "2023-05-25T09:24:03.000000Z",
        user_id: 0,
        title: "Loading...",
        username: "Loading...",
        note: "Loading...",
    });
    const [isNewItem, setIsNewItem] = useState(false);
    const [securityModal, setSecurityModal] = useState(false); // State to control the modal
    const [categoryyModal, setCategoryModal] = useState(false); // State to control the modal
    const [userModal, setUserModal] = useState(false); // State to control the modal
    const [searchResults, setSearchResults] = useState([]);


    const toggleNewItem = () => {
        setIsNewItem(!isNewItem);
    }

    useEffect(() => {
        // check local storage for token
        if (!localStorage.getItem("token")) {
            window.location.href = "/login";
        }
        const fetchCategories = async () => {
            try {
                const response = await axios.get(
                    import.meta.env.VITE_API_URL + "/categories",
                    {
                        headers: {
                            Accept: "application/json",
                            Authorization: "Bearer " + localStorage.getItem("token"),
                            "Content-Type": "application/json",
                        },
                    }
                );
                setCategories(response.data.categories);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCategories();
    }, []);

    // logout function
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        window.location.href = "/login";
    }

    const fetchAllPasswords = async () => {
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
            setPasswords(response.data.data);
            setActivePassword(response.data.data[0]);
            setLoading(false);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {


        fetchAllPasswords();
    }, []);

    const fetchPasswordsByCategory = async (categoryID) => {
        try {
            const response = await axios.get(
                import.meta.env.VITE_API_URL + "/categories/" + categoryID,
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: "Bearer " + localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                }
            );
            setPasswords(response.data.category.passwords);
            setIsLoading(false);

        } catch (error) {
            console.log(error);
        }
    };

    const handleCategoryClick = (categoryID) => {
        if (categoryID === "All") {
            return fetchAllPasswords()
        }
        fetchPasswordsByCategory(categoryID);
    };

    const handlePasswordItemClick = (password) => {
        setActivePassword(password);
    };

    const handleSecurityCheckClick = () => {
        setSecurityModal(true); // Open the modal
    };

    const handleUserCheckClick = () => {
        setUserModal(true); // Open the modal
    };

    const closeModal = () => {
        setSecurityModal(false); // Close the modal
        setCategoryModal(false); // Close the modal
        setUserModal(false); // Close the modal
    };
    const handCategoryCheckClick = () => {
        setCategoryModal(true); // Open the modal
    };
    const handleSearch = async (query) => {
        try {
            const response = await axios.get(
                import.meta.env.VITE_API_URL + `/filters?search=${query}`,
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: "Bearer " + localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                }
            );
            setPasswords(response.data.passwords.data);
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <>
            <div className="grid h-screen grid-cols-12 grid-rows-10 grid-flow-col gap-3 p-3 bg-gradient-to-r">
                <div
                    className="background-container"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: `url(${jpg})`,
                        backgroundSize: "cover",
                    }}
                />
                <div
                    className="col-span-2 row-span-10 rounded-lg shadow-2xl bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm"
                >
                    <div className="flex flex-col h-full w-full">
                        <div className="w-full flex flex-col text-center justify-center h-32 border-b-white border-opacity-20 border-b-2">
                            <p className="font-lato my-auto text-white text-3xl">
                                Hoi, <span className="text-fuchsia-600">{localStorage.getItem("name")}</span>
                            </p>
                            <p className="font-lato mb-4 text-white text-xl">
                                <span className="text-white">{localStorage.getItem("role")}</span>
                            </p>
                        </div>
                        <div className="flex flex-col h-full w-full overflow-y-auto">
                            <div onClick={() => handleCategoryClick("All")} className={"mt-5"}>
                                <GlassmorphicButton text={"All"} isLoading={loading} />
                            </div>
                            {categories.map((category) => (
                                <div onClick={() => handleCategoryClick(category.id)} className={"mt-5"} key={category.id}>
                                    <GlassmorphicButton text={category.name} isLoading={loading} />
                                </div>
                            ))}
                        </div>
                        <div className={"w-full h-16 flex flex-row justify-between"}>
                            <div className={"my-auto ml-4"}>
                                <SignOut className={"cursor-pointer"} onClick={logout} color={"#FFFFFF"} size={32} />
                            </div>
                            <div className={"my-auto mr-4"}>
                                <UserGear className={"cursor-pointer"} onClick={handleUserCheckClick} color={"#FFFFFF"} size={32} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row-span-1 col-span-12 flex flex-row justify-between p-4 rounded-lg shadow-2xl bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm">
                    <input
                        placeholder={"Zoeken....."}
                        type={"text"}
                        onChange={(e) => handleSearch(e.target.value)}
                        className={
                            "w-2/4 h-full relative drop-shadow-md flex placeholder-white bg-transparent items-center justify-end px-4 py-2 text-white bg-none rounded-lg border border-white  backdrop-filter focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-25"
                        }
                    />

                    <div className={"w-full h-full flex flex-row justify-end"}>
                        <button
                            onClick={handleSecurityCheckClick} // Handle security check button click
                            className={"bg-white text-black px-4 py-2 rounded-lg ml-4"}
                        >
                            Security check
                        </button>
                        <button onClick={() => toggleNewItem()} className={"bg-white text-black px-4 py-2 rounded-lg ml-4"}>New wachtwoord</button>
                        <button onClick={() => handCategoryCheckClick()} className={"bg-white text-black px-4 py-2 rounded-lg ml-4"}>Edit categories</button>
                    </div>
                </div>
                <div className="row-span-9 col-span-12 bg-white rounded-lg shadow-2xl bg-opacity-20 backdrop-filter backdrop-blur-sm">
                    <div className="flex flex-row h-full w-full">
                        <div className={"w-1/2 px-4 h-full border-r-2 border-opacity-20 border-r-white border-spacing-2"}>
                            {passwords.map((password) => (
                                <div onClick={() => handlePasswordItemClick(password)} key={password.id} className={"mt-5"}>
                                    <PasswordItem key={password.id} text={password.title} isLoading={isLoading} />
                                </div>
                            ))}
                        </div>
                        <PasswordInspect isnewItem={isNewItem} setIsnewItem={setIsNewItem} Loading={loading} password={activePassword} isNewItem={isNewItem} categories={categories} />
                    </div>
                </div>
                {securityModal && (
                    <SecurityCheckPopupModal onClose={closeModal}/>
                )}
                {categoryyModal && (
                    <CategoriesCrudPopupModal onClose={closeModal}/>
                )}
                {userModal && (
                    <UserCrudPopupModal onClose={closeModal}/>
                )}
            </div>
        </>
    );
};
