import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <footer>footer</footer>
    </div>
  );
};

export default App;
