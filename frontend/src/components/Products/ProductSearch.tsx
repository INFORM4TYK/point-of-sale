import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { getCategories } from "../../services/productService";

type ProductSearchProps = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
};

const ProductSearch = ({
  query,
  setQuery,
  category,
  setCategory,
}: ProductSearchProps) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  return (
    <div className="w-full py-2 flex justify-between xl:items-center flex-col xl:flex-row gap-2">
      <div className="flex flex-1 gap-2 items-stretch">
        {categories.map((cat) => (
          <div
            key={cat}
            onClick={() => setCategory(category === cat ? "" : cat)}
            className={`p-2 text-center grid place-items-center flex-1 xl:py-4 rounded-lg cursor-pointer ${
              category === cat ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            {cat}
          </div>
        ))}
      </div>

      <TextField
        sx={{
          "& .MuiOutlinedInput-root": { borderRadius: "12px" },
        }}
        className="w-full xl:max-w-[500px]"
        autoComplete="new-password"
        placeholder="Wyszukaj"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default ProductSearch;
