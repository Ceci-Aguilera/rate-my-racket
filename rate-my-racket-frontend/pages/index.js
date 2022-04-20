import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import { useEffect, useState } from "react"

import axios from "axios"

import { Row, Col, Container } from "react-bootstrap";
import SimpleComments from '../components/SimpleComments';

import TopRackets from '../components/TopRackets';

const domain = process.env.NEXT_PUBLIC_BACKEND_API_URL

export default function Home() {

  
  const [top_rated_rackets, setTopRatedRackets] = useState(null)

  useEffect(() => {

      async function FetchTopRatedRackets() {
          const temp_rackets = await getTopRated()
          setTopRatedRackets(temp_rackets.rackets)
      }

          FetchTopRatedRackets()

  }, [])

  return (top_rated_rackets == null)?<div></div>:(
    <div className={styles.container}>
      <Head>
        <title>Rate My Racket</title>
        <meta name="description" content="Website to rate rackets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.index_div_wrapper}>
          <Row className={styles.index_row}>
            <Col xs={12} sm={12} md={12} lg={8} className={styles.index_col}>

            <h1 className={styles.top_rackets_section_title}>
                Best Overall Rackets
            </h1>

              <TopRackets rackets={top_rated_rackets} />

            </Col>

            <Col xs={12} sm={12} md={12} lg={4} className={styles.index_col}>
              <SimpleComments />
            </Col>
          </Row>
        </div>
      </main>
    </div>
  )
}


const getTopRated = async () => {
  const config = {
      headers: {
          "Content-Type": "application/json",
      }
  }

  const top_rated_url = `${domain}/comments-rackets-app/top-principal-rated/`


  return axios.get(top_rated_url, config).then(async (res) => {
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