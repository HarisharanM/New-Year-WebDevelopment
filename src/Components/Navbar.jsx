import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, loginWithGoogle, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0B132B] border-b border-yellow-500/30">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Brand */}
        <Link to="/" className="text-white font-bold text-lg">
          New Year’s Eve 2025 → 2026
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {!user ? (
            <button
              onClick={loginWithGoogle}
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
            >
              Sign in with Google
            </button>
          ) : (
            <>
              <span className="text-gray-200 text-sm hidden sm:block">
                Hi, {user.displayName}
              </span>

              <button
                onClick={() => navigate("/my-tickets")}
                className="text-yellow-400 font-semibold hover:underline"
              >
                My Tickets
              </button>

              <button
                onClick={logout}
                className="text-red-400 font-semibold hover:underline"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
