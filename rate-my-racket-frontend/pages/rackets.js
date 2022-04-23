import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import { useEffect, useState } from "react"

import axios from "axios"

import { Row, Col, Container, Button } from "react-bootstrap";
import SimpleComments from '../components/SimpleComments';

import RacketsGrid from '../components/RacketsGrid';

const domain = process.env.NEXT_PUBLIC_BACKEND_API_URL

// const categories = ["Spin", "Comfort"]

export default function AllRackets() {


    const [rackets, setRackets] = useState(null)

    useEffect(() => {


        async function FetchRackets() {
            const temp_rackets = await getRackets()
            setRackets(temp_rackets.rackets)
        }

        FetchRackets()

    }, [])

    return (rackets == null) ? <div></div> : (
        <div className={styles.container}>
            <Head>
                <title>Rate My Racket</title>
                <meta name="description" content="Website to rate rackets" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>

                <div className={styles.categories_div}>
                        <h1 className={styles.category_title}>
                            Rackets
                        </h1>

                    <div className={styles.index_categories_list_div}>


                    <RacketsGrid rackets={rackets} />


                    </div>
                </div>
            </main >
        </div >
    )
}


const getRackets = async () => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    const rackets_url = `${domain}/comments-rackets-app/rackets/`


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