import axios from "axios";

export default {
  // Scrape news feed
  scrape: () => axios.get("/api/scrape"),
  getArticles: () => axios.get("/api/articles"),
  getArticle: (id) => axios.get("/api/articles/"+id),
  removeArticle: (id) => axios.delete("/api/articles/"+id),
  updateArticle: (id, Article) => axios.put("/api/articles/"+id, Article)
};