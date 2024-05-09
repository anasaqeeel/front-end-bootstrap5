import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [identifier, setIdentifier] = useState(0);

  useEffect(() => {
    if (identifier === 1) {
      const verifyCredentials = async () => {
        try {
          const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
          });

          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || 'An error occurred');
          }

          setLoginStatus(data.message);
          if (response.status === 200) {
            alert('Login Successful!');
          console.log("i >>: "+identifier)
          setIdentifier(0); // Reset identifier
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error('Error during login:', error);
          setLoginStatus('Error during login. Please try again later.');
          setIdentifier(0); // Reset identifier
          console.log("i >>: "+identifier)
        }
      };

      verifyCredentials();
    }
  }, [identifier]); 


  return (
    <div>
      <div className="container mt-5 pt-5">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1>Login to Meet Sadiq</h1>
            <div>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter email"
                className="form-control"
              />
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter password"
                className="form-control mt-2"
              />
              <button  onClick={()=>setIdentifier(1)} className="btn btn-primary mt-2">Login</button>
            </div>
            {loginStatus && <p className="text-secondary">{loginStatus}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;