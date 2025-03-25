import React from "react";
import Layout from "../../component/Layout.js";
import "../../styles/Homestyle.css";
import "../../styles/Loginstyle.css";
import "../../styles/Signupstyle.css";
import "../../styles/Aboutstyle.css";
import "../../styles/Menustyle.css";
import "../../styles/Cartstyle.css";
import "../../styles/Paymentstyle.css";
import "../../styles/Confirmstyle.css";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";


const Home = () => {
  return (
    <>
      <Layout>
        <Section1/>
        <Section2/>
        <Section3/>
        <Section4/>
        <Section5/>
      </Layout>
    </>
  );
};
export default Home;