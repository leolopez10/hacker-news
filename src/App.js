import React, { Component, useState, useEffect } from 'react';

function App() {
  // state
  const [news, setNews] = useState([])
  const [searchQuery, setSearchQuery] = useState('react')

  //fetch news
  const fetchNews = () => {
    fetch(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
      .then(result => result.json())
      // .then(data => console.log(data.hits))
      .then(data => setNews(data.hits))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchNews()
  })

  const handleChange = (event) => {
    setSearchQuery(event.target.value)
  }


  return (
    <div>
      <h2>News</h2>
      <form>
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
