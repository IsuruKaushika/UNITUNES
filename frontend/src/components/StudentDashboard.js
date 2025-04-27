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

  const handleRentingClick = () => {
    navigate("/rent-items");
  };

  const handleMedicareClick = () => {
    navigate("/medi-list");
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

        {/* Ad Section */}
        <Ad />
      </div> {/* <-- You missed closing this div */}
    </>
  );
}

export default HomePage;
