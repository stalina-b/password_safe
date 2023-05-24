import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const Searchbar = ()  => {

  return (
    <div className="w-4/5 h-[10%] right-0 top-0 flex absolute bg-background">
        <div className="flex space-x-1 mt-3">
            <input type="text" className="block w-full h-4/6 ps-4 ms-3 bg-white border rounded-full focus:border-primary focus:ring-primary focus:outline-none focus:ring" placeholder="Search..."/>
            <button className="px-3 h-4/6 text-white bg-primary rounded-full "><FontAwesomeIcon icon={faSearch} /></button>
        </div>
        <div>
            <button className="text-white absolute right-0 rounded-lg bg-primary pt-1 pb-2 px-3 m-3 text-l hover:outline-secondary" >New item</button>
        </div>
    </div>
  );
}

export default Searchbar;
