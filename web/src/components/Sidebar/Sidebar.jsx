import { useState, useEffect } from 'react';
import GlassmorphicButton from "./CategoriesButton.jsx";
import {SignOut, UserGear} from "@phosphor-icons/react";

function SidebarCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/category', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer 3|orSLXhlR61KjVL1KQwMnUD2vIhFWLKWobvLRCgEy',
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (response.ok) {
          setLoading(false);
          setCategories(data.categories);
        } else {
          console.log('Error:', data.message);
        }
      } catch (error) {
        console.log('Error:', error.message);
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  return (
      <div className="col-span-2 row-span-10 rounded-lg shadow-2xl bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm">
        <div className="flex flex-col h-full w-full">
          <div className="w-full text-center flex justify-center h-32 border-b-white border-opacity-20 border-b-2">
            <p className="font-lato my-auto text-white text-3xl">
              Hoi, <span className="text-fuchsia-600">{localStorage.getItem('name')}</span>
            </p>
          </div>
          <div className="flex flex-col h-full w-full overflow-y-auto">
              {categories.map((category) => (
                  <div className={"mt-5"} key={category.id}>
                    <GlassmorphicButton
                        text={category.name}
                        isLoading={loading}
                    />
                  </div>
              ))}
          </div>
          <div className={"w-full h-16 flex flex-row justify-between"}>
            <div className={"my-auto ml-4"}>
              <SignOut color={"#FFFFFF"} size={32} />
            </div>
            <div className={"my-auto mr-4"}>
              <UserGear color={"#FFFFFF"} size={32} />
            </div>
          </div>
        </div>
      </div>
  );
}

export default SidebarCategories;
