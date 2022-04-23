import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/TopRacketsGrid.module.css'

import { Row, Col, Card, Button, Form, Dropdown } from "react-bootstrap";

import { useEffect, useState } from "react"


import { StarIcon, StarHalfIcon, UserIcon } from '../components/Icons';

function TopRacketsGrid({ rackets, onChangeGoldRacket, onChangeSilverRacket, onChangeBronzeRacket }) {


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

    const onChangeGoldRacketHelper = async(e, racket) => {
        e.preventDefault();
        await onChangeGoldRacket(racket.id, racket.brand.title + " " + racket.title)
    }
    
    const onChangeSilverRacketHelper = async(e, racket) => {
        e.preventDefault();
        await onChangeSilverRacket(racket.id, racket.brand.title + " " + racket.title)
    }

    const onChangeBronzeRacketHelper = async(e, racket) => {
        e.preventDefault();
        await onChangeBronzeRacket(racket.id, racket.brand.title + " " + racket.title)
    }


    return (rackets == null) ? <div></div> : (


        <div className={styles.racketsGrid_div}>

            <div className={styles.racketsGrid_search_div}>
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
            </div>

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



                                            <p className={styles.racketsGrid_p}>{racket.brand.title} {racket.title}s</p>
                                        </div>

                                    </Card.Body>

                                    <Card.Footer className={styles.racketsGrid_card_footer}>

                                        <Dropdown>
                                            <Dropdown.Toggle variant="primary" className={styles.racketsGrid_card_footer_button_no_outline}>
                                                Select As
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={(e) => onChangeGoldRacketHelper(e, racket)}>Top 1st Choice</Dropdown.Item>
                                                <Dropdown.Item onClick={(e) => onChangeSilverRacketHelper(e, racket)}>Top 2nd Choice</Dropdown.Item>
                                                <Dropdown.Item onClick={(e) => onChangeBronzeRacketHelper(e, racket)}>Top 3rd Choice</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
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

export default TopRacketsGrid;