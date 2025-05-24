import HomePage from "./components/HomePage/HomePage";
import PastesPage from "./components/PastesPage/PastesPage";
import NavBar from "./components/NavBar/NavBar";
import ContactUsPage from "./components/ContactUsPage/ContactUsPage";
import AboutPage from "./components/AboutPage/AboutPage";
import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import ViewPaste from "./components/ViewPaste/ViewPaste";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",

        element: (
          <div>
            <HomePage/>
          </div>
        ),
      },

      {
        path: "pastes",

        element: (
          <div>
            <PastesPage />
          </div>
        ),
      },

      {
        path: "pastes/:id",
        element: 
        <div>
            <ViewPaste />
        </div>,
      },

      {
        path: "about",

        element: (
          <div>
            <AboutPage />
          </div>
        ),
      },

      {
        path: "contactus",
        element: (
          <div>
            <ContactUsPage />
          </div>
        ),
      },
    ],
  },
]);

export default router;
