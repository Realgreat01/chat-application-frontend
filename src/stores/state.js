const getAccessToken = () => {
  const token = localStorage.getItem("auth-token");
  if (token) return true;
  return false;
};
