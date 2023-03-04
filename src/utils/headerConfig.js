export const generateHeadersConfig = () => {
  const token = localStorage.getItem("userToken");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
};
