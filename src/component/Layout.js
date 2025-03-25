import React from "react";
import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";

function Layout({ children }) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
}
export default Layout;
