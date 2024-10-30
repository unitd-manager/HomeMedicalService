import React from "react";
import { Routes, Route, Outlet, HashRouter as Router } from "react-router-dom";

// Elements
import BackToTop from "./elements/back-top";
import PageScrollTop from "./elements/page-scroll-top";

// Layout
import Header from "./layout/header";
import Footer from "./layout/footer";

// All Pages Router
import Index from "./pages/index";
import AboutUs from "./pages/about-us";
import Team from "./pages/team";
import Services from "./pages/services";
import ServiceDetail from "./pages/service-detail";
import FormLogin from "./pages/form-login";
import FormRegister from "./pages/form-register";
import MailVerification from "./pages/mail-verification";
import Faq from "./pages/faq";
import ContactUs from "./pages/contact-us";
import Booking from "./pages/booking";
import BlogGrid from "./pages/blog-grid";
import BlogDetails from "./pages/blog-details";
import Error from "./pages/error-404";
import ResetPassword from "./pages/reset-new-password";
import ForgetPassword from "./pages/forget-password";


const Markup = () => {
  return (
    <>
      {/* {<BrowserRouter basename={'/react/'}> */}
      <Router>
        <Routes>
          <Route element={<ThemeLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/team" element={<Team />} />
            <Route path="/services" element={<Services />} />
            <Route path="/service-detail" element={<ServiceDetail />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/blog-grid" element={<BlogGrid />} />
            <Route path="/blog-details" element={<BlogDetails />} />
            <Route path="*" element={<Error />} />
          </Route>
          <Route path="/form-login" element={<FormLogin />} />
          <Route path="/mail-verification" element={<MailVerification />} />
          <Route path="/form-register" element={<FormRegister />} />
          <Route
            path="/reset-new-password"
            element={<ResetPassword />}
          />
		<Route path="/forget-password" element={<ForgetPassword />} />
        </Routes>
        <PageScrollTop />
      </Router>
      <BackToTop />
    </>
  );
};
function ThemeLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
export default Markup;
