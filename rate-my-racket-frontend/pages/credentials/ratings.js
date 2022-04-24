import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/AccountRatings.module.css'

import axios from "axios"

import { useEffect, useState } from "react"

import { Row, Col, Container, Card, Form, Button } from "react-bootstrap";


import { useAuth } from "../../context/AuthContext"

import { useRouter } from 'next/router';

import { MedalIcon, TennisRacketSimpleR, TennisCourtIcon, TennisBallIcon } from "../../components/Icons"
import EditAccountInfoModal from '../../components/EditAccountInfoModal'
import Sidebar from '../../components/Sidebar'

const domain = process.env.NEXT_PUBLIC_BACKEND_API_URL

export default function AccountRatings() {

    const { user } = useAuth()

    const [rackets, setRackets] = useState(null)

    const router = useRouter();

    useEffect(() => {

        async function FetchRackets(id) {
            const temp_rackets = await getRackets(id)
            setRackets(temp_rackets.rackets)
        }

        if (user != null) {
            FetchRackets(user.user.id)
        }
    }, [user])




    return (rackets == null || user == null) ? <div></div> : (
        <div className={styles.container}>
            <Head>
                <title>Account | Rate My Racket</title>
                <meta name="description" content="Account Section of Rate My Racket, a website to rate rackets" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.account_div_wrapper}>

                    <Row className={styles.account_row}>

                        <Col xs={12} sm={12} md={12} lg={2}>
                            <Sidebar />
                        </Col>

                        <Col xs={12} sm={12} md={12} lg={10}>
                            <h1 className={styles.account_ratings_title}>
                                All Ratings and Comments
                            </h1>

                            <div className={styles.account_rating_rackets_div}>

                                <Row className={styles.account_rating_rackets_row}>

                                    {rackets.map((racket, index) => {
                                        return (
                                            <Col key={index} xs={12} sm={12} md={12} lg={4} className={styles.account_rating_rackets_col}>
                                                <div className={styles.rating_rackets_element_div}>
                                                    <div className={styles.rating_rackets_img_div}>
                                                        <img src={racket.image} className={styles.rating_rackets_img} alt="Rated Racket" />
                                                    </div>

                                                    <div className={styles.rating_rackets_racket_title_div}>
                                                        <p className={styles.rating_rackets_racket_title}>
                                                            {racket.brand.title} {racket.title}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Col>
                                        );
                                    })}
                                </Row>
                            </div>
                        </Col>

                    </Row>

                </div>

            </main>
        </div>
    )
}


const getRackets = async (userprofile_id) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    const rackets_url = `${domain}/comments-rackets-app/user-rated-rackets/${userprofile_id}/`


    return axios.get(rackets_url, config).then(async (res) => {
        const result = await res.data;
        return {
            status: "RACKETS_FOUND", rackets: result
        }
    }).catch((error) => {
        return {
            status: "RACKETS_NOT_FOUND", rackets: []
        }
    })
}