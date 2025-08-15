"use client";

import { ChangeEvent, useMemo, useState } from "react";

interface PaginationProps<T> {
  pageNumber: number;
  pagination: number;
  setPagination: (pagination: number) => void;
  setMaxPage: (maxPage: number) => void;
  data: T[];
  maxPage: number;
}

export function usePagination<T>({ data, page }: { data: T[], page: number }) {
  const [pagination, setPagination] = useState(1);
  const [maxPage, setMaxPage] = useState(page);
  const pageNumber = Math.ceil(data.length / maxPage);

  const sliceData = useMemo(() => {
    const start = (pagination - 1) * maxPage;
    const end = maxPage * pagination;
    return data.slice(start, end);
  }, [data, pagination, maxPage]);

  return {
    pagination,
    setPagination,
    setMaxPage,
    sliceData,
    pageNumber,
    data,
    maxPage,
  }
}

export function Pagination<T>({ pagination, setPagination, setMaxPage, pageNumber, data, maxPage }: PaginationProps<T>) {

  const handlePaginationChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setPagination(value);
  }

  return (
    <div className="flex justify-between items-center gap-2 p-4">
      <div className="flex gap-2">
        <button
          className="border-2 border-gray-200 text-gray-500 px-3 py-1 rounded hover:bg-gray-100 hover:text-black cursor-pointer"
          onClick={() => setPagination(pagination - 1)}
          disabled={pagination < 2}
        >
          Previous
        </button>
        <button
          className="border-2 border-gray-200 text-gray-500 px-3 py-1 rounded hover:bg-gray-100 hover:text-black cursor-pointer"
          onClick={() => setPagination(pagination + 1)}
          disabled={!(pageNumber > 1 && pagination >= 1 && pagination !== pageNumber)}
        >
          Next
        </button>
      </div>

      <div className="flex gap-2 py-1 px-2 rounded">
        <p>Page</p>
        <input
          type="text"
          value={pagination}
          min={1}
          max={pageNumber}
          className="text-center border-2 border-gray-500 rounded"
          style={{ width: 24 * pagination.toString().length }}
          onChange={handlePaginationChange}
        />
        <span>of</span>
        <span>{pageNumber}</span>
      </div>

      <div className="flex items-center gap-4 text-gray-500">
        <div className="flex gap-1">
          <p>Results: </p>
          {pagination > 1 ? (pagination - 1) * maxPage : 1}
          <p>-</p>
          {pageNumber === pagination ? data.length : pagination * maxPage}
          <p>of</p>
          <p>{data.length}</p>
        </div>

        <div className="flex gap-1">
          <input
            type="text"
            value={maxPage}
            min={1}
            className="text-center border-2 border-gray-500 rounded"
            style={{ width: 14 * maxPage.toString().length }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setMaxPage(Number(event.target.value))}
          />
        </div>
      </div>
    </div>
  );
}