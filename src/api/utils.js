import axios from "axios";

// Function to upload image using imgbb
export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );
  return data.data.display_url; // Returns the uploaded image URL
};

// Function to save or update user
export const saveUser = async (user, isNewUser = false) => {// Check user data

  try {
    if (isNewUser) {
      await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
        name: user?.displayName,
        image: user?.photoURL,
        email: user?.email,
      });
    } else {
      await axios.put(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
        name: user?.displayName,
        image: user?.photoURL,
        email: user?.email,
      });
    }
  } catch (error) {
    console.error("Error in saving user:", error);
    throw error;
  }
};


// Function to handle saving user after login or sign-up
export const handleSaveUserAfterLogin = async (auth) => {
  const user = auth.currentUser; // Get the logged-in user
  if (user) {
    console.log("Saving user data...");
    await saveUser(
      {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      },
      true // Pass true for POST when logging in for the first time
    );
  } else {
    console.warn("No user is logged in. Please check your authentication.");
  }
};

// Function to handle profile update
export const handleProfileUpdate = async (updatedUserData) => {
  console.log("Updating user profile...");
  await saveUser(updatedUserData); // No need to pass `isNewUser` for PUT
};
