const express = require("express");
const router = express.Router();
const httpHelper = require("../helper/http_functions")
const quote = require("../repository/quote")
const emitter = require("../helper/emitter")
const quoteRepository = new quote.QuoteRepository();
const fetch = require('node-fetch');

/**
  Slack integration to get the user picture profile in order to save it on the database.

  @param {string} userId the id that will be fethced from the slack api
  @returns {object} the profile containing all the data (including the requested profile picture)
*/
const getUserPic = async (userId) => {
  const endpoint = `https://slack.com/api/users.profile.get?token=xoxp-590246583170-605189855815-607249605799-c30e45aa5c4b3cbc2294f347b6655d09&user=${userId}`
  const profile = await fetch(endpoint).then(x => x.json())
  return profile
}

/**
  This function serves to process a quote value, parsing the syntax for the
  quote trying to find the 'by' parameter, which will indicate the author of
  the quote.

  @param {string} quote the whole input from the slack api
  @returns {object} an object containing the text and the an Maybe<author>
*/
const processText = (quote)  => {
  const [text, realAuthor] = quote.split("by:")

  return {
    text,
    realAuthor: realAuthor ? realAuthor.trim() : realAuthor
  }

}

router.post("/", async (req, res, next) => {
  const profile = (await getUserPic(req.body.user_id)).profile.image_48

  const {text, realAuthor} = processText(req.body.text)

  const mountedBody = {...req.body, text, realAuthor, date: new Date().getTime(), pic: profile, likes: 0}

  quoteRepository.create(mountedBody, (inserted) => emitter.emit('newquote', JSON.stringify(inserted)))

  return res.status(200).json(req.body)
});

router.put("/", async (req, res, next) => {
  const {likes, id} = req.body

  quoteRepository.updateLikes(id, likes)

  return res.status(200).json(req.body)
})

router.get("/last", async (req,res,next) => {
  const lastQuote = await quoteRepository.getLast()

  return res.status(200).json(lastQuote)
})

router.get("/", async (req, res, next) => {
  const allQuotes = await quoteRepository.list()

  return res.status(200).json(allQuotes)
});

module.exports = router;
