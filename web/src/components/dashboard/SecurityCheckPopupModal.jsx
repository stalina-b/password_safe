import React, { useState } from "react";
import axios from "axios";
import {PencilSimple, X} from "@phosphor-icons/react";

const Modal = ({ onClose }) => {
	const [masterPassword, setMasterPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [responseData, setResponseData] = useState(null);
	const [activeTab, setActiveTab] = useState("password");
	const [display, setDisplay] = useState("block");

	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/security/check`,
				{
					master_password: btoa(masterPassword), // Base64 encode the master password
				},
				{
					headers: {
						Accept: "application/json",
						Authorization: "Bearer " + localStorage.getItem("token"),
						"Content-Type": "application/json",
					},
				}
			);

			setResponseData(response.data);
			setDisplay("hidden");
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleTabChange = (tab) => {
		setActiveTab(tab);
	};

	return (
		<div
			onClick={handleOverlayClick}
			className="fixed cursor-pointer top-0 left-0 z-50 bg-black bg-opacity-30 w-full h-full flex items-center justify-center"
		>
			<div className={"bg-white w-1/2 h-1/2 flex cursor-auto rounded-md"}>
				<form className={`my-auto ${display} mx-auto`} onSubmit={handleSubmit}>
					{!responseData && (
						<div>
							<input
								type="password"
								value={masterPassword}
								onChange={(e) => setMasterPassword(e.target.value)}
								placeholder="Enter master password"
								className="rounded-md border-black border mb-4 p-2"
							/>
							<button type="submit" disabled={loading} className="bg-blue-500 text-white ml-4 rounded-md p-2">
								{loading ? "Loading..." : "Check!"}
							</button>
						</div>
					)}
				</form>
				{responseData && (
					<>
						<div className="flex flex-row h-full w-full" >
							<div className={"flex border-r border-black border-opacity-20 p-5 flex-col w-1/4 h-full"}>
								<button onClick={() => handleTabChange("password")} className={`w-full h-14 bg-blue-600 rounded-md text-white ${
									activeTab === "password" ? "bg-opacity-60" : "text-gray-500"
								}`}>Passwords</button>
								<button onClick={() => handleTabChange("email")} className={`w-full h-14 bg-blue-600 mt-5 rounded-md text-white ${
									activeTab === "email" ? "bg-opacity-60" : "text-gray-500"
								}`}>Email breaches</button>
								<button onClick={handleOverlayClick} className={"w-full h-14 bg-blue-600 rounded-md text-white mt-auto"}>Exit</button>
							</div>
							<div className={"flex flex-col p-5 w-full h-full overflow-y-auto"}>
								{activeTab === "password" && (
									<>
										{responseData &&
											responseData.passwords.map((password) => (
												<>
													<div className={"w-full mb-5 text-white justify-between h-14 bg-red-500 p-5 rounded-md flex items-center"}>
														<p className={"text-xl"}>{password.password}</p>
														<p className={"text-xl"}>Score: {password.score}</p>
														<PencilSimple className={"cursor-pointer"} onClick={handleOverlayClick} color={"#FFFFFF"} size={32} />
													</div>
												</>
											))}
									</>
								)}
								{activeTab === "email" && (
									<>
										{responseData &&
											responseData.hbip.map((breach) => (
												<>
													<div className={"w-full mb-5 text-white justify-between h-14 bg-red-500 p-5 rounded-md flex items-center"}>
														<p className={"text-xl"}>{breach.Name}</p>
													</div>
												</>
											))}
									</>
								)}
							</div>
						</div>
					</>
				)}

				<button onClick={onClose} className="absolute top-4 right-4">
					<X />
				</button>
			</div>
		</div>
	);
};

export default Modal;
