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

const AdminProductFilter = ({ categories }) => {
  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setCategory(searchParams.get("category") || "all");
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

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    const params = new URLSearchParams(searchParams);
    if (selectedCategory === "all") {
      params.delete("category");
    } else {
      params.set("category", selectedCategory);
    }
    navigate(`${pathname}?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setCategory("all");
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
        </div>

        {/* Filters */}
        <div className="col-span-2 flex items-end gap-3">
          <FormControl size="small" className="w-45">
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={handleCategoryChange}
            >
              <MenuItem value="all">All</MenuItem>
              {categories.map((item) => (
                <MenuItem
                  key={`desktop-${item.categoryId}`}
                  value={item.categoryName}
                >
                  {item.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
              <FormControl fullWidth size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  label="Category"
                  onChange={handleCategoryChange}
                >
                  <MenuItem value="all">All</MenuItem>
                  {categories.map((item) => (
                    <MenuItem
                      key={`mobile-${item.categoryId}`}
                      value={item.categoryName}
                    >
                      {item.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

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

export default AdminProductFilter;