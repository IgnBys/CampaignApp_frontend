import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddCampaign from "./campaigns/AddCampaign";
import EditCampaign from "./campaigns/EditCampaign";
import ViewCampaign from "./campaigns/ViewCampaign";
import { EmeraldProvider } from "./campaigns/EmeraldContext";

function App() {
  return (
    <EmeraldProvider>
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addcampaign" element={<AddCampaign />} />
          <Route exact path="/editcampaign/:id" element={<EditCampaign />} />
          <Route exact path="/viewcampaign/:id" element={<ViewCampaign />} />
        </Routes>
      </Router>
    </div>
    </EmeraldProvider>
  );
}

export default App;
