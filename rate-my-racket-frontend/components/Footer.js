import { Row, Col, Container } from "react-bootstrap";

import styles from "../styles/Footer.module.css";


import { useEffect, useState } from "react";

// import {useContextMenu} from "../context/MenuContext";
// import {useAuth} from "../context/AuthContext";

function Footer() {

// const {current_link, setCurrentLinkHelper} = useContextMenu();
// const {user, login, logout} = useAuth();

//     useEffect(() => {
//     // console.log(current_link);
//   }, [current_link])

const {current_link, setCurrentLinkHelper} = useState("Home")


  return (
    <footer className="footer">
    </footer>
  );
}

export default Footer;