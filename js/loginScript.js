
document.getElementById('loginForm').addEventListener('submit', function (event) {
     event.preventDefault();
    //checks
    var email = document.getElementById('emailInput').value;
    var password = document.getElementById('passwordInput').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',},
        body: JSON.stringify({ email: email, password: password }) // from js obj -> json str
    }).then(response => {
        if (!response.ok) {
            throw new Error('Error occured! :( ');
        }
        return response.json();
    }).then(data => {
        alert(data.message);
        
    }).catch(error => {
        console.error('Error:', error);
        alert('Error handling request: ' + error.message);
    });

});