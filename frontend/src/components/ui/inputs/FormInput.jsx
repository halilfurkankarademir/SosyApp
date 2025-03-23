import React from "react";

const FormInput = ({
    id,
    name,
    type,
    required,
    placeholder,
    label,
    value,
    onChange,
}) => {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-300"
            >
                {label}
            </label>
            {type === "textarea" ? (
                <textarea
                    id={id}
                    name={name}
                    rows="3"
                    required={required}
                    className="mt-1 block w-full px-4 py-2 bg-neutral-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            ) : (
                <input
                    id={id}
                    name={name}
                    type={type}
                    required={required}
                    className="mt-1 block w-full px-4 py-2 bg-neutral-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            )}
        </div>
    );
};

export default FormInput;
