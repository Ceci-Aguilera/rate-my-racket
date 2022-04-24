import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/TopRackets.module.css'

import { Row, Col, Container, Card, Button } from "react-bootstrap";


import { StarIcon, StarHalfIcon, UserIcon } from '../components/Icons';

function TopRackets({ rackets, usePoints = false, points = [] }) {

    console.log(rackets)

    return (rackets == null) ? <div></div> : (


        <div className={styles.top_rackets_div}>

            <Row className={styles.top_rackets_row}>

                <Col xs={12} sm={12} md={12} lg={4} className={styles.top_rackets_col}>
                    {rackets[1] == undefined ? <div></div> :
                        <Card className={`${styles.top_racket_card} ${styles.top_racket_card_silver}`}>

                            <Card.Body className={styles.top_racket_card_body}>

                                <div className={`${styles.top_rackets_element_div_wrapper} ${styles.top_rackets_element_div_wrapper_silver}`}>

                                    <Link href={`/racket-details/${rackets[1].id}`}>
                                        <div className={`${styles.top_rackets_element_div} ${styles.top_rackets_element_div_silver}`}>
                                            <div className={styles.top_racket_silver_img}>
                                                <img src={rackets[1].image} alt="Silver Racket" className={`${styles.top_racket_img} ${styles.top_racket_silver_img}`} />
                                            </div>
                                        </div>
                                    </Link>




                                    <div className={styles.top_stars_div}>
                                        {usePoints ?
                                            <span className={styles.top_rackets_points} style={{ color: "silver" }}>{parseFloat(points[1].points).toFixed(2)} Points</span>
                                            : <span className={styles.top_rackets_points} style={{ color: "silver" }}>{rackets[1].points} Points</span>

                                        }

                                    </div>

                                    <p className={styles.top_rackets_p}><span style={{ color: "silver" }} className={styles.top_rackets_points}>#2</span> {rackets[1].title}
                                        <span className={styles.top_racket_amount_span}>( {rackets[1].amount_of_votes} <UserIcon height="15" width="15" fill={"#38b6ff"} /> )</span>
                                    </p>
                                </div>

                            </Card.Body>

                            <Card.Footer className={styles.top_rackets_card_footer}>
                                <Button href={`/racket-details/${rackets[1].id}`} variant="outline-primary" className={styles.top_rackets_card_footer_button_outline}>
                                    Details
                                </Button>

                                <Button href={`/rate/${rackets[1].id}`} variant="primary" className={styles.top_rackets_card_footer_button_no_outline}>
                                    Rate
                                </Button>
                            </Card.Footer>
                        </Card>

                    }
                </Col>

                <Col xs={12} sm={12} md={12} lg={4} className={styles.top_rackets_col}>
                    {rackets[0] == undefined ? <div></div> :
                        <Card className={`${styles.top_racket_card} ${styles.top_racket_card_gold}`}>

                            <Card.Body className={styles.top_racket_card_body}>
                                <div className={`${styles.top_rackets_element_div_wrapper} ${styles.top_rackets_element_div_wrapper_gold}`}>

                                    <Link href={`/racket-details/${rackets[0].id}`}>
                                        <div className={`${styles.top_rackets_element_div} ${styles.top_rackets_element_div_gold}`}>
                                            <img src={rackets[0].image} alt="Gold Racket" className={`${styles.top_racket_img} ${styles.top_racket_gold_img}`} />
                                        </div>
                                    </Link>



                                    <div className={styles.top_stars_div}>
                                        {usePoints ?
                                            <span className={styles.top_rackets_points} style={{ color: "goldenrod" }}>{parseFloat(points[0].points).toFixed(2)} Points</span>
                                            : <span className={styles.top_rackets_points} style={{ color: "goldenrod" }}>{rackets[0].points} Points</span>

                                        }
                                    </div>


                                    <p className={styles.top_rackets_p}><span style={{ color: "goldenrod" }} className={styles.top_rackets_points}>#1</span> {rackets[0].title}
                                        <span className={styles.top_racket_amount_span}>( {rackets[0].amount_of_votes} <UserIcon height="15" width="15" fill={"#38b6ff"} /> )</span>
                                    </p>
                                </div>


                            </Card.Body>

                            <Card.Footer className={styles.top_rackets_card_footer}>
                                <Button href={`/racket-details/${rackets[0].id}`} variant="outline-primary" className={styles.top_rackets_card_footer_button_outline}>
                                    Details
                                </Button>

                                <Button href={`/rate/${rackets[0].id}`} variant="primary" className={styles.top_rackets_card_footer_button_no_outline}>
                                    Rate
                                </Button>
                            </Card.Footer>

                        </Card>
                    }
                </Col>

                <Col xs={12} sm={12} md={12} lg={4} className={styles.top_rackets_col}>
                    {rackets[2] == undefined ? <div></div> :
                        <Card className={`${styles.top_racket_card} ${styles.top_racket_card_bronze}`}>


                            <Card.Body className={styles.top_racket_card_body}>

                                <div className={`${styles.top_rackets_element_div_wrapper} ${styles.top_rackets_element_div_wrapper_bonze}`}>

                                    <Link href={`/racket-details/${rackets[2].id}`}>
                                        <div className={`${styles.top_rackets_element_div} ${styles.top_rackets_element_div_bronze}`}>
                                            <img src={rackets[2].image} alt="Bronze Racket" className={`${styles.top_racket_img} ${styles.top_racket_bronze_img}`} />
                                        </div>
                                    </Link>


                                    <div className={styles.top_stars_div}>

                                        {usePoints ?
                                            <span className={styles.top_rackets_points} style={{ color: "#cd7f32" }}>{parseFloat(points[2].points).toFixed(2)} Points</span>
                                            : <span className={styles.top_rackets_points} style={{ color: "#cd7f32" }}>{rackets[2].points} Points</span>

                                        }


                                    </div>


                                    <p className={styles.top_rackets_p}><span style={{ color: "#cd7f32" }} className={styles.top_rackets_points}>#3</span> {rackets[2].title}
                                        <span className={styles.top_racket_amount_span}>( {rackets[2].amount_of_votes} <UserIcon height="15" width="15" fill={"#38b6ff"} /> )</span>
                                    </p>

                                </div>

                            </Card.Body>

                            <Card.Footer className={styles.top_rackets_card_footer}>
                                <Button href={`/racket-details/${rackets[2].id}`} variant="outline-primary" className={styles.top_rackets_card_footer_button_outline}>
                                    Details
                                </Button>

                                <Button href={`/rate/${rackets[2].id}`} variant="primary" className={styles.top_rackets_card_footer_button_no_outline}>
                                    Rate
                                </Button>
                            </Card.Footer>

                        </Card>
                    }

                </Col>

            </Row>

        </div>


    )
}



export default TopRackets;