import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { Label } from "flowbite-react";

function SelectInput({
  name,
  control,
  options,
  label,
  placeholder,
  className = "",
  disabled = false,
  rules = {},
}) {
  return (
    <div className={className}>
      {label && (
        <div className="mb-2 block">
          <Label htmlFor={name} value={label} />
        </div>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <div>
            <select
              {...field}
              id={name}
              disabled={disabled}
              className={`bg-gray-50 border ${
                error ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            >
              <option value="" hidden>
                {placeholder}
              </option>
              {options?.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="text-sm text-gray-900 dark:text-white"
                >
                  {option.label}
                </option>
              ))}
            </select>
            {error && (
              <p className="mt-1 text-sm text-red-500">{error.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  rules: PropTypes.object,
};

export default SelectInput;
