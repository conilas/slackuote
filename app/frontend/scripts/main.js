/**
  This is the main function which will be called on page's load.
*/
const init = () => {
  handleResponsiveness()
  bindWebsocket()
  loadAllData(screen.draw.fromApi)
}

/**
  One of the first functions to be called. This function will fetch all data
  from the api, wait for the result, add them to the frontend value controller
  and will then map each value to its HTML representation using the {@link
  templates.card} method. After doing so, it will call the function to plot
  the cards on to the DOM.
*/
const loadAllData = async (step) => {
  const values    = await api.fetchAllData()
  const lastQuote = await api.getLastQuote()

  step(values, lastQuote)
}

/**
  This function is responsible for creating the websocket connection. It then
  binds the onmessage function to an asynchronous function that receives the
  data of the new quote and performs the redraw of the current screen.
*/
const bindWebsocket = () => {
  const x = new WebSocket('wss://novatics-slack-meow.herokuapp.com/')

  x.onmessage = ({data}) => {
    const currentPlotted = DOM.getMainQuote().innerHTML
    const parsedData = JSON.parse(data)
    const allCards = screen.get.getPlottedAsArray()

    quoteController.addQuote({...parsedData,  date: new Date()})
    screen.redraw([templates.cardForObject({...parsedData, date: new Date()}), ...allCards], parsedData)
  }
}
