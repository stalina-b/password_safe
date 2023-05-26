import {Copy, Eye, EyeSlash, Shuffle} from "@phosphor-icons/react";
import MasterPasswordPopupModal from "../dashboard/MasterPasswordPopupModal.jsx";
import GlassmorphicButton from "../Sidebar/CategoriesButton.jsx";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
function generateSecurePassword(length) {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
	let password = "";

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		password += characters.charAt(randomIndex);
	}
	// make sure that the password contains a special character and a number
	if (!password.match(/\d/) || !password.match(/[!@#$%^&*()]/)) {
		return generateSecurePassword(length);
	}
	return password;
}


function PasswordInspect({ setIsnewItem, Loading, password, isNewItem, categories }) {
	console.log(password);
	const [showPassword, setShowPassword] = useState(false);
	const [updatedPassword, setUpdatedPassword] = useState({});
	const [securityModal, setSecurityModal] = useState(false);
	const [revealedPassword, setRevealedPassword] = useState("");
	const [generatedPassword, setGeneratedPassword] = useState("");

	const generatePassword = () => {
		const generatedPassword = generateSecurePassword(15); // Change the length as per your requirements
		setGeneratedPassword(generatedPassword);
		handleChange("password", generatedPassword);
	};

	// check if password is new empty object if so fill with dummy data
	// if not empty object then fill with password data

	useEffect(() => {
		return () => {
			password = {
				id: 0,
				title: "",
				username: "",
				note: "",
				category_id: null,
			};
		};
	}, [password]);



	useEffect(() => {
		setRevealedPassword("");
	}, [password]);

	useEffect(() => {
		if (isNewItem) {
			setUpdatedPassword({
				password: "",
				title: "",
				master_password: "",
				username: "",
				note: "",
				category_id: null,
			});
		}
	}, [isNewItem]);

	const closeModal = () => {
		setSecurityModal(false);
	};

	const handleMasterPasswordSaveSubmit = (password) => {
		const encodedPassword = btoa(password);
		handleSave(encodedPassword);
	};

	const handleMasterPasswordShowSubmit = (password) => {
		const encodedPassword = btoa(password);
		fetchPassword(encodedPassword);
	};

	const handleChange = (field, value) => {
		setUpdatedPassword((prevState) => ({
			...prevState,
			[field]: value,
		}));
	};

	const handleSave = async (encodedPassword) => {
		try {
			let apiUrl = import.meta.env.VITE_API_URL + "/passwords";
			let httpMethod = "POST";

			if (!isNewItem && password) {
				apiUrl += `/${password.id}`;
				httpMethod = "PUT";
			}

			const response = await axios({
				method: httpMethod,
				url: apiUrl,
				data: {
					...updatedPassword,
					master_password: encodedPassword,
				},
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "application/json",
				},
			});

			if (response.status === 200) {
				setUpdatedPassword({});
				setIsnewItem(false);
				window.location.reload();
			}
		} catch (error) {
				alert("Item update failed! Reason: " + error.response.data.message);
			console.error(error);
		}
	};

	const fetchPassword = async (submittedMasterPassword) => {
		try {
			const response = await axios.get(
				import.meta.env.VITE_API_URL + `/passwords/${
					password && password.id
				}?master_password=${submittedMasterPassword}`,
				{
					headers: {
						Accept: "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						"Content-Type": "application/json",
					},
				}
			);
			if (response.status === 200) {
				setRevealedPassword(response.data.data.password);
			}
		} catch (error) {
			alert("Failed to fetch password! Reason: " + error.response.data.error);
			console.error(error);
		}
	};

	const deletePassword = async (password) => {
		try {
			const response = await axios.delete(
				import.meta.env.VITE_API_URL + `/passwords/${password}`,
				{
					headers: {
						Accept: "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						"Content-Type": "application/json",
					},
				}
			);
			if (response.status === 200) {
				window.location.reload();
			}
		} catch (error) {
			alert("Failed to delete password! Reason: " + error.response.data.error);
			console.error(error);
		}
	};

	const generateRandomPassword = () => {
		// Generate a random password here
		const password = "generated_password"; // Replace with the generated password
		setGeneratedPassword(password);
		handleChange("password", password);
	};

	const copyToClipboard = () => {
		const tempInput = document.createElement("input");
		tempInput.value = revealedPassword;
		document.body.appendChild(tempInput);
		tempInput.select();
		document.execCommand("copy");
		document.body.removeChild(tempInput);
		alert("Password copied to clipboard!");
	};

	if (!password) {
		return <div>No passwords found.</div>;
	}


	return (
		<>
			{Loading && (
				<div className="flex justify-center mt-4">
					<div className="animate-bounce">
						<span className="mr-1">Loading</span>
						<span className="mr-1">.</span>
						<span className="mr-1">.</span>
						<span className="mr-1">.</span>
					</div>
				</div>
			)}
			{!Loading && (
				<div className={"w-full h-full p-16"}>
					<div className={"w-full h-full"}>
						{isNewItem ? (
							<input
								type={"text"}
								className={
									"mt-4 relative drop-shadow-md flex placeholder-white bg-transparent items-center justify-end w-1/3 h-12 px-4 py-2 text-white bg-none rounded-lg border border-white border-opacity-25 backdrop-filter focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-25"
								}
								placeholder={"Enter your title"}
								value={updatedPassword.title || ""}
								onChange={(e) => handleChange("title", e.target.value)}
							/>
						) : (
							<p className={"text-5xl text-white drop-shadow-md"}>
								{password.title}
							</p>
						)}
						<input
							type={"text"}
							className={
								"mt-4 relative drop-shadow-md flex placeholder-white bg-transparent items-center justify-end w-1/3 h-12 px-4 py-2 text-white bg-none rounded-lg border border-white border-opacity-25 backdrop-filter focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-25"
							}
							placeholder={isNewItem ? "Username" : password.username}
							value={updatedPassword.username || ""}
							onChange={(e) => handleChange("username", e.target.value)}
						/>
						<div className={"flex mt-4 w-1/2 drop-shadow-md align"}>
							{isNewItem ? (
								<>
									<input
										type="text"
										value={generatedPassword}
										className="placeholder-white bg-transparent items-center w-2/3 h-12 px-4 py-2 text-white bg-none rounded-lg border border-white border-opacity-25 backdrop-filter focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-25"
										placeholder={"Generate secure password"}
									/>
									<div className="my-auto ml-6 flex flex-row">
										<Shuffle
											className="cursor-pointer"
											color="#FFFFFF"
											size={32}
											onClick={generatePassword}
										/>
									</div>
								</>

							) : (
								<>
									<input
										type={"text"}
										className={
											"placeholder-white bg-transparent items-center w-2/3 h-12 px-4 py-2 text-white bg-none rounded-lg border border-white border-opacity-25 backdrop-filter focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-25"
										}
										placeholder={"•••••••••••••••••••••••••"}
										value={revealedPassword}
									/>
									<div className="my-auto flex flex-row ml-auto">
										<Copy
											className="mr-5 cursor-pointer"
											color="#FFFFFF"
											size={32}
											onClick={copyToClipboard}
										/>
										{showPassword ? (
											<EyeSlash
												className="cursor-pointer drop-shadow-md"
												color="#FFFFFF"
												size={32}
												onClick={() => setShowPassword(false)}
											/>
										) : (
											<Eye
												className="cursor-pointer drop-shadow-md"
												color="#FFFFFF"
												size={32}
												onClick={() => {
													if (securityModal) {
														setSecurityModal(false);
													} else {
														setSecurityModal(true);
													}
												}}
											/>
										)}
									</div>
								</>

							)}

						</div>
						<div className={"mt-5 flex flex-row w-full"}>
							{categories.map((category) => (
								<button key={category.id} onClick={() => handleChange("category_id", category.id)}
										className="w-48 mr-2 h-12 px-4 py-2 text-black bg-white rounded-lg border border-white border-opacity-25 backdrop-filter focus:outline-none focus:bg-blue-600">{category.name}</button>
							))}
						</div>
						<p className={"text-white mt-4 mb-2 drop-shadow-md text-2xl "}>Notes</p>
						<textarea
							className={
								"relative drop-shadow-md p-5 placeholder-white bg-transparent w-full h-48 text-white bg-none rounded-lg border border-white border-opacity-25 backdrop-filter focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-25"
							}
							placeholder={isNewItem ? "Enter your notes" : password.note}
							value={updatedPassword.note || ""}
							onChange={(e) => handleChange("note", e.target.value)}
						/>
						<div className={"flex flex-row mt-16 justify-end"}>
							{!isNewItem && (
								<button
									className={"bg-red-500 mr-5 text-black px-4 py-2 mr-auto rounded-lg"}
									onClick={() => deletePassword(password.id)}
								>
									Delete
								</button>
							)  }
							{isNewItem && (
								<button
									className={"bg-white mr-5 text-black px-4 py-2 rounded-lg"}
									onClick={() => setIsnewItem(false)}
								>
									Cancel
								</button>
							)  }


							<button
								className={"bg-white text-black px-4 py-2 rounded-lg"}
								onClick={() => setSecurityModal(true)}
							>
								Save
							</button>
						</div>
					</div>
				</div>
			)}
			{isNewItem ? (
				<>
					{securityModal && (
						<MasterPasswordPopupModal onClose={closeModal} onSubmit={handleMasterPasswordSaveSubmit} />
					)}
				</>
			): (
				<>
					{securityModal && (
						<MasterPasswordPopupModal onClose={closeModal} onSubmit={handleMasterPasswordShowSubmit} />
					)}
				</>
			)}
		</>
	);
}

export default PasswordInspect;
