import { Outlet, RouterProvider, createMemoryRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import { routes } from "./routes";

function Layout() {
  return (
    <div className="container">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

const router = createMemoryRouter([
  { path: "/", Component: Layout, children: routes },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
