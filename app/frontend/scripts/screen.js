/**
  This is possibly the most called namespace in the system - it is responsible
  for handling every draw/redraw in the DOM. The idea is to receive some data,
  treat it and then plot it to the screen -- therefore the name.

  It shall be called whenever the application starts amd whenever some new data
  comes to the application (like receiving data from the websocket). It may
  also be called on some reordening.
*/
const screen = (function() {

  /**
    As the name states: plots the main quote on the top of the page. This function
    may be called in two different places: on page load and on every new websocket
    income.

    @param {Object} data the data of this latest quote
  */
  const mainQuote = (data) => {
    const value = DOM.getMainQuote()
    value.innerHTML = data.text
  }

  /**
    This function is responsible to plot all the cards on the screen. In order to
    do so, it divides the cards into groups of 4 inside an array of arrays. Each
    of these entries will contain the specified value (a single lined grid). Then,
    it appends to the start of the array the first line and to the end the
    enclosing div.

    @param {string[]} plottable the array of values to be divided and plotted on
    the screen. Most likely this will come from the {@link getPlottedAsArray} or
    {@link prepareAndPlotData} methods.

    @returns {function} the function binded with the actual grid size
  */
  const allCards = (gridSize) => (plottable) => {
    const startLine = `<div class="cards-line gradient">`
    const endLine   = `</div>`
    const holder = DOM.getAllCardsFrame()
    const htmls = []

    let counter = 0;

    plottable.forEach((value, index) => {
      if (!htmls[counter]) htmls[counter] = startLine
      htmls[counter] += value
      if ((index+1) % gridSize == 0) {
        htmls[counter] += endLine
        counter += 1
      }
    })

    htmls.forEach(x => holder.innerHTML += x)
  }

  const allCardsDefaultGrid = allCards(4)

  const fromApi = (values, lastQuote) => {
    const mappedValues = values.map(x => {
      const mappedObject = {...x,  date: new Date(x.date)}
      quoteController.addQuote(mappedObject)
      return templates.cardForObject(mappedObject)
    })

    redrawScreen(mappedValues, lastQuote)
  }


  const redrawScreen = (values, lastQuote) => {
    DOM.cleanCards()

    if (lastQuote) screen.draw.mainQuote(lastQuote)
    if (values)    screen.draw.allCardsDefaultGrid(values)
  }

  /**
   This function will retrieve all the cards as an array of innerHTML. Its usage
   is simple: whenever we need to update the cards (say, a new income from
   websocket) we get all the plotted ones and add the newly-received.

   @returns {string[]} an array containing the ordered htmls of the current
   plotted cards
  */
  const getPlottedAsArray = () => {
    const cardLines = DOM.getAllCardLines()
    const stored = []

    cardLines.forEach(value => {
      value.childNodes.forEach(actualValue => {
          if (DOM.isDiv(actualValue)) stored.push(actualValue)
      })
    })

    return stored.map(x => x.outerHTML)
  }

  return {
    draw: {
      fromApi,
      allCardsDefaultGrid,
      mainQuote
    },
    redraw: redrawScreen,
    get : {
      getPlottedAsArray : getPlottedAsArray
    }
  }

}) ()
