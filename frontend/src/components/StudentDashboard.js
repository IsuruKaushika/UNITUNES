// HomePage Component
function HomePage() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  const handleBoardingClick = () => {
    navigate("/boarding-list");
  };

  const handleTaxiClick = () => {
    navigate("/taxi-list");
  };

  const handleMedicareClick = () => {
    navigate("/medi-select");
  };

  const handleShopClick = () => {
    navigate("/shop-select");
  };

  const handleRentingClick = () => {
    navigate("/rent-items");
  };

<<<<<<< HEAD
  // ✅ Skill Sharing navigation function
  const handleSkillSharingClick = () => {
    navigate("/skill-list");
=======
  const handleMedicareClick = () => {
    navigate("/medi-list");
>>>>>>> 8fda8334845fa94ccbe364c8ecd1ae0c382fee1a
  };

  return (
    <>
      <Navbar setShowLogin={setShowLogin} />
      <div className="home-page">
        {/* Header Section */}
        <header className="header">
          <div className="header-content">
            <h2>UniTunes - Smart Solutions for Smarter Undergraduates!</h2>
            <button>View Menu</button>
          </div>
        </header>

<<<<<<< HEAD
          {/* Taxi Feature */}
          <div className="feature-item" onClick={handleTaxiClick}>
            <img src="/images/Taxi.jpg" alt="Taxis" />
            <p>Taxis</p>
          </div>

          {/* Medicare Feature */}
          <div className="feature-item" onClick={handleMedicareClick} >
            <img src="/images/Medicine.jpg" alt="Medicare" />
            <p>Medicare</p>
          </div>

          {/* Food Feature */}
          <div className="feature-item" onClick={handleShopClick}>
            <img src="/images/Food.jpg" alt="Shops" />
            <p>Shops</p>
          </div>

          {/* Renting Feature */}
          <div className="feature-item" onClick={handleRentingClick}>
            <img src="/images/Rental.jpg" alt="Renting" />
            <p>Renting</p>
          </div>

          {/* Skill Sharing Feature */}
          <div className="feature-item" onClick={handleSkillSharingClick}>
            <img src="/images/Skill Sharing.jpg" alt="Skill Sharing" />
            <p>Skill Sharing</p>
          </div>
        </div>
      </section>
    </div>
=======
        {/* Ad Section */}
        <Ad />
      </div> {/* <-- You missed closing this div */}
    </>
>>>>>>> 8fda8334845fa94ccbe364c8ecd1ae0c382fee1a
  );
}

export default HomePage;
