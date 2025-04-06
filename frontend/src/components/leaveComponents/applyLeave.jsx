import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../appContext";
import Navbar from "../navbar";
import useFetch from "../../customHooks/useFetch";
import { useNavigate } from "react-router-dom";

const ApplyLeave = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        UID: '',
        l_reason: '',
        l_status: 'applied', // default value for reason radio button
        l_category: 'casual', // default value for category radio button
        l_startdate: '',
        l_enddate: '',
        l_description: '',
      });
    const { data } = React.useContext(AppContext)
    const [url, setUrl] = useState(null); // URL will be set after submit button click
    const [options, setOptions] = useState(null); // Options for the fetch request 
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    }

    // Handle Submit button click
    const handleSubmitClick = (event) => {
        event.preventDefault(); // Prevent the default form submission
        console.log(inputs);

        let Url = "http://localhost:3010/home/applyleave"; // API endpoint for login
        let Options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
        };

        // Set URL and options for useFetch
        setUrl(Url);
        setOptions(Options);
    };

    // Fetch data based on the URL and options
    const { data:fetchedData, loading, error } = useFetch(url, options);

    // Redirect when login is successful
    useEffect(() => {
        if (fetchedData && fetchedData.status == "success") {
            navigate("/home/dashboard"); // Redirect to the dashboard page if login is successful
        }
    }, [fetchedData]);

    return(
        <div>
            <Navbar />
            <div className="container bgSetting">
                <form>
                    <div className="form-group row">
                        <label className="col-sm-3" for="sel1">Name: </label>
                        <div className="col-sm-9">
                            <select id="l_name" className="form-control" name="UID" value={inputs.UID} onChange={handleChange} required>
                                <option disabled selected value="">----- Select Name -----</option>
                                {data.UserList && data.UserList.map((user) => (
                                    <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>
                                ))} 
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3" for="l_reason">Leave Reason:</label>
                        <div className="col-sm-9" id="l_reason" >
                            <input id="l_reason" 
                                className="form-control" 
                                type="text" 
                                name="l_reason" 
                                value={inputs.l_reason}
                                placeholder="Enter Leave Reason" 
                                onChange={ handleChange }
                                required 
                            /> 
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3" for="l_status">Leave Status:</label>
                        <div className="col-sm-9">
                            <ul className="donate-now" id="l_status">
                                <li>
                                    <input
                                        type="radio"
                                        id="applied"
                                        name="l_reason"
                                        value="applied"
                                        checked={inputs.l_status === 'applied'}
                                        onChange={ handleChange }
                                    />
                                    <label for="applied">Applied</label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id="approved"
                                        name="l_status"
                                        value="approved"
                                        checked={inputs.l_status === 'approved'}
                                        onChange={ handleChange }
                                        disabled
                                    />
                                    <label for="approved">Approved</label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id="rejected"
                                        name="l_status"
                                        value="rejected"
                                        checked={inputs.l_status === 'rejected'}
                                        onChange={ handleChange }
                                        disabled
                                    />
                                    <label for="rejected">Rejected</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3" for="l_category">Leave Category:</label>
                        <div className="col-sm-9">
                            <ul className="donate-now" id="l_category">
                                <li>
                                    <input
                                        type="radio"
                                        id="casual"
                                        name="l_category"
                                        value="casual"
                                        checked={inputs.l_category === 'casual'}
                                        onChange={ handleChange }
                                        required
                                    />
                                    <label for="casual">Casual</label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id="sick"
                                        name="l_category"
                                        value="sick"
                                        checked={inputs.l_category === 'sick'}
                                        onChange={ handleChange }
                                    />
                                    <label for="sick">Sick</label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id="personal"
                                        name="l_category"
                                        value="personal"
                                        checked={inputs.l_category === 'personal'}
                                        onChange={ handleChange }
                                    />
                                    <label for="personal">Personal</label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id="others"
                                        name="l_category"
                                        value="others"
                                        checked={inputs.l_category === 'others'}
                                        onChange={ handleChange }
                                    />
                                    <label for="others">Other</label>
                                </li>
                                <li id="li_maternity">
                                    <input
                                        type="radio"
                                        id="maternity"
                                        name="l_category"
                                        value="maternity"
                                        checked={inputs.l_category === 'maternity'}
                                        onChange={ handleChange }
                                    />
                                    <label for="maternity">Maternity</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div id="divForMaternityLabel" className="form-group row" hidden>
                        <label className="col-sm-9 offset-sm-3"> You can apply upto <span id="spanForMaternityDays"></span> days maternity leave without loss of pay.</label>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3" for="l_date">Date Duration:</label>
                        <div className="col-sm-9" id="l_date">
                            From:
                            <input id="l_startdate" 
                                type="date" 
                                name="l_startdate" 
                                value={inputs.l_startdate}
                                onChange={ handleChange }
                            />
                            TO:
                            <input id="l_enddate" 
                                type="date" 
                                name="l_enddate" 
                                value={inputs.l_enddate}
                                onChange={ handleChange }
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3" for="l_description">Leave Description:</label>
                        <div className="col-sm-9">
                            <input id="l_description" 
                                className="form-control" 
                                type="text" 
                                name="l_description" 
                                value={inputs.l_description}
                                placeholder="Enter description" 
                                onChange={ handleChange }
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3" for="l_files">Files:</label>
                        <input type="file" id="l_files" className="col-sm-9" name="uploadfiles" value=""/>
                        <div className="col-sm-6 col-sm-offset-3" id="displayArea"></div>
                    </div>
                    <div>
                        <button className="btn btn-primary" onClick={ handleSubmitClick }>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ApplyLeave;