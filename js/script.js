const { response } = require("express");

const route = (event) => {
  event.preventDefault();
  const href = event.target.getAttribute('href');
  window.history.pushState({}, "", href);
  handleLocation();
};

const routes = {
  404: "/404.html",
  "/": "/index.html",
  "/login": "/login.html",
  "/signup": "/signup.html",
};

const handleLocation = async () => {
  const path = window.location.pathname;
  const route = routes[path] || routes[404];
  try {
    const response = await fetch(route);
    const html = await response.text();
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.innerHTML = html;
      reInitScripts(path);  // Call to reinitialize scripts
    }
  } catch (error) {
    console.error("Failed to fetch page:", error);
    if (mainContent) {
      mainContent.innerHTML = "Failed to load content.";
    }
  }
};

function reInitScripts(path) {
  if (path === '/login') {
    // Re-run the login form script initialization
    document.getElementById('loginForm').addEventListener('submit', loginFormHandler);
  }
  else if (path === '/signup') {
    // Re-run the login form script initialization
    document.getElementById('SignUpForm').addEventListener('submit', SignUpFormHandler);
  }
  // You can add more conditions for other paths if needed
}
function loginFormHandler(event) {


}
function SignUpFormHandler(event) {
  event.preventDefault();
  
}
// then -> two args; 1st -> callback func fulfilled case of the promise, 2nd ->  function for the rejected case
// catch -> another then but handles only rejected case

window.onpopstate = handleLocation;
window.addEventListener('load', handleLocation);
