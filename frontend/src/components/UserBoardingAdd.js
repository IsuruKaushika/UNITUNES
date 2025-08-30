
// import React, { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";

// const backendUrl = process.env.REACT_APP_BACKEND_URL;

// const UserBoardingAdd = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     Title: "",
//     address: "",
//     contact: "",
//     description: "",
//     Rooms: 1,
//     bathRooms: 1,
//     price: 0,
//     gender: [],
//   });

//   const [images, setImages] = useState([]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         name === "Rooms" || name === "bathRooms" || name === "price"
//           ? Number(value)
//           : value,
//     }));
//   };

//   const handleGender = (label) => {
//     setFormData((prev) => ({
//       ...prev,
//       gender: prev.gender.includes(label)
//         ? prev.gender.filter((g) => g !== label)
//         : [...prev.gender, label],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const userId = localStorage.getItem("userId");
//     if (!userId || userId === "undefined") {
//       toast.error("You must be logged in to add a boarding");
//       setTimeout(() => navigate("/student-login"), 1500);
//       return;
//     }

//     const fd = new FormData();
//     fd.append("owner", userId);
//     fd.append("Title", formData.Title);
//     fd.append("address", formData.address);
//     fd.append("contact", formData.contact);
//     fd.append("description", formData.description);
//     fd.append("Rooms", formData.Rooms);
//     fd.append("bathRooms", formData.bathRooms);
//     fd.append("price", formData.price);
//     fd.append("gender", JSON.stringify(formData.gender));
//     images.forEach((img) => fd.append("images", img));

//     try {
//       const res = await axios.post(`${backendUrl}/api/user-boarding/add`, fd);
//       if (res.data.success) {
//         toast.success("Boarding added successfully!");
//         setTimeout(() => navigate("/my-boardings"), 2000);
//       } else {
//         toast.error(res.data.message || "Something went wrong");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to add boarding");
//     }
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow mt-10">
//       <h2 className="text-2xl font-bold mb-4">Add Your Boarding</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           name="Title"
//           value={formData.Title}
//           onChange={handleChange}
//           placeholder="Title"
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//           placeholder="Address"
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           name="contact"
//           value={formData.contact}
//           onChange={handleChange}
//           placeholder="Contact"
//           className="w-full p-2 border rounded"
//           required
//         />
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           placeholder="Description"
//           className="w-full p-2 border rounded"
//         />

//         {/* Rooms and Bathrooms */}
//         <div className="flex gap-4">
//           <div className="flex flex-col">
//             <label>Rooms</label>
//             <input
//               name="Rooms"
//               type="number"
//               min="1"
//               value={formData.Rooms}
//               onChange={handleChange}
//               className="w-24 p-2 border rounded"
//               required
//             />
//           </div>
//           <div className="flex flex-col">
//             <label>Bathrooms</label>
//             <input
//               name="bathRooms"
//               type="number"
//               min="1"
//               value={formData.bathRooms}
//               onChange={handleChange}
//               className="w-24 p-2 border rounded"
//               required
//             />
//           </div>
//         </div>

//         <input
//           name="price"
//           type="number"
//           value={formData.price}
//           onChange={handleChange}
//           placeholder="Price"
//           className="w-full p-2 border rounded"
//           required
//         />

//         {/* Gender Selection */}
//         <div className="flex gap-4">
//           {["Male", "Female", "Any"].map((g) => (
//             <label key={g} className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={formData.gender.includes(g)}
//                 onChange={() => handleGender(g)}
//               />
//               {g}
//             </label>
//           ))}
//         </div>

//         {/* Images */}
//         <input
//           type="file"
//           multiple
//           onChange={(e) => setImages([...e.target.files])}
//           className="border p-1 rounded"
//         />

//         <button
//           type="submit"
//           className="bg-yellow-500 px-4 py-2 rounded text-white hover:bg-yellow-600"
//         >
//           Submit
//         </button>
//       </form>

//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default UserBoardingAdd;
