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
      <div className="flex flex-wrap items-center justify-between w-full px-3 py-1 mt-0 bg-gray-800">
        <div className="text-2xl font-bold text-[#6abd45] mx-3">
          {prop.head}
        </div>
        <button
          className="text-white mx-3 border-2 border-white hover:text-gray-800 hover:bg-white hover:border-[#6abd45] duration-100 text-md bg-[#6abd45] rounded-xl px-2 py-0.5 my-1 font-semibold"
          onClick={(e) => {
            e.preventDefault(); // Prevent default form submission behavior if button is inside a form
            handleLogOut();
          }}
        >
          Log Out
        </button>
      </div>
    </>
  );
}

export default Header;
