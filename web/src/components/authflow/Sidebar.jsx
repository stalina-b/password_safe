import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
  return (
    <div className="h-screen flex-col justify-center w-1/5 bg-background">
      <div className='h-5/6'>
        <div className="mb-9">
          <h1 className="text-white text-3xl p-5">Hello, Alina</h1>
        </div>
        <div className="mt-9 flex flex-col justify-center items-center">
          <div><button className="text-background rounded-lg mb-5 w-56 bg-primary p-3 text-xl hover:outline-secondary hover:outline">12345678</button></div>
          <div><button className="text-background rounded-lg mb-5 w-56 bg-primary p-3 text-xl hover:outline-secondary hover:outline">123456789123456789</button></div>
          <div><button className="text-background rounded-lg mb-5 w-56 bg-primary p-3 text-xl hover:outline-secondary hover:outline">123456789123456789</button></div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div>
            <button className="text-white text-l hover:text-secondary">Edit caterogies</button>
          </div>
        </div>
      </div>
      <div className='h-1/6 flex justify-between'>
        <div>
          <button className="text-white text-2xl hover:text-error ms-4 mt-16 ">Log-out</button>
        </div>
        <div className='mt-16 me-4'>
          <button className=' hover:text-succes'><FontAwesomeIcon icon={faGear} size="2xl" style={{color: "white",}} /></button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
