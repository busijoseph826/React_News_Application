// src/components/News.js

import { useEffect, useState, useContext } from "react";
import { NewsContext } from '../components/context/NewsContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './News.css';

const News = () => {
  const { selectedCategory } = useContext(NewsContext);
  const [mynews, setMynews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const pageSize = 6;
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  const fetchData = async () => {
    setLoading(true);
    try {
      let response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${selectedCategory}&q=${searchQuery}&apiKey=${apiKey}`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      let data = await response.json();
      const articles = data.articles;
      const totalPagesCount = Math.ceil(articles.length / pageSize);
      setTotalPages(totalPagesCount);
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      setMynews(articles.slice(startIndex, endIndex));
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, selectedCategory, searchQuery]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="mainDiv">
      <div className="search-bar">
        <input
          type="text"
          className="form-control"
          placeholder="Search news..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="card-container">
        {loading ? (
          Array.from({ length: pageSize }).map((_, index) => (
            <div key={index} className="card">
              <Skeleton height={150} />
              <div className="card-body">
                <Skeleton width={`80%`} height={20} />
                <Skeleton count={3} />
                <Skeleton width={100} height={30} />
              </div>
            </div>
          ))
        ) : (
          mynews.map((ele, index) => (
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
          ))
        )}
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
