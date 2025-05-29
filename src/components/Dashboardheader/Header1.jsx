import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { Cog } from "lucide-react";
import UserDropdown from "./UseDropdown.jsx"; 
import { useAuth } from "../../userAuth/AuthContext.jsx"; 

const Header2 = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const { user } = useAuth();

  if (!user) return null; 

  return (
    <header className="flex justify-between w-full items-center px-8 py-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white shadow-md z-50">
      <div className="flex items-center space-x-2">
        <h2 className="text-2xl font-bold">Hi, {user.name}</h2>
        <Cog size={32} color="gray" />
      </div>
      <div className="relative">
        <div
          onClick={() => setShowDropdown(!showDropdown)}
          className="cursor-pointer text-white text-4xl"
        >
          <FaUserCircle />
        </div>
        {showDropdown && <UserDropdown user={user} />}
      </div>
    </header>
  );
};

export default Header2;
