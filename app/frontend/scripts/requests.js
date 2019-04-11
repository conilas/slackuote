/**
  This namespace represents all the api requests done for the application.
*/
const api = (function() {

  const updateLikes = (id, value) => {
    fetch('/quote', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id, likes: value})
    });
  }

  const getLastQuote = async () => {
    const value = await fetch('/quote/last').then((data) => data.json())
    return value
  }

  const fetchAllData = async () => {
    const values = await fetch("/quote").then(x => x.json())
    return values
  }

  return {
    updateLikes,
    getLastQuote,
    fetchAllData
  }

})()
