
export const getAccessToken = () => {
    return localStorage.getItem("accessToken") || ""; //  the token is stored in localStorage
  };
  