import { useEffect, useState } from "react";
import {
  Button,
  Collapse,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import {
  FiArrowUp,
  FiArrowDown,
  FiRefreshCw,
  FiSearch,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import {
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const OrderFilter = () => {
  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setSortOrder(searchParams.get("sortby") || "asc");
    setSearchTerm(searchParams.get("keyword") || "");
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (searchTerm.trim()) {
        params.set("keyword", searchTerm);
      } else {
        params.delete("keyword");
      }
      navigate(`${pathname}?${params.toString()}`, { replace: true });
    }, 700);
    return () => clearTimeout(handler);
  }, [searchTerm, pathname, navigate, searchParams]);


  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    const params = new URLSearchParams(searchParams);
    params.set("sortby", newOrder);
    navigate(`${pathname}?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setSortOrder("asc");
    setSearchTerm("");
    navigate(pathname);
  };

  return (
    <div className="space-y-4">

      {/* Desktop */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-4 items-end">
        
        {/* Search */}
        <div className="col-span-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search By Email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-400 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
            />
            <FiSearch
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-700"
            />
          </div>
        </div>
        
          <Tooltip title={`Sorted by Date: ${sortOrder}`}>
            <Button
              variant="contained"
              onClick={toggleSortOrder}
              className="whitespace-nowrap h-10"
            >
              Sort By Date&nbsp;
              {sortOrder === "asc" ? <FiArrowUp /> : <FiArrowDown />}
            </Button>
          </Tooltip>

          <Button
            variant="contained"
            color="error"
            startIcon={<FiRefreshCw />}
            onClick={handleClearFilters}
            className="whitespace-nowrap h-10"
          >
            Clear
          </Button>
        </div>
      {/* Mobile */}
      <div className="lg:hidden">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search Products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-400 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
            />
            <FiSearch
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-700"
            />
          </div>

          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-md"
          >
            Filters
            {showFilters ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        </div>

        <Collapse in={showFilters}>
          <div className="mt-3 border rounded-lg p-4 shadow-sm bg-white">
            <div className="flex flex-col gap-4">
              <Tooltip title={`Sorted by price: ${sortOrder}`}>
                <Button variant="contained" onClick={toggleSortOrder}>
                  Sort By&nbsp;
                  {sortOrder === "asc" ? <FiArrowUp /> : <FiArrowDown />}
                </Button>
              </Tooltip>

              <Button
                variant="contained"
                color="error"
                startIcon={<FiRefreshCw />}
                onClick={handleClearFilters}
              >
                Clear Filter
              </Button>
            </div>
          </div>
        </Collapse>
    </div>
    </div>
  );
};

export default OrderFilter;