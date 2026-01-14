import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-blue-600 text-center">
      <h1 className="text-5xl font-bold mb-4 text-white">404</h1>
      <p className="text-lg mb-6 text-amber-100">Page not found</p>
      <p className="text-sm mb-6 text-amber-100">The link may be broken, or the account may have been removed.</p>

      <Link
        to="/login"
        className="px-4 py-2 text-xl font-bold bg-white text-blue-500 rounded"
      >
        Go to Login
      </Link>
    </div>
  );
}

export default PageNotFound;
