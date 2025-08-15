export const StockStatus = ({ stock, min }: { stock: number, min: number }) => {
  
  let className: string = "";
  let status: string = "";

  if (stock > min) {
    className = "bg-green-200 text-green-800 rounded-full px-3 font-semibold text-center w-fit";
    status = "In Stock";
  } else if (stock <= min && stock !== 0) {
    className = "bg-yellow-200 text-yellow-800 rounded-full px-3 font-semibold text-center w-fit";
    status = "Low Stock";
  } else if (stock === 0) {
    className = "bg-red-200 text-red-800 rounded-full px-3 font-semibold text-center w-fit";
    status = "Out Stock";
  }
  
  return (
    <div className={className}>
      {status}
    </div>
  );
}