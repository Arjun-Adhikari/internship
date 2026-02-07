import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black tracking-tighter">
          SurkhetStore<span className="text-yellow-400"></span>
        </Link>
        <div className="hidden md:flex gap-6 text-sm font-medium">
        </div>
      </div>
    </nav>
  );
};

export default Navbar;