/**
  This namespace represents the actions of the system. The actions are directly
  binded to the DOM (the HTML to be more exact).

  It is exported using IIFE.
*/
const actions = (function (){

  /**
    This function represents a 'like' action - whenever a user likes a quote. It
    gets the current value of likes, increases by one, updates on the api and in
    the quoteController module.

    @param {string} id the id of the object being liked
    @returns {Object} an object containing the updated values refering to the
    passed id.
  */
  const liked = (id) => {
    const current = DOM.getCardById(id)
    current.innerHTML = 1 + Number(current.innerHTML)
    api.updateLikes(id, current.innerHTML)
    return quoteController.updateLikeOn(id, current.innerHTML)
  }

  /**
    This function changes the filter of ordering for the screens. Depending on the
    received value, it sorts the quotes stored in memory with a different
    parameters. Then, it clean the cards and performs a replot.

    @param {('likes', 'date')} newFilter the new filter that will be set to sort
    the values.
  */
  const changeFilter = (newFilter) => {
    const cards = quoteController.retriveAllQuotes().sort((x2,x1) => x1[newFilter] - x2[newFilter])

    screen.redraw(cards.map(templates.cardForObject))
  }

  return {
    liked,
    changeFilter
  }

}) ()
