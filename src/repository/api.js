import http from "./axios";

class ApiRepository {
  async login(data) {
    return http.post("/auth/login", data);
  }
  async register(data) {
    return http.post("/auth/register", data);
  }
  async getNoteList(keyword = "") {
    return http.get(`/diary?search=${keyword}`);
  }
}

export default ApiRepository;
