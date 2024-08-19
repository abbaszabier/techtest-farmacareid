import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import DetailPokemon from "../pages/Home/detailPokemon";
import ConfirmationUpdatesStock from "../pages/Home/confirmationUpdateStock";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/pokemon/:name",
        element: <DetailPokemon />,
      },
      {
        path: "/pokemon/:name/konfirmasi-update-stok",
        element: <ConfirmationUpdatesStock />,
      },
    ],
  },
]);

export default router;
