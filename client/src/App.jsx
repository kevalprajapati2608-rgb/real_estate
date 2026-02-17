import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import MyListings from "./pages/MyLIstings";
import UpdateListing from "./components/UpdateListings";
import ListingDetail from "./pages/ListingDetail";



const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/update-listing/:id" element={<UpdateListing />} />

        </Route>
        <Route path="/listing/:id" element={<ListingDetail />} />
        <Route path="/update-listing/:id" element={<UpdateListing />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
