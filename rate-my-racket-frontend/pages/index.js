import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import { useEffect, useState } from "react"

import axios from "axios"

import { Row, Col, Container, Button } from "react-bootstrap";
import SimpleComments from '../components/SimpleComments';

import TopRackets from '../components/TopRackets';

const domain = process.env.NEXT_PUBLIC_BACKEND_API_URL

// const categories = ["Spin", "Comfort"]

export default function Home() {


  const [top_rated_rackets, setTopRatedRackets] = useState(null)
  const [categories, setCategories] = useState(null)

  useEffect(() => {

    async function FetchTopRatedRackets() {
      const temp_rackets = await getTopRated()
      setTopRatedRackets(temp_rackets.rackets)
    }

    async function FetchCategories() {
      const temp_categories = await getCategories()
      setCategories(temp_categories.categories)
    }

    FetchTopRatedRackets()
    FetchCategories()

  }, [])

  return (top_rated_rackets == null || categories == null) ? <div></div> : (
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

          <div className={styles.index_categories_div}>
            <div className={styles.index_categories_title_div}>
              <h2 className={styles.index_categories_title}>
                Best Rackets For
              </h2>
            </div>

            <div className={styles.index_categories_list_div}>


              {categories.map((cat, index) => {
                return (
                  <div key={index} className={styles.index_categories_element_div}>
                    <h3 className={styles.index_categories_element_title}>
                      {cat.title}
                    </h3>


                    <TopRackets rackets={cat.top_rackets} usePoints={true} points={cat.points} />

                    <div className={styles.index_categories_element_button_div}>
                      <Button href={`/categories/${cat.id}`} variant="primary" className={styles.index_categories_element_button}>
                        View All
                      </Button>
                    </div>
                  </div>
                );
              })}


            </div>
          </div>
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

const getCategories = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  }

  const categories_url = `${domain}/comments-rackets-app/categories/`


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