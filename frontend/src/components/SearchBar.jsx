import { FaSearch } from "react-icons/fa";

export default function SearchBar({

    value,

    setValue,

    onSearch,

}) {

    const handleKeyDown = (e) => {

        if (e.key === "Enter")

            onSearch();

    };

    return (

        <div className="flex gap-3 mt-10">

            <div className="relative flex-1">

                <FaSearch
                    className="absolute left-4 top-4 text-gray-400"
                />

                <input

                    type="text"

                    value={value}

                    onChange={(e)=>setValue(e.target.value)}

                    onKeyDown={handleKeyDown}

                    placeholder="Search medicine..."

                    className="w-full rounded-xl border bg-white py-3 pl-12 pr-4 shadow"

                />

            </div>

            <button

                onClick={onSearch}

                className="rounded-xl bg-blue-700 px-8 text-white hover:bg-blue-800"

            >

                Search

            </button>

        </div>

    );

}