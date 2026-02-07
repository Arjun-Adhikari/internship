import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <Navbar />
      <div className="max-w-300 mx-auto mt-6">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
