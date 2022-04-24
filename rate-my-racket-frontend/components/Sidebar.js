import React from "react";
import Link from "next/link"

import { Container } from "react-bootstrap";

import styles from "../styles/Sidebar.module.css";


import { useEffect, useState } from "react";
import Image from "next/image";

import { useAuth } from "../context/AuthContext";


function Sidebar() {

    const { user } = useAuth();


    return (
        <div className={styles.sidebar_div}>

            <div className={`${styles.sidebar_bar_div}`}>

                <h2 className={styles.sidebar_title}>Sidebar</h2>

                <Link href="/credentials/account">
                    <a className={styles.sidebar_link}>
                        Account
                    </a>
                </Link>

                <Link href="/credentials/ratings">
                    <a className={styles.sidebar_link}>
                        Ratings
                    </a>
                </Link>

                <Link href="/credentials/top-rackets">
                    <a className={styles.sidebar_link}>
                        Top 3 Rackets
                    </a>
                </Link>

            </div>
        </div>
    );
}

export default Sidebar;