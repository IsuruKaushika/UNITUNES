// <<<<<<< HEAD
// // // src/pages/SkillList.js
// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";

// // const backendUrl = import.meta.env.VITE_BACKEND_URL;

// // const SkillList = () => {
// //   const navigate = useNavigate();
// //   const [skills, setSkills] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // Fetch active skills from backend
// //   useEffect(() => {
// //     const fetchSkills = async () => {
// //       try {
// //         const response = await axios.get(`${backendUrl}/api/skill/list-active`);
// //         if (response.data.success) {
// //           setSkills(response.data.skills);
// //         } else {
// //           setSkills([]);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching skills:", error);
// //         setSkills([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchSkills();
// //   }, []);

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-6">
// //       <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
// //         Available Skills
// //       </h2>

// //       {loading ? (
// //         <p className="text-center text-gray-600">Loading skills...</p>
// //       ) : skills.length === 0 ? (
// //         <p className="text-center text-gray-600">No skills available</p>
// //       ) : (
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //           {skills.map((skill) => (
// //             <div
// //               key={skill._id}
// //               onClick={() => navigate(`/skills/${skill._id}`)}
// //               className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-2xl overflow-hidden cursor-pointer border border-gray-100"
// //             >
// //               {/* Skill Image */}
// //               {skill.images && skill.images.length > 0 ? (
// //                 <img
// //                   src={`${backendUrl}/${skill.images[0]}`} // Ensure backend serves images with correct path
// //                   alt={skill.skillType}
// //                   className="w-full h-44 object-cover"
// //                 />
// //               ) : (
// //                 <div className="w-full h-44 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
// //                   No Image Available
// //                 </div>
// //               )}

// //               {/* Skill Info */}
// //               <div className="p-4">
// //                 <h3 className="text-lg font-semibold text-gray-800">
// //                   {skill.skillType}
// //                 </h3>
// //                 <p className="text-sm text-gray-600">{skill.studentName}</p>
// //                 <p className="text-sm text-gray-500 mt-1 line-clamp-2">
// //                   {skill.moreDetails}
// //                 </p>
// //                 <p className="text-sm mt-2">
// //                   <span className="font-medium">Experience:</span>{" "}
// //                   {skill.experience}
// //                 </p>
// //                 <p className="text-sm">
// //                   <span className="font-medium">Location:</span>{" "}
// //                   {skill.location}
// //                 </p>
// //                 <p className="text-sm font-bold text-blue-600 mt-2">
// //                   Rs. {skill.price}
// //                 </p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SkillList;
// =======
// // const SkillList = () => {
// //   const navigate = useNavigate();
// //   const [skills, setSkills] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // Fetch active skills from backend
// //   useEffect(() => {
// //     const fetchSkills = async () => {
// //       try {
// //         const response = await axios.get(`${backendUrl}/api/skill/list-active`);
// //         if (response.data.success) {
// //           setSkills(response.data.skills);
// //         } else {
// //           setSkills([]);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching skills:", error);
// //         setSkills([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchSkills();
// //   }, []);

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-6">
// //       <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
// //         Available Skills
// //       </h2>

// //       {loading ? (
// //         <p className="text-center text-gray-600">Loading skills...</p>
// //       ) : skills.length === 0 ? (
// //         <p className="text-center text-gray-600">No skills available</p>
// //       ) : (
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //           {skills.map((skill) => (
// //             <div
// //               key={skill._id}
// //               onClick={() => navigate(`/skills/${skill._id}`)}
// //               className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-2xl overflow-hidden cursor-pointer border border-gray-100"
// //             >
// //               {/* Skill Image */}
// //               {skill.images && skill.images.length > 0 ? (
// //                 <img
// //                   src={`${backendUrl}/${skill.images[0]}`} // Ensure backend serves images with correct path
// //                   alt={skill.skillType}
// //                   className="w-full h-44 object-cover"
// //                 />
// //               ) : (
// //                 <div className="w-full h-44 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
// //                   No Image Available
// //                 </div>
// //               )}

// //               {/* Skill Info */}
// //               <div className="p-4">
// //                 <h3 className="text-lg font-semibold text-gray-800">
// //                   {skill.skillType}
// //                 </h3>
// //                 <p className="text-sm text-gray-600">{skill.studentName}</p>
// //                 <p className="text-sm text-gray-500 mt-1 line-clamp-2">
// //                   {skill.moreDetails}
// //                 </p>
// //                 <p className="text-sm mt-2">
// //                   <span className="font-medium">Experience:</span>{" "}
// //                   {skill.experience}
// //                 </p>
// //                 <p className="text-sm">
// //                   <span className="font-medium">Location:</span>{" "}
// //                   {skill.location}
// //                 </p>
// //                 <p className="text-sm font-bold text-blue-600 mt-2">
// //                   Rs. {skill.price}
// //                 </p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SkillList;
// >>>>>>> 4cd8417119184f8e46fd2dbc8722c674515030f1
