import { HeaderProp } from ".";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Header(prop: HeaderProp) {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogOut = async () => {
    try {
      // 1. Remove the authentication token from sessionStorage
      sessionStorage.removeItem("token");
      // If you store user info, remove that too
      sessionStorage.removeItem("user");

      // 2. Redirect the user to the login page
      navigate("/admin/login"); // or "/login" depending on your route setup

      // Optional: Inform the user
      alert("You have been logged out successfully.");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred during logout. Please try again.");
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between w-full px-6 py-3 mt-0 bg-white border-b border-gray-200 shadow-sm">
        <div className="text-xl font-bold text-gray-900 mx-3 uppercase tracking-wider">
          {prop.head}
        </div>
        <button
          className="mx-3 border border-[#6abd45] text-[#6abd45] bg-white hover:bg-green-50 duration-150 text-sm rounded px-4 py-1.5 font-bold transition-all"
          onClick={(e) => {
            e.preventDefault(); // Prevent default form submission behavior if button is inside a form
            handleLogOut();
          }}
        >
          LOG OUT
        </button>
      </div>
    </>
  );
}

export default Header;
