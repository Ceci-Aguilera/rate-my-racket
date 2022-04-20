import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/TopRackets.module.css'

import { Row, Col, Container, Card, Button } from "react-bootstrap";


import { StarIcon, StarHalfIcon, UserIcon } from '../components/Icons';

function TopRackets({ rackets }) {

    console.log(rackets)

    return (rackets == null) ? <div></div> : (


        <div className={styles.top_rackets_div}>

            <Row className={styles.top_rackets_row}>

                <Col xs={4} sm={4} md={4} lg={4} className={styles.top_rackets_col}>
                    {rackets[1] == undefined ? <div></div> :
                        <Card className={`${styles.top_racket_card} ${styles.top_racket_card_silver}`}>

                            <Card.Body className={styles.top_racket_card_body}>

                                <div className={`${styles.top_rackets_element_div_wrapper} ${styles.top_rackets_element_div_wrapper_silver}`}>

                                    <Link href="/#">
                                        <div className={`${styles.top_rackets_element_div} ${styles.top_rackets_element_div_silver}`}>
                                            <div className={styles.top_racket_silver_img}>
                                                <img src={rackets[1].image} alt="Silver Racket" className={`${styles.top_racket_img} ${styles.top_racket_silver_img}`} />
                                            </div>
                                        </div>
                                    </Link>




                                    <div className={styles.top_stars_div}>

                                        {/* {calculateRating(0, rackets[1].overall_rating, "silver").map((top_star, index) => {
                                            return (
                                                <div key={index} className={styles.top_star_div}>
                                                    {top_star}
                                                </div>
                                            );
                                        })} */}

                                        {/* <span className={styles.top_racket_star_p_span}>( {rackets[1].overall_rating} <StarIcon height="15" width="15" fill={"#38b6ff"} /> )</span> */}

                                        <span className={styles.top_rackets_points} style={{ color: "silver" }}>{rackets[1].points} Points</span>

                                    </div>

                                    <p className={styles.top_rackets_p}><span style={{ color: "silver" }} className={styles.top_rackets_points}>#2</span> {rackets[1].title}
                                        <span className={styles.top_racket_amount_span}>( {rackets[1].amount_of_votes} <UserIcon height="15" width="15" fill={"#38b6ff"} /> )</span>
                                    </p>
                                </div>

                            </Card.Body>

                            <Card.Footer className={styles.top_rackets_card_footer}>
                                <Button variant="outline-primary" className={styles.top_rackets_card_footer_button_outline}>
                                    Details
                                </Button>

                                <Button href={`/rate/${rackets[1].id}`} variant="primary" className={styles.top_rackets_card_footer_button_no_outline}>
                                    Rate
                                </Button>
                            </Card.Footer>
                        </Card>

                    }
                </Col>

                <Col xs={4} sm={4} md={4} lg={4} className={styles.top_rackets_col}>
                    {rackets[0] == undefined ? <div></div> :
                        <Card className={`${styles.top_racket_card} ${styles.top_racket_card_gold}`}>

                            <Card.Body className={styles.top_racket_card_body}>
                                <div className={`${styles.top_rackets_element_div_wrapper} ${styles.top_rackets_element_div_wrapper_gold}`}>

                                    <Link href="/#">
                                        <div className={`${styles.top_rackets_element_div} ${styles.top_rackets_element_div_gold}`}>
                                            <img src={rackets[0].image} alt="Gold Racket" className={`${styles.top_racket_img} ${styles.top_racket_gold_img}`} />
                                        </div>
                                    </Link>



                                    <div className={styles.top_stars_div}>

                                        {/* {calculateRating(0, rackets[0].overall_rating, "gold").map((top_star, index) => {
                                            return (
                                                <div key={index} className={styles.top_star_div}>
                                                    {top_star}
                                                </div>
                                            );
                                        })} */}

                                        {/* <span className={styles.top_racket_star_p_span}>( {rackets[0].overall_rating} <StarIcon height="15" width="15" fill={"#38b6ff"} /> )</span> */}

                                        <span className={styles.top_rackets_points} style={{ color: "goldenrod" }}>{rackets[0].points} Points</span>

                                    </div>


                                    <p className={styles.top_rackets_p}><span style={{ color: "goldenrod" }} className={styles.top_rackets_points}>#1</span> {rackets[0].title}
                                        <span className={styles.top_racket_amount_span}>( {rackets[0].amount_of_votes} <UserIcon height="15" width="15" fill={"#38b6ff"} /> )</span>
                                    </p>
                                </div>


                            </Card.Body>

                            <Card.Footer className={styles.top_rackets_card_footer}>
                                <Button variant="outline-primary" className={styles.top_rackets_card_footer_button_outline}>
                                    Details
                                </Button>

                                <Button href={`/rate/${rackets[0].id}`} variant="primary" className={styles.top_rackets_card_footer_button_no_outline}>
                                    Rate
                                </Button>
                            </Card.Footer>

                        </Card>
                    }
                </Col>

                <Col xs={4} sm={4} md={4} lg={4} className={styles.top_rackets_col}>
                    {rackets[2] == undefined ? <div></div> :
                        <Card className={`${styles.top_racket_card} ${styles.top_racket_card_bronze}`}>


                            <Card.Body className={styles.top_racket_card_body}>

                                <div className={`${styles.top_rackets_element_div_wrapper} ${styles.top_rackets_element_div_wrapper_bonze}`}>

                                    <Link href="/#">
                                        <div className={`${styles.top_rackets_element_div} ${styles.top_rackets_element_div_bronze}`}>
                                            <img src={rackets[2].image} alt="Bronze Racket" className={`${styles.top_racket_img} ${styles.top_racket_bronze_img}`} />
                                        </div>
                                    </Link>


                                    <div className={styles.top_stars_div}>

                                        {/* {calculateRating(0, rackets[2].overall_rating, "#cd7f32").map((top_star, index) => {
                                            return (
                                                <div key={index} className={styles.top_star_div}>
                                                    {top_star}
                                                </div>
                                            );
                                        })} */}

                                        {/* <span className={styles.top_racket_star_p_span}>( {rackets[2].overall_rating} <StarIcon height="15" width="15" fill={"#38b6ff"} /> )</span> */}

                                        <span className={styles.top_rackets_points} style={{ color: "#cd7f32" }}>{rackets[2].points} Points</span>


                                    </div>


                                    <p className={styles.top_rackets_p}><span style={{ color: "#cd7f32" }} className={styles.top_rackets_points}>#3</span> {rackets[2].title}
                                        <span className={styles.top_racket_amount_span}>( {rackets[2].amount_of_votes} <UserIcon height="15" width="15" fill={"#38b6ff"} /> )</span>
                                    </p>

                                </div>

                            </Card.Body>

                            <Card.Footer className={styles.top_rackets_card_footer}>
                                <Button variant="outline-primary" className={styles.top_rackets_card_footer_button_outline}>
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


const calculateRating = (index, rate, color) => {
    var array_of_stars = []

    const star_size = "20";

    for (var i = index; i < rate; i++) {
        if (i + 1 <= rate) {
            array_of_stars.push(<StarIcon height={star_size} width={star_size} fill={color} />)
        }
        else {
            array_of_stars.push(<StarHalfIcon height={star_size} width={star_size} fill={color} />)
        }
    }

    return array_of_stars

}

export default TopRackets;