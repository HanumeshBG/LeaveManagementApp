import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useFetch from "../customHooks/useFetch";

function Signup() {
  const [inputs, setInputs] = useState("");
  const [url, setUrl] = useState(null); // URL will be set after login button click
  const [options, setOptions] = useState(null); // Options for the fetch request    
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  // Handle login button click
  const handleSignupClick = (event) => {
    event.preventDefault(); // Prevent the default form submission

    const loginUrl = "http://localhost:3010/signup"; // API endpoint for login
    const loginOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    };

    // Set URL and options for useFetch
    setUrl(loginUrl);
    setOptions(loginOptions);
  };

  // Fetch data based on the URL and options
  const { data, loading, error } = useFetch(url, options);

  // Redirect when login is successful
  useEffect(() => {
    if (data && data.status == "success") {
      navigate("/dashboard"); // Redirect to the dashboard page if login is successful
    }
  }, [data, navigate]);
  
  return (
    <div>
      <div id="signupForm" className="container">
        <div className="d-flex justify-content-center">
            <div className="card">
            <div className="card-header">
                <h3> Sign UP</h3>
            </div>
            <div className="card-body">
                <form>
                <div className="input-group form-group mb-3">
                    <label className="input-group-text"><i className="fas fa-user"></i></label>
                    <input id="first_name" 
                        className="form-control" 
                        type="text" 
                        name="firstName" 
                        value={inputs.firstName}
                        placeholder="Enter First Name" 
                        onChange={ handleChange }
                        required />
                </div>
                <div className="input-group form-group mb-3">
                    <label className="input-group-text"><i className="fas fa-user"></i></label>
                    <input id="last_name" 
                        className="form-control" 
                        type="text" 
                        name="lastName" 
                        value={inputs.lastName}
                        placeholder="Enter Last Name" 
                        onChange={ handleChange }
                        required />
                </div>
                <div className="input-group form-group mb-3">
                    <label className="input-group-text"><i className="fas fa-male"></i></label>
                    <select id="gender" className="form-control" name="gender" value={inputs.gender} onChange={handleChange} required>
                        <option disabled selected value="">Select the Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="input-group form-group mb-3">
                    <label className="input-group-text"><i className="fas fa-phone"></i></label>
                    <input id="mob_no" 
                        className="form-control" 
                        type="text" 
                        name="mobNumber"
                        value={inputs.mobNumber}
                        placeholder="Enter Mobile Number" 
                        onChange={ handleChange }
                        required />
                </div>
                <div className="input-group form-group mb-3">
                    <label className="input-group-text"><i className="fas fa-user"></i></label>
                    <input 
                        id="user_name" 
                        className="form-control" 
                        type="text" 
                        name="userName" 
                        value={inputs.userName}
                        placeholder="Enter User Name" 
                        onChange={ handleChange }
                        required />
                    
                </div>
                <div>
                    <span id="userVerification"></span>
                </div>   
                <div className="input-group form-group mb-3">
                    <label className="input-group-text"><i className="fas fa-key"></i></label>
                    <input 
                        id="password" 
                        className="form-control" 
                        type="password" 
                        name="password" 
                        value={inputs.password}
                        placeholder="Enter your Password" 
                        onChange={ handleChange }
                        required />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary lgn_btn" onClick={ handleSignupClick }>Submit</button>
                </div>
                </form>    
            </div>
            <div className="card-footer">
                <div className="d-flex justify-content-center links">
                Do you have Account? <Link to="/login"> Login</Link>
                </div>
            </div>
            </div>    
        </div>     
        </div>
    </div>
  );
}

export default Signup;