import { useEffect, useState } from "react";
import './news.css';

const News = () => {
  const [mynews, setMynews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("general"); // Default category

  const pageSize = 6; // Number of articles per page

  const fetchData = async () => {
    try {
      let response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${selectedCategory}&apiKey=fd214d9c3db34102a8add61bc41d9cbd`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      let data = await response.json();
      const articles = data.articles;
      const totalPagesCount = Math.ceil(articles.length / pageSize);
      setTotalPages(totalPagesCount);
      setMynews(articles.slice((currentPage - 1) * pageSize, currentPage * pageSize));
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mainDiv">
      <div className="category-buttons">
        <button className={`btn ${selectedCategory === "general" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => handleCategoryChange("general")}>General</button>
        <button className={`btn ${selectedCategory === "business" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => handleCategoryChange("business")}>Business</button>
        <button className={`btn ${selectedCategory === "technology" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => handleCategoryChange("technology")}>Technology</button>
        <button className={`btn ${selectedCategory === "entertainment" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => handleCategoryChange("entertainment")}>Entertainment</button>
      </div>

      <div className="card-container">
        {mynews.map((ele, index) => (
          <div key={index} className="card">
            <img
              src={ele.urlToImage || "https://via.placeholder.com/350x150"}
              className="card-img-top"
              alt={ele.title || "News image"}
            />
            <div className="card-body">
              <h5 className="card-title">{ele.title}</h5>
              <p className="card-text">{ele.description}</p>
              <a href={ele.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default News;
