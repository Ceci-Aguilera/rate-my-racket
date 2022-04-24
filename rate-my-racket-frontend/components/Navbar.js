import React from "react";
import Link from "next/link"

import { Navbar, Nav, Container, DropdownButton, Dropdown } from "react-bootstrap";

import styles from "../styles/Navbar.module.css";

import logo from "../public/logos/Rate_My_Racket_Logo.png"

import { useEffect, useState } from "react";
import Image from "next/image";

import { useAuth } from "../context/AuthContext";


function CustomNavbar() {

  const { user, login, logout } = useAuth();


  return (
    <Navbar bg="light" variant="light" className={styles.navbar} collapseOnSelect expand="lg">
      {/* <Container className="navbar-div"> */}
      <Navbar.Brand href="/"
        className={styles.navbar_brand}>
        <Image
          src={logo}
          width="500"
          height="100"
          className="d-inline-block align-top navbar-brand-img"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle className="navbar-toggle" aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className={`ms-auto navbar-nav ${styles.navbar_nav}`}>

          <Link href="/categories">
            {/* <a className={styles.navbar_link}>
              Categories
            </a> */}

            <DropdownButton
              variant={"primary"}
              title={"Categories"}
              className={styles.navbar_link}
            >
              <Dropdown.Item eventKey="1">Action</Dropdown.Item>
              <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
              <Dropdown.Item eventKey="3" active>
                Active Item
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
            </DropdownButton>
          </Link>

          <Link href="/brands">
            <a className={styles.navbar_link}>
              Brands
            </a>
          </Link>



          <Link href="/rackets">
            <a className={styles.navbar_link}>
              All Rackets
            </a>
          </Link>

          {(user == null) ?
            <Link href="/credentials/login">
              <a className={styles.navbar_link}>Login</a>
            </Link>
            : ""}

          {user ?
            <Link href="/credentials/account">
              <a className={styles.navbar_link}>
                Account
              </a>
            </Link>
            : ""}

          {user ?
            <Link href="/">
              <a className={styles.navbar_link}>
                Logout
              </a>
            </Link>
            : ""}

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;