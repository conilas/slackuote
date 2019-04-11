/**
  This value is not a just a simple namespace - it is a in-memory controller
  of the values in a singleton way. It serves to hold all the data loaded
  from the backend when the API starts in order to avoid making unnecessary
  requests.

  It shall be called whenever the application starts, whenever some of the cards
  is updated and whenever new data comes to the application (like receiving
  data from the websocket).
*/
const quoteController = (function() {

  const allQuotes = []

  const addQuote = (quote) => allQuotes.push(quote)

  const retriveAllQuotes = () => allQuotes

  const updateLikeOn = (id, likes) => {
    const index = allQuotes.findIndex(x => x._id == id)
    allQuotes[index] = {...allQuotes[index], likes}
    return {...allQuotes[index], likes}
  }

  return {
    addQuote,
    retriveAllQuotes,
    updateLikeOn
  }

})()
