import React, { useState, useEffect, useContext } from "react";
import Navbar from "../navbar";
import useFetch from "../../customHooks/useFetch";
import AppContext from "../../appContext"; 
import UsersWidget from "./usersWidget";
import LeaveStatusWidget from "./leaveStatusWidget";  
import CalendarEvents from "./calendar";

function Dashboard() {
   const { data, setData } = useContext(AppContext);
   const { data: fetchedData, loading, error } = useFetch('http://localhost:3010/home/dashboard');

   useEffect(() => {
      console.log(fetchedData);
      if(fetchedData){
         setData((prevData) => ({
            ...prevData,
            UserList: fetchedData.users
         }));
      }      
   }, [fetchedData]);

    return (
     <div>
        <Navbar />
        <div className="container-fluid" id="dashboard">
            <div className="row">
               <div id="dashboardleftpanel" className="col-sm-3">
                     <UsersWidget />
                     <LeaveStatusWidget />
               </div>   
               <div id="dashboardrightpanel" className="col-sm-9">
                     {/* <div id="dashboard_searchOptions">
                        <div id="main_searchUser">
                           <label for="userSearchInput">User : </label>
                           <input type="text" id="userSearchInput" placeholder="Enter Name.." className="filter" />
                        </div>
                        <div id="main_searchStatus">
                           <label for="statusSearchInput">Status : </label>
                           <select id="statusSearchInput" className="filter">
                                 <option value="">All</option>
                                 <option value="applied">Applied</option>
                                 <option value="approved">Approved</option>
                                 <option value="rejected">Rejected</option>
                           </select> 
                        </div>
                        <div id="main_searchCategory">
                           <label for="categorySearchInput">Category : </label>
                           <select id="categorySearchInput" className="filter">
                                 <option value="">All</option>
                                 <option value="casual">Casual</option>
                                 <option value="sick">Sick</option>
                                 <option value="personal">Personal</option>
                                 <option value="other">Other</option>
                           </select>
                        </div>
                        <div id="main_searchDate">
                           <label for="l_searchDate">Date :</label>
                           <div id="l_searchDate">
                                 From :
                                 <input className="searchDate"  type="date" id="startdateSearch" name="search_sdate" value="" />
                                 TO :
                                 <input className="searchDate" type="date" id="enddateSearch" name="search_edate" value="" />
                           </div>
                        </div>
                     </div>
                     <div id="bulkUpdateStatus">
                        <button id='approveLeave' className="btn btn-primary bulkUpdateStatus" value="approved">Approved</button>
                        <button id='rejectLeave' className="btn btn-primary bulkUpdateStatus" value="rejected">Reject</button>
                     </div> */}
                     <CalendarEvents />
               </div>
            </div>
         </div>
     </div>
    );
  }
  
  export default Dashboard;