import Axios from "axios";

const http = Axios.create({
  baseURL: "https://diary-test.ifdenewhallaid.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptors Axios to Insert Token for each request
if (localStorage.userToken) {
  http.interceptors.request.use(
    async (config) => {
      let token = localStorage.userToken
        ? localStorage.getItem("userToken")
        : "";
      config.headers = {
        authorization: token,
      };
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
}

export default http;
