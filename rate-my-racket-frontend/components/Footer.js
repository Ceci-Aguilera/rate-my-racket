import { Row, Col, Container } from "react-bootstrap";
import Link from "next/link"

import styles from "../styles/Footer.module.css";


import { useEffect, useState } from "react";

// import {useContextMenu} from "../context/MenuContext";
// import {useAuth} from "../context/AuthContext";

function Footer() {

// const {user, login, logout} = useAuth();


  return (
    <footer className={styles.footer}>
      <div className={styles.footer_links_div}>
        <Link href="/"><a className={styles.footer_link}>Home</a></Link>
        <Link href="/"><a className={styles.footer_link}>Categories</a></Link>
        <Link href="/"><a className={styles.footer_link}>Brand</a></Link>
        <Link href="/"><a className={styles.footer_link}>Rate</a></Link>
      </div>
    </footer>
  );
}

export default Footer;