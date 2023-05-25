import { Copy, Eye, EyeSlash } from "@phosphor-icons/react";
import React, { useState } from "react";

function PasswordInspect({ Loading, password }) {
	console.log(password);
	const [showPassword, setShowPassword] = useState(false);

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
						<p className={"text-5xl text-white drop-shadow-md"}>{password.title}</p>
						<input
							type={"text"}
							className={
								"mt-16 relative drop-shadow-md flex placeholder-white bg-transparent items-center justify-end w-1/3 h-12 px-4 py-2 text-white bg-none rounded-lg border border-white border-opacity-25 backdrop-filter focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-25"
							}
							placeholder={"Username"}
						></input>
						<div className={"flex mt-4 w-1/2 drop-shadow-md align justify-between"}>
							<input
								type={"text"}
								className={
									"placeholder-white bg-transparent items-center w-2/3 h-12 px-4 py-2 text-white bg-none rounded-lg border border-white border-opacity-25 backdrop-filter focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-25"
								}
								placeholder={"•••••••••••••••••••••••••"}
							></input>
							<div className="my-auto flex flex-row">
								<Copy className="mr-5 cursor-pointer" color="#FFFFFF" size={32} />
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
										onClick={() => setShowPassword(true)}
									/>
								)}
							</div>
						</div>
						<p className={"text-white mt-4 mb-2 drop-shadow-md text-2xl "}>Notes</p>
						<textarea
							className={
								"relative drop-shadow-md p-5 placeholder-white bg-transparent w-full h-64 text-white bg-none rounded-lg border border-white border-opacity-25 backdrop-filter focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-25"
							}
							placeholder={
								"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta dignissim mauris, ac commodo libero gravida quis. Maecenas efficitur iaculis mauris, quis bibendum sapien laoreet et. Mauris pharetra ipsum ut libero sagittis, commodo varius magna ultricies. Duis dignissim neque nec sem suscipit, vel eleifend nisi vestibulum. Nulla facilisi. Vivamus efficitur rutrum ante in molestie. Pellentesque quis turpis tortor. Praesent eget mauris turpis. Proin luctus orci ut blandit tincidunt. Curabitur vulputate libero vitae purus auctor ultricies. Integer egestas vehicula vestibulum. In vel arcu at leo fermentum porttitor eu vel odio."
							}
						></textarea>
						<div className={"flex flex-row mt-16 justify-end"}>
							<button className={"bg-white text-black px-4 py-2 rounded-lg"}>Cancel</button>
							<button className={"bg-white text-black px-4 py-2 rounded-lg ml-4"}>Save</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default PasswordInspect;
