import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { Row, Col } from "react-bootstrap";
import SimpleComments from '../components/SimpleComments';

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
            Some Rackets
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
