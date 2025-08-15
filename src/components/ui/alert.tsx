export const ErrorAlert = ({ message }: { message?: string }) => {
  return (
    <div className="bg-red-100 text-red-800 px-2 rounded">
      {message}
    </div>
  );  
} 