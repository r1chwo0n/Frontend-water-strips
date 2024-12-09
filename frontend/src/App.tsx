import "./App.css";
import History from "./component/History";
import Home from "./component/Home";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import Add from "./component/Insert";
import Result from "./component/Result";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/history" element={<History />} />
        <Route path="/Add" element={<Add />}/>
        <Route path="/Result" element={<Result />} />
      </Routes>
    </Router>
      </div>

    </>
  );
}

export default App;
