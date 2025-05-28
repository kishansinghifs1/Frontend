
import { Wrench } from 'lucide-react'; 
function Header() {
  return (
    <header className="fixed top-0 left-0 w-full cursor-default bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-6 px-10 shadow-lg z-50">
      <div className="flex items-center space-x-4">
        <Wrench className="w-8 h-8 text-yellow-400" />
        <h1 className="text-2xl font-bold tracking-wide">
          Spare Part Management- Maharaja
        </h1>
      </div>
    </header>
  );
}

export default Header;
