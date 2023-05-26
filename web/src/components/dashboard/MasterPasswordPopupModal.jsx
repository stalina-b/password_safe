import {useState} from "react";
import {X} from "@phosphor-icons/react";

const MasterPasswordPopupModal = ({ onClose, onSubmit }) => {
	const [masterPassword, setMasterPassword] = useState("");

	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault(); // Prevent form submission and page refresh
		onSubmit(masterPassword);
		onClose();
	};

	return (
		<div
			onClick={handleOverlayClick}
			className="fixed cursor-pointer top-0 left-0 z-50  w-full h-full flex items-center justify-center"
		>
			<div className={"bg-white w-1/4 h-1/4 flex cursor-auto rounded-md"}>
				<form className={`my-auto  mx-auto`} onSubmit={handleSubmit}>
					<div>
						<input
							type="password"
							value={masterPassword}
							onChange={(e) => setMasterPassword(e.target.value)}
							placeholder="Enter master password"
							className="rounded-md border-black border mb-4 p-2"
						/>
						<button type="submit" className="hidden bg-blue-500 text-white ml-4 rounded-md p-2"></button>
					</div>
				</form>
				<button onClick={onClose} className="absolute top-4 right-4">
					<X />
				</button>
			</div>
		</div>
	);
};

export default MasterPasswordPopupModal;
