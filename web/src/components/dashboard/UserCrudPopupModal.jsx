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
	const handleSubmit = event => {
		event.preventDefault(); // Prevent form submission and page refresh
		axios
			.get(
				import.meta.env.VITE_API_URL + `/upgrade`,
				{
					headers: {
						Accept: "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						"Content-Type": "application/json",
					},
				}
			)
			.then(response => {
				if (response.status === 200) {
					alert("Successfully upgraded!");
				}
			})
			.catch(error => {
				alert("Failed to fetch password! Reason: " + error.response.data.error);
				console.error(error);
			});
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
					<>
						<div className="flex flex-row h-full w-full" >
							<div className={"flex border-r border-black border-opacity-20 p-5 flex-col w-1/4 h-full"}>
								<button onClick={() => handleTabChange("upgrade")} className={`w-full h-14 bg-blue-600 rounded-md text-white ${
									activeTab === "upgrade" ? "bg-opacity-60" : "text-gray-500"
								}`}>Upgrade</button>
								<button onClick={() => handleTabChange("email")} className={`w-full h-14 bg-blue-600 mt-5 rounded-md text-white ${
									activeTab === "email" ? "bg-opacity-60" : "text-gray-500"
								}`}>Delete</button>
								<button onClick={handleOverlayClick} className={"w-full h-14 bg-blue-600 rounded-md text-white mt-auto"}>Exit</button>
							</div>
							<div className={"flex flex-col p-5 w-full h-full overflow-y-auto"}>
								{activeTab === "upgrade" && (
									<>
										<form onSubmit={handleSubmit}>
											<input
												type="text"
												id="iban"
												name="iban"
												className="border border-gray-300 rounded-md p-2 mb-4"
												placeholder="IBAN"
												required
											/>
											<br/>

											<input
												type="text"
												id="address"
												name="address"
												className="border border-gray-300 rounded-md p-2 mb-4"
												placeholder="address"
												required
											/>
											<br/>
											<input
												type="tel"
												id="phone_number"
												name="phone_number"
												className="border border-gray-300 rounded-md p-2 mb-4"
												placeholder="nummer"
												required
											/>
											<br/>

											<button
												onSubmit={handleSubmit}
												type="submit"
												className="bg-green-600 hover:bg-blue-600 text-white rounded-md py-2 px-4"
											>
												Upgrade!
											</button>
										</form>
									</>
								)}
							</div>
						</div>
					</>

				<button onClick={onClose} className="absolute top-4 right-4">
					<X />
				</button>
			</div>
		</div>
	);
};

export default Modal;
