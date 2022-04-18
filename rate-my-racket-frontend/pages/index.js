import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import { Row, Col, Container } from "react-bootstrap";
import SimpleComments from '../components/SimpleComments';

import top_racket_gold from "../public/images/top_racket_gold.png"
import top_racket_silver from "../public/images/top_racket_silver.png"
import top_racket_bronze from "../public/images/top_racket_bronze.png"


import { StarIcon, StarHalfIcon, UserIcon } from '../components/Icons';

export default function Home() {
  return (
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

              <div className={styles.top_rackets_div}>

                <h1 className={styles.top_rackets_section_title}>
                  Most Rated Rackets
                </h1>

                <Row className={styles.top_rackets_row}>

                  <Col xs={4} sm={4} md={4} lg={4} className={styles.top_rackets_col}>
                    <div className={`${styles.top_rackets_element_div_wrapper} ${styles.top_rackets_element_div_wrapper_silver}`}>

                      <Link href="/#">
                        <div className={`${styles.top_rackets_element_div} ${styles.top_rackets_element_div_silver}`}>
                          <Image src={top_racket_silver} layout="fill" className={styles.top_racket_img} />
                          <div className={styles.top_racket_rate_link_div}>
                            <p className={styles.top_racket_rate_p}>Rate This Racket</p>
                          </div>
                        </div>
                      </Link>




                      <div className={styles.top_stars_div}>

                        {calculateRating(top_rackets.silver.rate, "silver").map((top_star, index) => {
                          return (
                            <div key={index} className={styles.top_star_div}>
                              {top_star}
                            </div>
                          );
                        })}

                        <span className={styles.top_racket_amount_span}>( {top_rackets.silver.amount} <UserIcon height="15" width="15" fill={"#38b6ff"} /> )</span>

                      </div>

                      <p className={styles.top_rackets_p}>#2 {top_rackets.silver.name}</p>
                    </div>



                  </Col>

                  <Col xs={4} sm={4} md={4} lg={4} className={styles.top_rackets_col}>
                    <div className={`${styles.top_rackets_element_div_wrapper} ${styles.top_rackets_element_div_wrapper_gold}`}>

                      <Link href="/#">
                        <div className={`${styles.top_rackets_element_div} ${styles.top_rackets_element_div_gold}`}>
                          <Image src={top_racket_gold} layout="fill" className={styles.top_racket_img} />
                          <div className={styles.top_racket_rate_link_div}>
                            <p className={styles.top_racket_rate_p}>Rate This Racket</p>
                          </div>
                        </div>
                      </Link>



                      <div className={styles.top_stars_div}>

                        {calculateRating(top_rackets.gold.rate, "gold").map((top_star, index) => {
                          return (
                            <div key={index} className={styles.top_star_div}>
                              {top_star}
                            </div>
                          );
                        })}

                        <span className={styles.top_racket_amount_span}>( {top_rackets.gold.amount} <UserIcon height="15" width="15" fill={"#38b6ff"} /> )</span>

                      </div>

                      <p className={styles.top_rackets_p}>#1 {top_rackets.gold.name}</p>
                    </div>



                  </Col>

                  <Col xs={4} sm={4} md={4} lg={4} className={styles.top_rackets_col}>
                    <div className={`${styles.top_rackets_element_div_wrapper} ${styles.top_rackets_element_div_wrapper_bonze}`}>

                      <Link href="/#">
                        <div className={`${styles.top_rackets_element_div} ${styles.top_rackets_element_div_bronze}`}>
                          <Image src={top_racket_bronze} layout="fill" className={styles.top_racket_img} />
                          <div className={styles.top_racket_rate_link_div}>
                            <p className={styles.top_racket_rate_p}>Rate This Racket</p>
                          </div>
                        </div>
                      </Link>


                      <div className={styles.top_stars_div}>

                        {calculateRating(top_rackets.bronze.rate, "#cd7f32").map((top_star, index) => {
                          return (
                            <div key={index} className={styles.top_star_div}>
                              {top_star}
                            </div>
                          );
                        })}

                        <span className={styles.top_racket_amount_span}>( {top_rackets.bronze.amount} <UserIcon height="15" width="15" fill={"#38b6ff"} /> )</span>

                      </div>

                      <p className={styles.top_rackets_p}>#3 {top_rackets.bronze.name}</p>

                    </div>



                  </Col>

                </Row>

              </div>

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

const calculateRating = (rate, color) => {
  var array_of_stars = []

  const star_size = "20";

  for (var i = 0; i < rate; i++) {
    if (i + 1 <= rate) {
      array_of_stars.push(<StarIcon height={star_size} width={star_size} fill={color} />)
    }
    else {
      array_of_stars.push(<StarHalfIcon height={star_size} width={star_size} fill={color} />)
    }
  }

  return array_of_stars

}

// TODO  This should be provided by the Backend API
const top_rackets = {
  gold: {
    name: "BABOLAT Boost Aero",
    rate: 5.0,
    amount: 5000
  },
  silver: {
    name: "HEAD Speed MP",
    rate: 4.5,
    amount: 4500
  },
  bronze: {
    name: "WILSON Blade 104 V7",
    rate: 4.8,
    amount: 3000
  }
}