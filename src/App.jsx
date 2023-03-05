import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import NoteList from "./pages/NoteList";
import NoteDetail from "./pages/NoteDetail";
import Archived from "./pages/Archived";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/note-list",
    element: <NoteList />,
  },
  {
    path: "/note-detail/:id",
    element: <NoteDetail />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/archived",
    element: <Archived />,
  },
]);

function App() {
  return (
    <div style={{ backgroundColor: "#F0F2F5" }}>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-center" autoClose={2000} closeOnClick />
    </div>
  );
}

export default App;
