const toCssSize = (value, fallback) => {
  if (value === undefined || value === null || value === "") return fallback;
  return typeof value === "number" ? `${value}px` : value;
};

const LoadingSpinner = ({
  text = "Loading...",
  width,
  height,
  thickness,
  className = "",
  containerClassName = "",
  textClassName = "",
}) => {
  const spinnerStyle = {
    ...(width !== undefined ? { width: toCssSize(width, "48px") } : {}),
    ...(height !== undefined
      ? { height: toCssSize(height, "48px") }
      : width !== undefined
        ? { height: toCssSize(width, "48px") }
        : {}),
    ...(thickness !== undefined
      ? {
          borderWidth:
            typeof thickness === "number" ? `${thickness}px` : thickness,
        }
      : {}),
  };

  return (
    <div
      className={`flex font-[DM Sans] flex-col items-center justify-center ${containerClassName}`}
    >
      <div
        className={`w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin border-solid ${className}`}
        style={spinnerStyle}
      ></div>
      {text && (
        <p
          className={`mt-4 text-gray-600 font-medium animate-pulse ${textClassName}`}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
