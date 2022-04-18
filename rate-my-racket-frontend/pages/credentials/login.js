import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Login.module.css'

import { useEffect, useState } from "react"

import { Row, Col, Container, Card, Form, Button } from "react-bootstrap";


import { useAuth } from "../../context/AuthContext"

import { useRouter } from 'next/router';

export default function Login() {

    const { login } = useAuth()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const onLogin = async (e) => {
        e.preventDefault();

        const body = JSON.stringify({
            username,
            password
        })

        const result = await login(body);
        if (result == "Success") {
            router.push("/")
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Login | Rate My Racket</title>
                <meta name="description" content="Login Section of Rate My Racket, a website to rate rackets" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.login_div_wrapper}>

                    <Card className={styles.login_card}>
                        <Card.Header className={styles.login_card_header}>
                            <h1 className={styles.login_card_header_title}>
                                Login
                            </h1>
                        </Card.Header>
                        <Card.Body className={styles.login_card_body}>
                            <Form className={styles.login_card_form} onSubmit={(e) => onLogin(e)}>
                                <Form.Group className={`mb-3 ${styles.login_card_form_group}`}>
                                    <Form.Label className={styles.login_form_label}>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Username" className={styles.login_form_control}
                                     value={username} onChange={(e) => setUsername(e.target.value)} />
                                </Form.Group>

                                <Form.Group className={`mb-3 ${styles.login_card_form_group}`}>
                                    <Form.Label className={styles.login_form_label}>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter Password" className={styles.login_form_control} 
                                    value={password} onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>

                                <div className={styles.login_card_options_div}>
                                    <p className={styles.login_card_create_account_p}>Forgot Password?
                                    </p><Link href="/"><a className={styles.login_card_link}>Reset Password</a></Link>
                                </div>



                                <div className={styles.login_card_button_div}>
                                    <div className={styles.login_card_create_account_div}>
                                        <p className={styles.login_card_create_account_p}>
                                            Don't have an Account?
                                        </p><Link href="/credentials/register"><a className={styles.login_card_link}>Register</a></Link>
                                    </div>
                                    <Button variant="primary" className={styles.login_button} type="submit">
                                        LOGIN
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </main>
        </div>
    )
}
