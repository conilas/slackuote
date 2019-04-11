const constants = require('../helper/constants');
const mongojs = require('mongojs')
const db = mongojs(constants.MONGO_IP_DEV)

function QuoteRepository() {
  this.collection = db.quotes
}

QuoteRepository.prototype.create = function(insertable, callback) {
  this.collection.insert(insertable, (err, inserted) => {
    callback(inserted)
  })
};

QuoteRepository.prototype.updateLikes = function(id, likes, callback) {
  this.collection.update({_id: mongojs.ObjectId(id)}, {$set: {likes}}, (err, inserted) => {
    if (callback) callback(inserted)
  })
}

QuoteRepository.prototype.getLast = function() {
  const collection = this.collection

  return new Promise((resolve, reject) => {
    collection.find().sort({ date: -1 })
      .limit(1, (err, [doc]) => {
        if (err) return reject(err)

        resolve(doc)
      })
  })
}

QuoteRepository.prototype.list = function(insertable) {
  const collection = this.collection

  return new Promise((resolve, reject) => {

    collection.find().sort({ date: -1 }, (err, values) => {
      if  (err) return reject(exception)

      resolve(values)
    })

  })
};

module.exports = {QuoteRepository};
