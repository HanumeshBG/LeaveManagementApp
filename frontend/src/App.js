import { BrowserRouter,Routes,Route } from "react-router-dom";

import Signup from "./components/signup";
import Login from "./components/login";

import Dashboard from "./components/dashboardComponents/dashboard";
import ApplyLeave from "./components/leaveComponents/applyLeave"; 
import {AppProvider} from "./appContext";

function App() {
  return (
   <div>
      <AppProvider>
        <BrowserRouter>
            <Routes>
              <Route path="/">
                <Route index element={<Login />} /> 
                <Route path="home/">
                  <Route path="dashboard" element= { <Dashboard/>} />
                  <Route path="applyLeave" element= { <ApplyLeave/>} />
                </Route>
                <Route path="signup" element= { <Signup/>} />
                <Route path="login" element= { <Login/>} />
              </Route>         
            </Routes>
        </BrowserRouter>
      </AppProvider>
   </div>
  );
}

export default App;