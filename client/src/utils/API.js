import axios from "axios";

export default {
  // Search news feed
  search: (params) => axios.put("/api/search", params),
  getArticles: () => axios.get("/api/articles"),
  getArticle: (id) => axios.get("/api/articles/"+id),
  removeArticle: (id) => axios.delete("/api/articles/"+id),
  updateArticle: (id, Article) => axios.put("/api/articles/"+id, Article)
};