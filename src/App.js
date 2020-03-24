import React, { Component, useState, useEffect } from 'react';

function App() {
  // state
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('react');
  const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react');
  const [loading, setLoading] = useState(false);

  //fetch news
  const fetchNews = () => {
    setLoading(true)
    fetch(url)
      .then(result => result.json())
      // .then(data => console.log(data.hits))
      .then(data => (setNews(data.hits), setLoading(false)))
      .catch(error => console.log(error));
  };

  //only loads when the url changes
  useEffect(() => {
    fetchNews()
  }, [url])

  const handleChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
  }

  const showLoading = () => (loading ? <h2>LOADING...</h2> : "")

  const searchForm = () => (
    <form onSubmit={handleSubmit}>
      <input type='text' value={searchQuery} onChange={handleChange} />
      <button>SEARCH</button>
    </form>
  )

  const showNews = () => {
    return news.map((news, index) => (
      <p key={index}>{news.title}</p>
    ))
  }

  return (
    <div>
      <h2>News</h2>
      {searchForm()}
      {showLoading()}
      {showNews()}
    </div>
  )
}

export default App;
