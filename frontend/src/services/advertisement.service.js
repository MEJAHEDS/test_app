import http from "../http-common";

class AdvertisementDataService {
  getAll() {
    return http.get("/advertisements");
  }

  get(id) {
    return http.get(`/advertisements/${id}`);
  }

  create(data) {
    return http.post("/advertisements", data);
  }

  update(id, data) {
    return http.put(`/advertisements/${id}`, data);
  }

  delete(id) {
    return http.delete(`/advertisements/${id}`);
  }

  deleteAll() {
    return http.delete(`/advertisements`);
  }

  findByTitle(title) {
    return http.get(`/advertisements?title=${title}`);
  }
}

export default new AdvertisementDataService();