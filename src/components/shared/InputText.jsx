import PropTypes from "prop-types";
import { Label, TextInput, Textarea } from "flowbite-react";
import { Controller } from "react-hook-form";

const FormInput = ({
  name,
  control,
  label,
  icon: Icon,
  placeholder,
  type = "text",
  multiline = false,
  rules = {},
  className = "",
}) => {
  const InputComponent = multiline ? Textarea : TextInput;

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
          <>
            <InputComponent
              {...field}
              id={name}
              type={type}
              icon={Icon}
              placeholder={placeholder}
              color={error?.message ? "failure" : "gray"}
              helperText={error?.message}
              className={`${
                multiline ? "min-h-[100px]" : ""
              } focus:border-black`}
            />
          </>
        )}
      />
    </div>
  );
};

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  label: PropTypes.string,
  icon: PropTypes.elementType,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  multiline: PropTypes.bool,
  rules: PropTypes.object,
  className: PropTypes.string,
};

export default FormInput;
