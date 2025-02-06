import { BrowserRouter,Routes,Route } from "react-router-dom";

import Signup from "./components/signup";
import Login from "./components/login";

import Dashboard from "./components/dashboard";

function App() {
  return (
   <div>
        <BrowserRouter>
            <Routes>
              <Route index element={<Login />} /> 
              <Route path="/dashboard" element= { <Dashboard/>} />
              <Route path="/signup" element= { <Signup/>} />
              <Route path="/login" element= { <Login/>} />            
            </Routes>
        </BrowserRouter>
   </div>
  );
}

export default App;