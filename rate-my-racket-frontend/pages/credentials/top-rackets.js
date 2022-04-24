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

export default function AccountTopRackets() {

    const { user } = useAuth()

    const [categories, SetCategories] = useState(null)

    const router = useRouter();

    useEffect(() => {

        async function FetchCategories(id) {
            const temp_categories = await getCategories(id)
            SetCategories(temp_categories.categories)
        }

        if (user != null) {
            FetchCategories(user.user.id)
        }
    }, [user])

    console.log(categories)




    return (categories == null || user == null) ? <div></div> : (
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
                                Top Rackets
                            </h1>


                            <div className={styles.account_rating_rackets_div}>

                                {categories.map((cat, cat_index) => {
                                    return (

                                        <div key={cat_index} className={styles.account_rating_cat_rackets_div}>

                                            <h2 className={styles.account_rating_cat_rackets_title}>{cat.category.title}</h2>

                                            <Row className={styles.account_rating_rackets_row}>


                                                <Col xs={12} sm={12} md={12} lg={4} className={styles.account_rating_rackets_col}>
                                                    <div className={styles.rating_rackets_element_div}>
                                                        <div className={styles.rating_rackets_img_div}>
                                                            <img src={cat.silver_racket.image} className={styles.rating_rackets_img} alt="Rated Racket" />
                                                        </div>

                                                        <div className={styles.rating_rackets_racket_title_div}>
                                                            <p className={`${styles.rating_rackets_racket_title} ${styles.rating_rackets_silver_racket_title}`}>
                                                               #2 {cat.silver_racket.brand.title} {cat.silver_racket.title}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Col>

                                                <Col xs={12} sm={12} md={12}  lg={4} className={styles.account_rating_rackets_col}>
                                                    <div className={styles.rating_rackets_element_div}>
                                                        <div className={styles.rating_rackets_img_div}>
                                                            <img src={cat.gold_racket.image} className={styles.rating_rackets_img} alt="Rated Racket" />
                                                        </div>

                                                        <div className={styles.rating_rackets_racket_title_div}>
                                                            <p className={`${styles.rating_rackets_racket_title} ${styles.rating_rackets_gold_racket_title}`}>
                                                                #1 {cat.gold_racket.brand.title} {cat.gold_racket.title}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Col>

                                                <Col xs={12} sm={12} md={12} lg={4} className={styles.account_rating_rackets_col}>
                                                    <div className={styles.rating_rackets_element_div}>
                                                        <div className={styles.rating_rackets_img_div}>
                                                            <img src={cat.bronze_racket.image} className={styles.rating_rackets_img} alt="Rated Racket" />
                                                        </div>

                                                        <div className={styles.rating_rackets_racket_title_div}>
                                                            <p className={`${styles.rating_rackets_racket_title} ${styles.rating_rackets_bronze_racket_title}`}>
                                                                #3 {cat.bronze_racket.brand.title} {cat.bronze_racket.title}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>

                                        </div>
                                    );
                                })}
                            </div>
                        </Col>

                    </Row>

                </div>

            </main>
        </div>
    )
}


const getCategories = async (userprofile_id) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    const categories_url = `${domain}/comments-rackets-app/top-rackets-category/${userprofile_id}/`


    return axios.get(categories_url, config).then(async (res) => {
        const result = await res.data;
        return {
            status: "CATEGORIES_FOUND", categories: result
        }
    }).catch((error) => {
        return {
            status: "CATEGORIES_NOT_FOUND", categories: []
        }
    })
}