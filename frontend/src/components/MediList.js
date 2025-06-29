import React from "react";
import { useNavigate } from "react-router-dom";

const MediList = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      name: "Pharmacy One",
      image: "/images/medi-1.jpg",
      category: "Pharmacy",
      description: "Open 24/7 with medicines and first aid supplies.",
      contact: "071-1234567",
    },
    {
      id: 2,
      name: "Pharmacy Two",
      image: "/images/medi-2.jpg",
      category: "Pharmacy",
      description: "Home delivery available for all prescriptions.",
      contact: "071-2345678",
    },
    {
      id: 3,
      name: "Pharmacy Three",
      image: "/images/medi-3.jpg",
      category: "Pharmacy",
      description: "Special discounts for students and seniors.",
      contact: "071-3456789",
    },
    {
      id: 4,
      name: "Medicare Center One",
      image: "/images/medi-5.jpg",
      category: "Medicare Center",
      description: "Comprehensive health checkups and consultations.",
      contact: "077-1234567",
    },
    {
      id: 5,
      name: "Medicare Center Two",
      image: "/images/medi-5.jpg",
      category: "Medicare Center",
      description: "Emergency care and ambulance services available.",
      contact: "077-2345678",
    },
  ];

  const handleCardClick = (service) => {
    navigate(`/medi-details/${service.id}`, { state: { service } });
  };

  // Group services by category
  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = [];
    acc[service.category].push(service);
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 sm:px-12 lg:px-24">
      <header className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-green-900 mb-4">
          Medical Services Directory
        </h1>
      </header>

      {Object.entries(groupedServices).map(([category, services]) => (
        <section key={category} className="max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl font-semibold text-green-800 border-b-2 border-green-300 pb-2 mb-8">
            {category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <article
                key={service.id}
                onClick={() => handleCardClick(service)}
                className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:border-green-500 flex flex-col overflow-hidden"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleCardClick(service);
                  }
                }}
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-green-700 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 flex-grow">{service.description}</p>
                  <p className="mt-4 text-blue-600 font-semibold">
                    Contact: {service.contact}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
};

export default MediList;
