import { Mail, User, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserDropdown = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="absolute right-0 mt-2 w-96 p-6 rounded-xl shadow-2xl backdrop-blur-md bg-blue-200/70 text-black text-base z-50">
      <p className="mb-1 flex items-center space-x-2">
        <User size={20} className="text-gray-600" />
        <strong>Name:</strong>
        <span>{user.name}</span>
      </p>
      <p className="mb-1 flex items-center space-x-2">
        <Mail size={20} className="text-gray-600" />
        <strong>E-mail:</strong>
        <span>{user.email}</span>
      </p>
      <p className="mb-4 flex items-center space-x-2">
        <Shield size={20} className="text-gray-600" />
        <strong>Role:</strong>
        <span>{user.role}</span>
      </p>
      <button
        className="w-full bg-blue-900 text-white py-2 cursor-pointer rounded hover:bg-blue-400 transition"
        onClick={() => navigate('/')}
      >
        Logout
      </button>
    </div>
  );
};

export default UserDropdown;
