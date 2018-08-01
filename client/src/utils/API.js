import axios from "axios";

export default {
  // Scrape news feed
  scrape: () => axios.get("/api/scrape"),
  getArticles: () => axios.get("/api/articles"),
  removeArticle: (id) => axios.delete("/api/articles/"+id)
};