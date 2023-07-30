function load() {
  for (let el of document.getElementsByTagName("iframe")) {
    el.remove();
  }
  let url = document.getElementById("url").value;
  let tweet = document.getElementById("tweet");
  let bq = document.createElement("blockquote");
  bq.id = "frame";
  bq.classList.add("twitter-tweet");
  let a = document.createElement("a");
  a.href = url;
  bq.appendChild(a);
  tweet.appendChild(bq);
  let script = document.createElement("script");
  script.async = true;
  script.charset = "utf-8";
  script.src = "https://platform.twitter.com/widgets.js";
  tweet.appendChild(script);
  document.getElementById("result").style.display = "block";
  document.getElementById("reporting").style.display = "block";
  document.getElementById("load").style.display = "none";
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const atomic_url = `http://worldtimeapi.org/api/timezone/${tz}.json`

  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);
      document.getElementById("timezone").innerText = tz;
      document.getElementById("unixtime").innerText = data.unixtime;
      document.getElementById("local_time").innerText = `${data.datetime} (${data.abbreviation})`;
      document.getElementById("utc_time").innerText = data.utc_datetime;
      document.getElementById("tweet_url").innerText = url;
      document.getElementById("tweet_id").innerText = url.split("/")[url.split("/").length - 1];
      document.getElementById("account_url").innerText = `${url.split("/status/")[0]}/`;
    }
  };
  xmlhttp.open("GET", atomic_url, true);
  xmlhttp.send();
}

function ui_toggle() {
  document.getElementById('result').style.display = 'none';
  document.getElementById('reporting').style.display = 'none';
  document.getElementById('load').style.display = 'block';
}

// -----
function openTab(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

function init() {
  setDarkMode();
  if (window.location.hash.startsWith("#https://twitter.com")) {
    document.getElementById("url").value = window.location.hash.replace('#', '');
    load();
  }
}

function setDarkMode() {
  let logo = document.getElementById("logo");
  let { body } = document;
  logo.src = "media/xshot_dark.png";
  body.style.backgroundColor = "#1e1e1e";
}

function openDialogue(name) {
  document.getElementById(name).showModal();
  document.body.style.filter = "blur(10px)";
}

function closeDialogue(name) {
  document.getElementById(name).close();
  document.body.style.filter = "";
}