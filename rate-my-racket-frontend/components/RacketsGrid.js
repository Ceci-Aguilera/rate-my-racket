import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/RacketsGrid.module.css'

import { Row, Col, Container, Card, Button } from "react-bootstrap";


import { StarIcon, StarHalfIcon, UserIcon } from '../components/Icons';

function RacketsGrid({ rackets }) {

    return (rackets == null) ? <div></div> : (


        <div className={styles.racketsGrid_div}>

            <Row className={styles.racketsGrid_row}>

                {rackets.map((racket, index) => {
                    return (
                        <Col key={index} xs={3} sm={3} md={3} lg={3} className={styles.racketsGrid_col}>
                            {racket == undefined ? <div></div> :
                                <Card className={styles.racketsGrid_card}>

                                    <Card.Body className={styles.racketsGrid_card_body}>

                                        <div className={styles.racketsGrid_card_element_div_wrapper}>

                                            <Link href="/#">
                                                <div className={styles.racketsGrid_card_element_div}>
                                                    <div className={styles.racketsGrid_card_element_img_div}>
                                                        <img src={racket.image} alt="Silver Racket" className={styles.racketsGrid_card_element_img} />
                                                    </div>
                                                </div>
                                            </Link>




                                            <div className={styles.racketsGrid_stars_div}>

                                                {calculateRating(racket.overall_rating, "#38b6ff").map((top_star, index) => {
                                                    return (
                                                        <div key={index} className={styles.racketsGrid_stars_div}>
                                                            {top_star}
                                                        </div>
                                                    );
                                                })}

                                                <span className={styles.racketsGrid_amount_span}>( {racket.amount_of_votes} <UserIcon height="15" width="15" fill={"#38b6ff"} /> )</span>

                                            </div>

                                            <p className={styles.racketsGrid_p}>{racket.title}</p>
                                        </div>

                                    </Card.Body>

                                    <Card.Footer className={styles.racketsGrid_card_footer}>
                                        <Button variant="outline-primary" className={styles.racketsGrid_card_footer_button_outline}>
                                            Details
                                        </Button>

                                        <Button variant="primary" className={styles.racketsGrid_card_footer_button_no_outline}>
                                            Rate
                                        </Button>
                                    </Card.Footer>
                                </Card>

                            }
                        </Col>
                    );
                })}

            </Row>

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

export default RacketsGrid;