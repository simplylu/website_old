const engines = {
  "german": {
    "correctiv.org": "descr",
    "mimikama.org": "descr",
    "keinfakenews.de": "descr",
    "hoaxsearch.com": "descr",
    "hoaxmap.org": "descr",
    "factsforfriends.de": "descr",
    "faktencheck.afp.com": "descr",
    "dpa-factchecking.com": "descr"
  },
  "english": {
    "snopes.com": "descr",
    "factcheck.org": "descr",
    "politifact.com": "descr",
    "truthorfiction.com": "descr",
  }
}

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
  let logo = document.getElementById("logo");
  let {body} = document;
  logo.src = "media/logo_dark.png";
  body.style.backgroundColor = "#1e1e1e";
  window.localStorage.setItem("theme", "dark");
}

function setLightMode() {
  let logo = document.getElementById("logo");
  let {body} = document;
  logo.src = "media/logo_light.png";
  body.style.backgroundColor = "#e1e1e1";
  window.localStorage.setItem("theme", "light");
}

function helpDialogue() {
  document.getElementById("help").showModal();
}

function aboutDialogue() {
  // loadConnectedServices();
  document.getElementById("about").showModal();
}

function creditsDialogue() {
  document.getElementById("credits").showModal();
}

function craftQuery() {
  let search = document.getElementById("search").value;
  let strict = document.getElementById("strict").checked;
  document.getElementsByName("language").forEach((el) => {
    if (el.checked) {
      language = el.value;
    }
  });
  window.localStorage.setItem("language", language);
  window.localStorage.setItem("strict", strict);
  let query = strict ? '(site:"' + Object.keys(engines[language]).join('" OR site:"') + '") AND "' + search + '"' : '(site:"' + Object.keys(engines[language]).join('" OR site:"') + '") AND ' + search;
  document.getElementById("queryfield").innerText = query;
  document.getElementById("queryview").style.display = "block";
  
  // Set google link
  url = "https://www.google.com/search?q=" + encodeURI(query);
  document.getElementById("open_in_google").href = url;

  // set DDG link
  url = "https://duckduckgo.com/?q=" + encodeURI(query);
  document.getElementById("open_in_duckduckgo").href = url;

  // set metaGer link
  url = "https://metager.de/meta/meta.ger3?eingabe=" + encodeURI(query);
  document.getElementById("open_in_metager").href = url;
}

function hideQuery() {
  document.getElementById("queryview").style.display = "none";
}

function toggleSearchSettings() {
  let el = document.getElementById("search_options");
  if (el.classList.contains("active")) {
    el.classList.remove("active");
  } else {
    el.classList.add("active");
  }
}

// function loadConnectedServices() {
//   let el = document.getElementById("connected_services");
//   Object.keys(engines).forEach((language) => {
//     h4 = document.createElement("h4");
//     h4.textContent = language.toUpperCase();
//     el.appendChild(h4);
//     Object.keys(engines[language]).forEach((item) => {
//       p = document.createElement("p")
//       a = document.createElement("a");
//       a.href = "https://" + item;
//       a.innerText = item + ":";
//       a.target = "_blank"
//       p.appendChild(a);
//       br = document.createElement("br");
//       p.appendChild(br);

//       descr = document.createElement("quote");
//       descr.innerText = engines[language][item];
//       p.appendChild(descr);

//       el.appendChild(p);
//     })
//   })
// }