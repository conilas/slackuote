/**
  This namespace represents the DOM interactions of the system. Every dom
  select query should go for here instead of going directly to the tom --
  this helps in building a more organized code, in which we will be sure
  where the dom is being accessed via namespace.

  It is exported using IIFE.
*/
const DOM = (function() {

  const getAllCardLines = () => document.querySelectorAll(".cards-line")

  const getCardById = (id) => document.querySelector(`#${CSS.escape(id)}`)

  const getAllCardsFrame = () => document.querySelector(".all-cards")

  const cleanCards = () => getAllCardsFrame().innerHTML = ''

  const getMainQuote = () => document.querySelector("#main-quote")

  const isDiv = (val) => val.tagName == 'DIV'

  return {
    getAllCardLines,
    getCardById,
    getAllCardsFrame,
    cleanCards,
    getMainQuote,
    isDiv
  }

}) ()
