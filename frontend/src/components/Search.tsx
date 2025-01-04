import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div>
      <form className="relative w-full">
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" // Tailwind classes for styling
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <FaSearch
            className="h-5 w-5 text-gray-400 hover:text-gray-600"
            aria-hidden="true"
          />
        </button>
      </form>
    </div>
  );
};
export default Search;
