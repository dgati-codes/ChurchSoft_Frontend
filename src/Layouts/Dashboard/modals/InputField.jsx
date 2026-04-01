const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  labelClassName = "block text-gray-700 font-bold", // default
}) => (
  <div>
    <label className={labelClassName}>
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={`Enter ${label.toLowerCase()}`}
      className="w-full border p-2 rounded-md border-gray-100 bg-gray-100"
      required={required}
    />
  </div>
);

export default InputField;