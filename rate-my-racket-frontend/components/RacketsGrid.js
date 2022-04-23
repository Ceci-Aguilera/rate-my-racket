import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/RacketsGrid.module.css'

import { Row, Col, Container, Card, Button, Form } from "react-bootstrap";

import {useEffect, useState} from "react"


import { StarIcon, StarHalfIcon, UserIcon } from '../components/Icons';

function RacketsGrid({ rackets, usePoints = false, points = [] }) {


    const [searchTerm, setSearchTerm] = useState('')
    const [racketsToDisplay, setRacketsToDisplay] = useState([])

    useEffect(() => {
        setRacketsToDisplay(rackets);
    }, [rackets])


    const onSubmit = (e) => {
        e.preventDefault();
        setRacketsToDisplay(rackets.filter((element) => {
            if (searchTerm == "") {
                return element;
            }
            else if (element.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                return element;
            }
        }));
    }


    return (rackets == null) ? <div></div> : (


        <div className={styles.racketsGrid_div}>

            <Form className={`d-flex ${styles.racketsGrid_search_form}`} onSubmit={(e) => onSubmit(e)}>
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className={`me-2 ${styles.racketsGrid_search_form_control}`}
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="primary" className={styles.racketsGrid_search_button} type="submit">Search</Button>
            </Form>

            <Row className={styles.racketsGrid_row}>

                {racketsToDisplay.map((racket, index) => {
                    return (
                        <Col key={index} xs={3} sm={3} md={3} lg={3} className={styles.racketsGrid_col}>
                            {racket == undefined ? <div></div> :
                                <Card className={styles.racketsGrid_card}>

                                    <Card.Body className={styles.racketsGrid_card_body}>

                                        <div className={styles.racketsGrid_card_element_div_wrapper}>

                                            <Link href={`/racket-details/${racket.id}`}>
                                                <div className={styles.racketsGrid_card_element_div}>
                                                    <div className={styles.racketsGrid_card_element_img_div}>
                                                        <img src={racket.image} alt="Silver Racket" className={styles.racketsGrid_card_element_img} />
                                                    </div>

                                                    <div className={styles.racketsGrid_card_element_s_img_div}>
                                                        <img src={racket.secondary_image} alt="Silver Racket" className={styles.racketsGrid_card_element_s_img} />
                                                    </div>
                                                </div>
                                            </Link>




                                            <div className={styles.racketsGrid_stars_div}>

                                                {/* {calculateRating(racket.overall_rating, "#38b6ff").map((top_star, index) => {
                                                    return (
                                                        <div key={index} className={styles.racketsGrid_stars_div}>
                                                            {top_star}
                                                        </div>
                                                    );
                                                })} */}

                                                {usePoints ?
                                                    <span className={styles.racketsGrid_points_span}>
                                                        {parseFloat(points[index].points).toFixed(2)}
                                                    </span> :
                                                    <span className={styles.racketsGrid_points_span}>
                                                        {racket.points} Points
                                                    </span>
                                                }

                                                {/* <span className={styles.racketsGrid_amount_span}>( {racket.overall_rating} <StarIcon height="15" width="15" fill={"#38b6ff"} /> )</span> */}

                                            </div>

                                            <p className={styles.racketsGrid_p}>{racket.brand.title} {racket.title} <span className={styles.racketsGrid_amount_span}>( {racket.amount_of_votes} <UserIcon height="15" width="15" fill={"#38b6ff"} /> )</span></p>
                                        </div>

                                    </Card.Body>

                                    <Card.Footer className={styles.racketsGrid_card_footer}>
                                        <Button variant="outline-primary" className={styles.racketsGrid_card_footer_button_outline}>
                                            Details
                                        </Button>

                                        <Button href={`/rate/${racket.id}`} variant="primary" className={styles.racketsGrid_card_footer_button_no_outline}>
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