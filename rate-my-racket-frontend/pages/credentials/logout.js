import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Login.module.css'

import { useEffect, useState } from "react"

import { Row, Col, Container, Card, Form, Button } from "react-bootstrap";


import { useAuth } from "../../context/AuthContext"

import { useRouter } from 'next/router';

export default function Logout() {

    const { user, logout } = useAuth()

    const router = useRouter();


    useEffect(() => {

        async function onLogout(){

            const result = await logout();
            if (result == "Success") {
                router.push("/")
            }
        }

        if(user != null){
            onLogout();
        }

    }, [user])

        

    return (
        <div className={styles.container}>
            <Head>
                <title>Logout | Rate My Racket</title>
                <meta name="description" content="Login Section of Rate My Racket, a website to rate rackets" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.login_div_wrapper}>
                </div>
            </main>
        </div>
    )
}
