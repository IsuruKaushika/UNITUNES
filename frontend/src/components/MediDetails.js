import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const mediData = [
  {
    id: 1,
    name: "Pharmacy One",
    image: "/images/medi-1.jpg",
    category: "Pharmacy",
    description: "24/7 Service, Medicines and First Aid",
    contact: "071-1234567",
  },
  {
    id: 2,
    name: "Pharmacy Two",
    image: "/images/medi-2.jpg",
    category: "Pharmacy",
    description: "Home Delivery Available",
    contact: "071-2345678",
  },
  {
    id: 3,
    name: "Pharmacy Three",
    image: "/images/medi-3.jpg",
    category: "Pharmacy",
    description: "Discounts for Students",
    contact: "071-3456789",
  },
  {
    id: 4,
    name: "Pharmacy Four",
    image: "/images/medi-4.jpg",
    category: "Pharmacy",
    description: "Imported Medicines",
    contact: "071-4567890",
  },
  {
    id: 5,
    name: "Medicare Center One",
    image: "/images/medi-5.jpg",
    category: "Medicare Center",
    description: "Health Checkups and Consultations",
    contact: "077-1234567",
  },
  {
    id: 6,
    name: "Medicare Center Two",
    image: "/images/medi-5.jpg",
    category: "Medicare Center",
    description: "Emergency Care and Ambulance",
    contact: "077-2345678",
  },
];

const MediDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const item = location.state?.item || mediData.find((m) => m.id === parseInt(id));

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-50 p-6">
        <p className="text-lg text-red-700 font-semibold">
          Item not found or data not passed.
        </p>
      </div>
    );
  }

  const { name, image, description, contact, category } = item;

  return (
    <main className="min-h-screen bg-yellow-50 py-12 px-6 sm:px-12 lg:px-24 flex flex-col items-center">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="self-start mb-8 px-5 py-2 bg-green-200 text-green-800 rounded-lg shadow-md hover:bg-green-300 transition-colors focus:outline-none focus:ring-4 focus:ring-green-100"
        aria-label="Go back"
      >
        &larr; Back
      </button>

      {/* Content Card */}
      <article className="max-w-4xl w-full bg-gradient-to-br from-green-100 via-green-200 to-green-300 rounded-3xl shadow-2xl overflow-hidden">
        {/* Image */}
        <img
          src={image}
          alt={name}
          className="w-full h-64 sm:h-80 object-cover rounded-t-3xl"
          loading="lazy"
        />

        {/* Details */}
        <section className="p-8 text-green-900">
          <h1 className="text-4xl font-extrabold mb-6">{name}</h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Category</h2>
            <p>{category}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="leading-relaxed">{description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Contact</h2>
            <a
              href={`tel:${contact}`}
              className="text-blue-700 font-semibold hover:underline"
            >
              {contact}
            </a>
          </div>
        </section>
      </article>
    </main>
  );
};

export default MediDetails;
