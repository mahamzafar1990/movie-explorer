import { Link } from "react-router-dom";
import { Film } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-primary text-white px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Film className="w-8 h-8 text-accent" />
        <span className="font-bold text-xl">Movie Explorer</span>
      </div>
      <div className="flex gap-6">
        <Link to="/" className="hover:text-accent">
          Home
        </Link>
        <Link to="/favourites" className="hover:text-accent">
          Favourites
        </Link>
      </div>
    </nav>
  );
}
