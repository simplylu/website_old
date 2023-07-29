function init() {
  let theme = localStorage.getItem("theme");
  if (theme) {
    if (theme === "dark") {
      setDarkMode();
    } else if (theme === "light") {
      setLightMode();
    } else {
      alert("Don't mess with the localStorage!");
    }
  } else {
    setDarkMode();
  }

  let strict = localStorage.getItem("strict");
  if (strict) {
    document.getElementById("strict").checked = strict;
  } else { 
    window.localStorage.setItem("strict", false);
  }

  let language = localStorage.getItem("language");
  if (language) {
    document.getElementById(language).checked = true;
  } else {
    window.localStorage.setItem("language", "german");
    document.getElementById("german").checked = true;
  }
}

function setDarkMode() {
  let {body} = document;
  let metafacts = document.getElementById("metafacts");
  let betterlinkie = document.getElementById("betterlinkie");
  metafacts.src = "media/metafacts_dark.png"
  betterlinkie.src = "media/betterlinkie_dark.png"
  body.style.backgroundColor = "#1e1e1e";
  window.localStorage.setItem("theme", "dark");
}

function setLightMode() {
  let {body} = document;
  let metafacts = document.getElementById("metafacts");
  let betterlinkie = document.getElementById("betterlinkie");
  metafacts.src = "media/metafacts_light.png"
  betterlinkie.src = "media/betterlinkie_light.png"
  body.style.backgroundColor = "#e1e1e1";
  window.localStorage.setItem("theme", "light");
}