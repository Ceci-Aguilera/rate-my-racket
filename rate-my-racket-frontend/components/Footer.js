import { Row, Col, Container } from "react-bootstrap";
import Link from "next/link"

import styles from "../styles/Footer.module.css";


import { useEffect, useState } from "react";

// import {useContextMenu} from "../context/MenuContext";
import {useAuth} from "../context/AuthContext";

function Footer() {


  const { user, login, logout } = useAuth();


  return (
    <footer className={styles.footer}>
      <div className={styles.footer_links_div}>
        <Link href="/"><a className={styles.footer_link}>Home</a></Link>
        <Link href="/faqs"><a className={styles.footer_link}>FAQs</a></Link>
        <Link href="/categories"><a className={styles.footer_link}>  Features & Categories</a></Link>
        <Link href="/brands"><a className={styles.footer_link}>Brands</a></Link>
        <Link href="/rackets"><a className={styles.footer_link}>All Rackets</a></Link>
        {user == null?<Link href="/credentials/login"><a className={styles.footer_link}>Login</a></Link>:""}
        {user != null?<Link href="/credentials/account"><a className={styles.footer_link}>Account</a></Link>:""}
        {user != null?<Link href="/credentials/logout"><a className={styles.footer_link}>Logout</a></Link>:""}
      </div>
    </footer>
  );
}

export default Footer;