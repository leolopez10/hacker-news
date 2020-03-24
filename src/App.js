import React, { Component, useState, useEffect } from 'react';

function App() {
  // state
  const [news, setNews] = useState([])
  const [searchQuery, setSearchQuery] = useState('react')
  const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react')

  //fetch news
  const fetchNews = () => {
    fetch(url)
      .then(result => result.json())
      // .then(data => console.log(data.hits))
      .then(data => setNews(data.hits))
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

  return (
    <div>
      <h2>News</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' value={searchQuery} onChange={handleChange} />
        <button>SEARCH</button>
      </form>
      {news.map((news, index) => (
        <p key={index}>{news.title}</p>
      ))}
    </div>
  )
}

export default App;
