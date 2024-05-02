document.getElementById('SignUpForm').addEventListener('submit',function (event){
    event.preventDefault();
    var email=document.getElementById('emailInput').value;
    var pass=document.getElementById('passwordInput').value;

    fetch('http://localhost:3000/signUP', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',},
        body: JSON.stringify({ email: email, password: password })
    }).then(response => {
        if (!response.ok) {
            throw new Error('Error occured! :( ', error.message);
        }
        return response.json();
    }).then(data => {
        alert(data.message);
        
    }).catch(error => {
        console.error('Error:', error);
        alert('Error handling request: ' + error.message);
    });
});