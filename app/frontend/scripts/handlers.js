document.addEventListener("mouseover", function (e) {
    if (e.target.classList.contains("profile-pic") && !window.isMobile) {
      e.target.src="/public/images/roxo.png"
    }
});

document.addEventListener("mouseout", function (e) {
    if (e.target.classList.contains("profile-pic")) {
      e.target.src="/public/images/cinza.png"
    }
});


const handleResponsiveness = () => {
  window.isMobile = window.matchMedia("(max-width: 800px)").matches
}
