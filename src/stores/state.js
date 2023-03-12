const getAccessToken = () => {
  const token = sessionStorage.getItem("auth-token");
  if (token) return true;
  return false;
};
