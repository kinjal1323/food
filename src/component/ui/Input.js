export function Input({ className = "", ...props }) {
    return (
      <input
        className={`border border-gray-300 rounded p-2 w-full focus:ring focus:ring-blue-300 outline-none ${className}`}
        {...props}
      />
    );
  }
  