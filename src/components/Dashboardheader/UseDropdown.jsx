import { Mail, User, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../userAuth/AuthContext";

const UserDropdown = ({ user }) => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setUser(null);
        navigate("/");
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="absolute right-1 top-15 w-80 max-w-[90vw] p-4 rounded-xl shadow-lg backdrop-blur-md bg-blue-200/70 text-black z-50">
      <div className="space-y-3 text-sm sm:text-base">
        <div className="flex items-start space-x-2">
          <User className="text-gray-700 mt-1" size={18} />
          <div>
            <span className="font-semibold">Name:</span> {user.name}
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <Mail className="text-gray-700 mt-1" size={18} />
          <div>
            <span className="font-semibold">Email:</span> {user.email}
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <Shield className="text-gray-700 mt-1" size={18} />
          <div>
            <span className="font-semibold">Role:</span> {user.role}
          </div>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-5 w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default UserDropdown;
