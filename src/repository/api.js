import http from "./axios";

class apiRepository {
  async login(data) {
    return http.post("/auth/login", data);
  }
  async register(data) {
    return http.post("/auth/register", data);
  }
}

export default apiRepository;
