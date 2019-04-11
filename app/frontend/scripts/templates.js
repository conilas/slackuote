// <img src="${profile}" class="profile-pic"><span style="margin-top: -1px;">

/**
  This namespace represents every HTML template used by the application. The
  only one needed so far is the card object, which is created reflecting every
  quote object in the database.
*/
const templates = (function() {

  const cardForObject = (obj) =>
    card(obj.user_name, obj.text, obj.likes, obj.date, obj.pic, obj.realAuthor, obj._id)


  const card = (author, content, likes, date, profile, realAuthor, id) =>
    `<div class="card-container card__one">
    <div class="card">
      <div class="card--display">
        <h2 style="color: #e8e8e9; height: 40px">.</h2>
        <div class="mainbody">
          <p class="own-card-text ow">${content}</p>
          ${
            realAuthor  ? `<p class="own-card-content ow ">${realAuthor.toUpperCase()}</p>` : ``
          }
        </div>
        <div style="max-height: 20px; margin-top: 40px; margin-left: 30px" class="mainfooter">
          <div class="columns">
            <div class="column">
              <p class="own-card-content-author ow">@${author}</p>
            </div>
            <div class="column">
            </div>
            <div class="column">
              <p class="own-card-content-likes ow"><span id="${id}">${likes}</span>
              <img src="/public/images/cinza.png" onclick="actions.liked('${id}')" class="profile-pic">
              </p>
            </div>
          </div>
        </div>
      </div>
  </div>
</div>`

  return {
    card,
    cardForObject
  }

}) ()
