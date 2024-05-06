import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/ui/Layout";
import HomePage from "../components/Pages/HomePage";
import RegisterPage from "../components/Pages/RegisterPage";
import LoginPage from "../components/Pages/LoginPage";
import ProfilePage from "../components/Pages/ProfilePage";
import VenueDetailsPage from "../components/Pages/VenueDetailsPage";
import AddVenuePage from "../components/Pages/AddVenuePage";
import EditVenuePage from "../components/Pages/EditVenuePage";
import ContactPage from "../components/Pages/ContactPage";
import AboutPage from "../components/Pages/AboutPage";
import BookingConfirmationPage from "../components/Pages/BookingConfirmationPage";
import PageNotFound from "../components/Pages/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "profile/:name",
        element: <ProfilePage />,
      },
      {
        path: "venues/:id",
        element: <VenueDetailsPage />,
      },
      {
        path: "venues/add",
        element: <AddVenuePage />,
      },
      {
        path: "venues/:id/edit",
        element: <EditVenuePage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "booking-confirmation/:id",
        element: <BookingConfirmationPage />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
