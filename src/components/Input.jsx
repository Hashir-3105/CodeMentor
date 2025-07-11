import React from "react";

function Input({ title, value, placeholder, inputType, name, rows = 4 }) {
  const commonClasses =
    " w-full border border-gray-300 rounded-md px-2 mt-1 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ";

  return (
    <div>
      <label
        htmlFor="name"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {title}
        {inputType === "textarea" ? (
          <textarea
            name={name}
            value={value}
            placeholder={placeholder}
            rows={rows}
            className={commonClasses + " resize-none"}
          />
        ) : (
          <input
            name={name}
            value={value}
            placeholder={placeholder}
            className={commonClasses}
            required
          />
        )}
      </label>
    </div>
  );
}

export default Input;
