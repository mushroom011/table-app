import { Outlet } from "react-router-dom";
import Navbar from "../navbar";

function App() {
  return (
    <main className="main">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
    </main>
  );
}

export default App;
