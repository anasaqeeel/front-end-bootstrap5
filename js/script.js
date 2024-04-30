// Function to fetch and display content
function loadPage(page) {
    fetch(page)
      .then(response => response.text())
      .then(html => {
        document.getElementById('page-content').innerHTML = html;
      })
      .catch(err => {
        console.error('Failed to load page: ', err);
      });
  }
  
  // Function to handle hash changes
  function handleHashChange() {
    if (location.hash === '#login') {
      loadPage('login.html');
    } else if (location.hash === '#signup') {
      loadPage('signup.html');
    } else {
      // Load a default page or clear the content
      document.getElementById('page-content').innerHTML = '<p>Welcome to the site. Use the navigation to get started.</p>';
    }
  }
  
  // Attach event listeners
  window.addEventListener('hashchange', handleHashChange);
  window.addEventListener('load', handleHashChange);
  