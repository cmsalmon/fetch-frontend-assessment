import { Route, createHashRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Protected from "./components/Protected";

function Routing() {
    const router = createHashRouter(
        createRoutesFromElements(
            <Route path='/'>
                <Route element={<Protected/>}>
                     <Route index element={<Home />} />
                </Route>
                <Route path='login' element={<Login/>} />
            </Route>
        )
    );
  return (
     <RouterProvider router={router} />
  );
}

export default Routing