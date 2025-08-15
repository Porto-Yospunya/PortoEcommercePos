import Image from "next/image";
import Link from "next/link";
import { SquareArrowOutUpRight, SquarePen, Trash2 } from "lucide-react";
import { LoaderPoint } from "./loader";

type Header<T> = {
  label: string;
  key: keyof T | string;
  placeholder?: string;
  link?: string;
  onClick?: () => void;
}

interface TableFieldProps<T> {
  data: T[],
  headers: Header<T>[],
  colWidth: string[],
  isLoading: boolean,
}

export function TableField<T>({
  data,
  headers,
  colWidth,
  isLoading,
}: TableFieldProps<T>) {
  return (
    <div className="overflow-y-auto max-h-[calc(100vh-280px)]">
      <table className="table-field w-full">
        <thead>
          <tr className="border-y-2 border-gray-200">
            {headers.map((header, index) => (
              <th
                key={index}
                className={`text-gray-500 text-left sticky top-0 z-20 bg-white
                ${colWidth[index]}`}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-200 hover:bg-gray-100">
              {headers.map((header, colIndex) => {
                const label = header.label.toLowerCase();
                const value = row[header.key as keyof T];

                if (label === "image" && typeof value === "string") {
                  return (
                    <td key={colIndex}>
                      <Image
                        src={value || header.placeholder || "/placeholder.png"}
                        alt="Not image"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </td>
                  );
                }

                if (label === "actions") {
                  return (
                    <td key={colIndex}>
                      <div className="flex items-center">
                        <Link
                          href={`${header.link}/${value}`}
                          className="border-2 border-gray-200 p-1 rounded mx-1 hover:bg-gray-200 text-gray-500 hover:text-black cursor-pointer"
                        >
                          <SquarePen width={20} height={20} />
                        </Link>
                        <button
                          onClick={header.onClick}
                          className="border-2 border-gray-200 p-1 rounded mx-1 hover:bg-gray-200 hover:text-black text-red-500 cursor-pointer"
                        >
                          <Trash2 width={20} height={20} />
                        </button>
                      </div>
                    </td>
                  );
                }

                if (label === "details") {
                  return (
                    <td key={colIndex}>
                      <div className="flex items-center">
                        <Link
                          href={`${header.link}/${value}`}
                          className="border-2 border-gray-200 p-1 rounded mx-1 hover:bg-gray-200 text-gray-500 hover:text-black cursor-pointer"
                        >
                          <SquareArrowOutUpRight />
                        </Link>
                      </div>
                    </td>
                  );
                }

                return (
                  <td key={colIndex}>
                    {typeof value === "object" ? value as React.ReactNode : value ? String(value) : "-"}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {data.length === 0 && !isLoading && (
        <div className="flex w-full justify-center my-4 py-2 bg-gray-100 rounded text-gray-600">Not Found Item</div>
      )}

      {isLoading && <div className="flex w-full justify-center my-4 py-2"><LoaderPoint /></div>}

    </div>
  )
}