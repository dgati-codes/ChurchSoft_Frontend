export const getInitials = (user = {}) => {
  if (!user) return "";

  const first = user?.firstName?.trim()?.[0] || "";
  const last = user?.lastName?.trim()?.[0] || "";

  // If both exist → BW
  if (first && last) return (first + last).toUpperCase();

  // If only one name → B
  if (first) return first.toUpperCase();
  if (last) return last.toUpperCase();

  // fallback if backend later sends fullName
  if (user?.fullName) {
    return user.fullName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map(n => n[0])
      .join("")
      .toUpperCase();
  }

  return "";
};


