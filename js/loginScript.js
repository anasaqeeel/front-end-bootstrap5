
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
   //checks
   
   var email = document.getElementById('emailInput').value;
   var password = document.getElementById('passwordInput').value;
   
  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, password: password })
}).then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json(); // Parse JSON response
}).then(data => {
    alert(data.message); // Display the message from the server
}).catch(error => {
    console.error('Error:', error);
    alert('Error handling request: ' + error.message);
});

   

});