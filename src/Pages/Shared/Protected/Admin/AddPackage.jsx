import React, { useState, useEffect } from "react";
import axios from "axios";
import { imageUpload } from "../../../../api/utils";
import UseAuth from "../../../../Hooks/UseAuth";

const AddPackage = () => {
  const [guides, setGuides] = useState([]);
  const [packageData, setPackageData] = useState({
    name: "",
    places: "",
    price: "",
    plans: [],
    guide: "",
    images: [],
  });

  const { user } = UseAuth();
  const baseUrl = "https://travel-sphere-server-nu.vercel.app";

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const { data } = await axios.get(`https://travel-sphere-server-nu.vercel.app/guides`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });

        setGuides(data);
      } catch (error) {
        console.error("Error fetching guides", error);
      }
    };
    fetchGuides();
  }, [baseUrl]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPackageData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle plans
  const handlePlanChange = (index, value) => {
    const updatedPlans = [...packageData.plans];
    updatedPlans[index] = value;
    setPackageData((prev) => ({ ...prev, plans: updatedPlans }));
  };

  const addPlanField = () => {
    setPackageData((prev) => ({ ...prev, plans: [...prev.plans, ""] }));
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    const uploadedUrls = [];
    try {
      for (const file of files) {
        const imageUrl = await imageUpload(file);
        uploadedUrls.push(imageUrl);
      }
      setPackageData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));
    } catch (error) {
      console.error("Error uploading images", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!packageData.guide) {
      alert("Please select a guide for the package.");
      return;
    }
    if (packageData.plans.length === 0) {
      alert("Please add at least one plan detail.");
      return;
    }
    try {
      const response = await axios.post(
        `https://travel-sphere-server-nu.vercel.app/packages`,
        packageData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      alert("Package created successfully!");
      setPackageData({
        name: "",
        places: "",
        price: "",
        plans: [],
        guide: "",
        images: [],
      });
    } catch (error) {
      console.error("Error creating package", error);
      alert("Failed to create the package.");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-500 text-center mb-8">
        Add New Package
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-6 bg-white rounded shadow"
      >
        {/* Package Name */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Package Name</label>
          <input
            type="text"
            name="name"
            value={packageData.name}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
            placeholder="Enter package name"
            required
          />
        </div>

        {/* Places */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Places to Visit</label>
          <input
            type="text"
            name="places"
            value={packageData.places}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
            placeholder="Enter places (comma-separated)"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={packageData.price}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
            placeholder="Enter package price"
            required
          />
        </div>

        {/* Plans */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">
            Plan Details (Day-wise)
          </label>
          {packageData.plans.map((plan, index) => (
            <input
              key={index}
              type="text"
              value={plan}
              onChange={(e) => handlePlanChange(index, e.target.value)}
              className="w-full border rounded p-2 mb-2"
              placeholder={`Day ${index + 1}`}
              required
            />
          ))}
          <button
            type="button"
            onClick={addPlanField}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Day Plan
          </button>
        </div>

        {/* Images */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Upload Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Guide Selection */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Assign Guide</label>
          <select
            name="guide"
            value={packageData.guide}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Select a Guide</option>
            {guides.map((guide) => (
              <option key={guide._id} value={guide._id}>
                {guide.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-6 py-2 bg-green-500 text-white rounded"
        >
          Create Package
        </button>
      </form>
    </div>
  );
};

export default AddPackage;
