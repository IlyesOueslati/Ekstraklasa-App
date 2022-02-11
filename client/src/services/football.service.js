import http from "../http-common";

class FootballService {
  getTeamsAll() {
    return http.get("/teams");
  }

  getTeamById(id) {
    return http.get(`/teams/${id}`);
  }

  getPlayerById(id) {
    return http.get(`/players/${id}`);
  }

}

export default new FootballService();