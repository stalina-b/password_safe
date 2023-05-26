import React, { useEffect, useState } from "react";
import axios from "axios";
import { FloppyDisk, PencilSimple, Trash, X } from "@phosphor-icons/react";

const Modal = ({ onClose }) => {
	const [masterPassword, setMasterPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [responseData, setResponseData] = useState(null);
	const [activeTab, setActiveTab] = useState("password");
	const [display, setDisplay] = useState("block");
	const [newCategory, setNewCategory] = useState("");
	const [editCategoryId, setEditCategoryId] = useState(null);

	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
			window.location.reload();
		}
	};

	useEffect(() => {
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
				setResponseData(response.data.categories);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};

		fetchCategories();
	}, []);

	const handleTabChange = (tab) => {
		setActiveTab(tab);
	};

	const handleAddCategory = async () => {
		try {
			const response = await axios.post(
				import.meta.env.VITE_API_URL + "/categories",
				{ name: newCategory },
				{
					headers: {
						Accept: "application/json",
						Authorization: "Bearer " + localStorage.getItem("token"),
						"Content-Type": "application/json",
					},
				}
			);
			setResponseData((prevData) => [...prevData, response.data.category]);
			setNewCategory("");
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteCategory = async (categoryId) => {
		try {
			await axios.delete(
				import.meta.env.VITE_API_URL + `/categories/${categoryId}`,
				{
					headers: {
						Accept: "application/json",
						Authorization: "Bearer " + localStorage.getItem("token"),
						"Content-Type": "application/json",
					},
				}
			);
			setResponseData((prevData) =>
				prevData.filter((category) => category.id !== categoryId)
			);
		} catch (error) {
			console.log(error);
		}
	};

	const handleEditCategory = async (categoryId, newName) => {
		try {
			const response = await axios.put(
				import.meta.env.VITE_API_URL + `/categories/${categoryId}`,
				{name: newName },
				{
					headers: {
						Accept: "application/json",
						Authorization: "Bearer " + localStorage.getItem("token"),
						"Content-Type": "application/json",
					},
				}
			);
			setResponseData((prevData) =>
				prevData.map((category) => {
					if (category.id === categoryId) {
						return { ...category, name: response.data.category.name };
					}
					return category;
				})
			);
			setEditCategoryId(null); // Reset editCategoryId after successful update
			setNewCategory(""); // Clear the newCategory input field
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div
			onClick={handleOverlayClick}
			className="fixed cursor-pointer top-0 left-0 z-50 bg-black bg-opacity-30 w-full h-full flex items-center justify-center"
		>
			<div className={"bg-white w-1/2 h-1/2 flex cursor-auto rounded-md"}>
				{responseData && (
					<>
						<div className="flex flex-row h-full w-full">
							<div className={"flex border-r border-black border-opacity-20 p-5 flex-col w-1/4 h-full"}>
								<button className={`w-full h-14 bg-blue-600 rounded-md text-white`}>Categories</button>
								<button onClick={handleOverlayClick} className={"w-full h-14 bg-blue-600 rounded-md text-white mt-auto"}>Exit</button>
							</div>
							<div className={"flex flex-col p-5 w-full h-full overflow-y-auto"}>
								<div className={"flex-row mb-10 justify-between h-14 bg-blue-600 p-5 rounded-md flex items-center"}>
									{!editCategoryId ? (
										<>
											<input
												placeholder={"New category"}
												className={"bg-blue-600 text-white w-1/2"}
												type={"text"}
												value={newCategory}
												onChange={(e) => setNewCategory(e.target.value)}
											></input>
											<button
												onClick={handleAddCategory}
												className={"flex items-center justify-center w-12 h-12 rounded-md ml-4"}
											>
												<FloppyDisk size={32} color={"#FFFFFF"}></FloppyDisk>
											</button>
										</>
									) : (
										<>
											<input
												placeholder={"Edit category"}
												className={"bg-blue-600 text-white w-1/2"}
												type={"text"}
												value={newCategory}
												onChange={(e) => setNewCategory(e.target.value)}
											></input>
											<button
												onClick={() => handleEditCategory(editCategoryId, newCategory)}
												className={"flex items-center justify-center w-12 h-12 rounded-md ml-4"}
											>
												<FloppyDisk size={32} color={"#FFFFFF"}></FloppyDisk>
											</button>
										</>
									)}
								</div>
								{responseData.map((category) => (
									<div
										key={category.id}
										className={"w-full mb-5 text-white justify-between h-14 bg-blue-600 p-5 rounded-md flex items-center"}
									>
										{!editCategoryId || editCategoryId !== category.id ? (
											<>
												<p className={"text-xl"}>{category.name}</p>
												<div className={"flex flex-row"}>
													<button
														onClick={() => {
															setEditCategoryId(category.id);
															setNewCategory(category.name);
														}}
														className={"flex items-center justify-center mr-4 w-8 h-8 rounded-md"}
													>
														<PencilSimple color={"#FFFFFF"} size={32} />
													</button>
													<button
														onClick={() => handleDeleteCategory(category.id)}
														className={"flex items-center justify-center w-8 h-8 rounded-md"}
													>
														<Trash color={"#FFFFFF"} size={32} />
													</button>
												</div>
											</>
										) : (
											<>
												<input
													placeholder={"Edit category"}
													className={"bg-blue-600 text-white w-1/2"}
													type={"text"}
													value={newCategory}
													onChange={(e) => setNewCategory(e.target.value)}
												></input>
												<button
													onClick={() => handleEditCategory(editCategoryId, newCategory)}
													className={"flex items-center justify-center w-8 h-8 rounded-md ml-4"}
												>
													<FloppyDisk size={32} color={"#FFFFFF"}></FloppyDisk>
												</button>
											</>
										)}
									</div>
								))}
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
