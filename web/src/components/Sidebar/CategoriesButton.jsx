import { Transition } from '@headlessui/react';

const GlassmorphicButton = ({text, isLoading }) => {

	return (
		<button
			className="relative flex items-center justify-center w-48 mx-auto h-12 px-4 py-2 text-black bg-white rounded-lg border border-white border-opacity-25 backdrop-filter focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-25"
			disabled={isLoading}
		>
			{!isLoading && text && (
				<span className="absolute inset-0 flex items-center text-xl text-black text-opacity-70 justify-center">
          {text}
        </span>
			)}
			<span className="absolute opacity-0 inset-0 flex justify-center items-center">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse mx-1"></span>
        <span className="w-2 h-2 bg-white rounded-full animate-pulse mx-1"></span>
        <span className="w-2 h-2 bg-white rounded-full animate-pulse mx-1"></span>
      </span>
			<Transition
				show={isLoading}
				enter="transition-opacity duration-200"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div className="absolute inset-0 rounded-lg bg-blue-200 bg-opacity-40 backdrop-filter backdrop-blur-lg flex items-center justify-center">
					<span className="w-2 h-2 bg-white rounded-full animate-spin mx-1"></span>
					<span className="w-2 h-2 bg-white rounded-full animate-spin mx-1"></span>
					<span className="w-2 h-2 bg-white rounded-full animate-spin mx-1"></span>
				</div>
			</Transition>
		</button>
	);
};

export default GlassmorphicButton;
