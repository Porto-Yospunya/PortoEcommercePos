import { ChangeEvent } from "react";
import { SearchIcon } from "lucide-react";


export const SearchField = ({ onSearchChange, children }: { onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void, children?: React.ReactNode }) => {
  return (
    <div className="relative flex items-center gap-2">
      <span className="absolute flex items-center h-full px-2 text-gray-500 z-10">
        <SearchIcon />
      </span>
      <input
        type="text"
        className="relative border-2 border-gray-200 bg-gray-50 p-2 pl-10 w-full"
        placeholder="Search..."
        onChange={onSearchChange}
      />
      {children}
    </div>
  );
}