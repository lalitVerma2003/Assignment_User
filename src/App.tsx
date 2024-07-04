import FormPage from "./pages/FormPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DataPage from "./pages/DataPage";
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <>
      <Router>
      <div>
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/data" element={<DataPage />} />
        </Routes>
        <ToastContainer position="bottom-center" />
      </div>
    </Router>
    </>
  );
}

export default App;
