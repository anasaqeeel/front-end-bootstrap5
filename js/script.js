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
  console.log("this is new path4.0 >>: ", path);
  const route = routes[path] || routes[404];
  try {
    const response = await fetch(route);
    const html = await response.text();
    const mainContent = document.getElementById("main-content"); // Ensure this is the main container that should hold all content
    if (mainContent) {
      mainContent.innerHTML = html;
      updateVisibility(path); // Additional function to handle visibility
    }
  } catch (error) {
    console.error("Failed to fetch page:", error);
    if (mainContent) {
      mainContent.innerHTML = "Failed to load content.";
    }
  }
};

function updateVisibility(path) {
  const container = document.querySelector(".container");
  const sections = document.querySelectorAll(".who-are-we-section, .what-is-meet-sadiq-section");
  if (path === '/login' || path === '/signup') {
    container.style.display = 'none'; // Hide main content for login/signup
    sections.forEach(sec => sec.style.display = 'none');
  } else {
    container.style.display = ''; // Restore display
    sections.forEach(sec => sec.style.display = '');
  }
}

window.onpopstate = handleLocation;
window.addEventListener('load', handleLocation);
