import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useFetch from "../customHooks/useFetch";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState(null); // URL will be set after login button click
  const [options, setOptions] = useState(null); // Options for the fetch request    
  const navigate = useNavigate();

  // Handle login button click
  const handleLoginClick = (event) => {
    event.preventDefault(); // Prevent the default form submission

    const loginUrl = "http://localhost:3010/login"; // API endpoint for login
    const loginOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    };

    // Set URL and options for useFetch
    setUrl(loginUrl);
    setOptions(loginOptions);
  };

  // Fetch data based on the URL and options
  const { data, loading, error } = useFetch(url, options);

  // Redirect when login is successful
  useEffect(() => {
    if (data && data.status === "success") {
      navigate("/dashboard"); // Redirect to the dashboard page if login is successful
    }
  }, [data, navigate]);
  
  return (
    <div>
      <h3 className="text-center welcometxt"> Welcome to Leave Management System </h3>
      <div id="loginform" className="container"> 
            <div className="d-flex justify-content-center">
              <div id="login_div_card" className="card">
                <div className="card-header">
                  <h3>Sign In</h3>
                </div>
                <div className="card-body">
                  <form>
                    <div className="input-group form-group mb-3">
                        <label className="input-group-text"><i className="fas fa-user"></i></label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          placeholder="Enter user Name"
                          value={userName}
                          onChange={(event) => setUserName(event.target.value)}
                        />  
                    </div>
                    <div className="input-group form-group mb-3">
                        <label className="input-group-text"><i className="fas fa-key"></i></label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Enter password"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                      <button className="btn btn-primary lgn_btn" onClick={handleLoginClick}>Login</button>
                    </div>
                  </form>
                </div>
                <div className="card-footer">
                  <div className="d-flex justify-content-center links">
                    Don't have an account?<Link to="/signup"> Sign Up</Link>
                  </div>
                </div>
              </div>
            </div>
      </div>
    </div>
  );
}

export default Login;