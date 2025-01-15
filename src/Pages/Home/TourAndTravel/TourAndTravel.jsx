import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const TourismAndTravel = () => {
  const axiosSecure = useAxiosSecure();
  const [packages, setPackages] = useState([]);
  const [tourGuides, setTourGuides] = useState([]);

  // Fetch random packages
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axiosSecure.get("/random-packages");
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    // Fetch random tour guides
    const fetchTourGuides = async () => {
      try {
        const response = await axiosSecure.get("/random-guides");
        setTourGuides(response.data);
      } catch (error) {
        console.error("Error fetching tour guides:", error);
      }
    };

    fetchPackages();
    fetchTourGuides();
  }, []);

  return (
    <div className="container mx-auto py-10 px-5">
      <h2 className="text-center text-3xl font-bold py-5">
        Tourism and Travel Guide
      </h2>

      <Tabs>
        <TabList className="flex justify-center space-x-4 mb-8">
          <Tab className="px-6 py-2 cursor-pointer border-2 rounded-lg">
            Our Packages
          </Tab>
          <Tab className="px-6 py-2 cursor-pointer border-2 rounded-lg">
            Meet Our Tour Guides
          </Tab>
        </TabList>

        {/* Our Packages Tab */}
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg._id}
                className="bg-white p-4 rounded-lg shadow-lg flex flex-col justify-between"
              >
                <div>
                  <img
                    src={pkg.images}
                    alt={pkg.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h4 className="text-xl font-semibold">{pkg.title}</h4>
                  <p className="text-gray-600">{pkg.description}</p>
                  <p className="mt-2 text-lg font-bold">${pkg.price}</p>
                  <p className="text-sm text-gray-500">{pkg.duration}</p>
                </div>
                <div>
                  <button
                    onClick={() =>
                      (window.location.href = `/package-details/${pkg._id}`)
                    }
                    className="mt-4 px-6 py-2 bg-[#89DDFE] text-black text-sm font-bold rounded-lg hover:bg-[#45caff] hover:text-white"
                  >
                    View Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>

        {/* Meet Our Tour Guides Tab */}
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tourGuides.map((guide) => (
              <div
                key={guide._id}
                className="bg-white p-4 rounded-lg shadow-lg flex flex-col justify-between"
              >
                <div>
                  <img
                    src={guide.image}
                    alt={guide.name}
                    className="w-full  object-cover rounded-lg mb-4 md:h-[400px] h-[300px]"
                  />
                  <h4 className="text-xl font-semibold">{guide.name}</h4>
                  <p className="text-gray-600">{guide.bio}</p>
                  <p className="mt-2 text-sm text-gray-500">{guide.language}</p>
                </div>
                <div>
                  <button
                    onClick={() =>
                      (window.location.href = `/tour-guide-profile/${guide._id}`)
                    }
                    className="mt-4 px-6 py-2 bg-[#89DDFE] text-black text-sm font-bold rounded-lg hover:bg-[#45caff] hover:text-white"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TourismAndTravel;
