import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Login.module.css'

import { useEffect, useState } from "react"

import { Row, Col, Container, Card, Form, Button } from "react-bootstrap";


import { useAuth } from "../../context/AuthContext"

import { useRouter } from 'next/router';

export default function Register() {

    const { register } = useAuth()

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [re_password, setRePassword] = useState("");

    const router = useRouter();

    const onRegister = async (e) => {
        e.preventDefault();

        const body = JSON.stringify({
            username,
            email,
            password
        })
        if(password == re_password){

            const result = await register(body);
            if (result == "Success") {
                router.push("/")
            }
        }

        // TODO Show Modal of passwords do not match
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Register | Rate My Racket</title>
                <meta name="description" content="Register Section of Rate My Racket, a website to rate rackets" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.login_div_wrapper}>

                    <Card className={styles.login_card}>
                        <Card.Header className={styles.login_card_header}>
                            <h1 className={styles.login_card_header_title}>
                                Register
                            </h1>
                        </Card.Header>
                        <Card.Body className={styles.login_card_body}>
                            <Form className={styles.login_card_form} onSubmit={(e) => onRegister(e)}>
                                <Form.Group className={`mb-3 ${styles.login_card_form_group}`}>
                                    <Form.Label className={styles.login_form_label}>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Username" className={styles.login_form_control}
                                    value={username} onChange={(e) => setUsername(e.target.value)} />
                                </Form.Group>

                                <Form.Group className={`mb-3 ${styles.login_card_form_group}`}>
                                    <Form.Label className={styles.login_form_label}>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter Email" className={styles.login_form_control} 
                                        value={email} onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>

                                <Form.Group className={`mb-3 ${styles.login_card_form_group}`}>
                                    <Form.Label className={styles.login_form_label}>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter Password" className={styles.login_form_control} 
                                    value={password} onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>

                                <Form.Group className={`mb-3 ${styles.login_card_form_group}`}>
                                    <Form.Label className={styles.login_form_label}>Confirm Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter Password" className={styles.login_form_control} 
                                    value={re_password} onChange={(e) => setRePassword(e.target.value)} />
                                </Form.Group>


                                <div className={styles.register_card_button_div}>
                                    <Button variant="primary" className={styles.login_button} type="submit">
                                        REGISTER
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
