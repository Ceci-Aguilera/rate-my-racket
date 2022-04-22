import { Card, Col, Row, Container, Button, Form, Modal, Alert } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

import styles from "../../styles/RacketDetails.module.css"

import { useAuth } from "../../context/AuthContext"

import { useRouter } from 'next/router';
import Link from "next/link";

import { MedalIcon, TennisRacketSimpleR, TennisCourtIcon, TennisBallIcon, StarIcon, UserIcon } from "../../components/Icons"

const domain = process.env.NEXT_PUBLIC_BACKEND_API_URL

const racket_props = [
    {
        title: "Head Size",
        prop: 'head_size',
        prefix: "sq"
    },
    {
        title: "Length",
        prop: 'length',
        prefix: "inches"
    },
    {
        title: "Weight (Strung)",
        prop: 'weight_strung',
        prefix: "oz"
    },
    {
        title: "Weight (Unstrung)",
        prop: 'weight_unstrung',
        prefix: "oz"
    },
    {
        title: "Composition",
        prop: 'composition',
        prefix: ""
    },
    {
        title: "Stiffness",
        prop: 'stiffness',
        prefix: ""
    }
]

const RacketDetails = ({ id }) => {

    const { user } = useAuth()

    const [racket, setRacket] = useState(null)

    const router = useRouter();


    useEffect(() => {

        async function FetchRacket() {
            const temp_racket = await getRacket(id)
            setRacket(temp_racket.racket)
        }

        if (id != null && user != null) {
            FetchRacket()
        }

    }, [id, user])



    return (racket == null) ? <div></div> : (
        <div className={styles.rate_racket_div}>

            <Row className={styles.rate_racket_row}>
                <Col xs={12} sm={12} md={12} lg={6} className={styles.rate_racket_col}>
                    <div className={styles.rate_racket_img_div}>
                        <img src={racket.image} alt="Silver Racket" className={styles.rate_racket_img} />
                    </div>
                </Col>

                <Col xs={12} sm={12} md={12} lg={6} className={styles.rate_racket_col}>
                    <div className={styles.rate_racket_form}>
                        <Card className={styles.racket_details_card}>
                            <Card.Header className={styles.racket_details_card_header}>
                                <h1 className={styles.racket_details_card_header_title}>{racket.brand.title} {racket.title}</h1>
                            </Card.Header>

                            <Card.Body className={styles.racket_details_card_body}>

                                <Row className={styles.racket_details_card_rate_row}>

                                    <h2>Properties</h2>

                                    {racket_props.map((racket_prop, index) => {
                                        return (
                                            <Col key={index} xs={12} sm={12} md={12} lg={4} className={styles.racket_details_card_rate_col}>
                                                <div className={styles.racket_details_card_rate_div}>
                                                    <p className={styles.racket_details_card_rate_p}>
                                                        <span className={styles.racket_details_card_rate_p_span}>
                                                            {racket_prop.title}:</span>{" "}
                                                        {racket[racket_prop.prop]} {racket_prop.prefix}
                                                    </p>
                                                </div>
                                            </Col>
                                        );
                                    })}

                                    <Col xs={12} sm={12} md={12} lg={4} className={styles.racket_details_card_rate_col}>
                                        <div className={styles.racket_details_card_rate_div}>
                                            <p className={styles.racket_details_card_rate_p}>
                                                <span className={styles.racket_details_card_rate_p_span}>
                                                    Average Cost:</span>{" "}
                                                ${racket.average_cost}
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row className={styles.racket_details_card_rate_row}>

                                    <h2>Racket Rating</h2>

                                    {racket.ratings.map((rating, index) => {
                                        return (
                                            <Col key={index} xs={12} sm={12} md={12} lg={4} className={styles.racket_details_card_rate_col}>
                                                <div className={styles.racket_details_card_rate_div}>
                                                    <p className={styles.racket_details_card_rate_p}>
                                                        <span className={styles.racket_details_card_rate_p_span}>{rating.category.title}:</span> {rating.rating}/10
                                                        <StarIcon className={styles.racket_details_card_rate_p_star} height={25} width={25} fill={"#38b6ff"} />
                                                    </p>
                                                </div>
                                            </Col>
                                        );
                                    })}
                                </Row>

                                <Row className={styles.racket_details_card_rate_row}>


                                    <Col xs={12} sm={12} md={12} lg={4} className={styles.racket_details_card_rate_col}>
                                        <div className={styles.racket_details_card_rate_div}>
                                            <p className={styles.racket_details_card_rate_p}>
                                                <span className={styles.racket_details_card_rate_p_span}>Overall Rating: </span> {racket.overall_rating}/10
                                                <StarIcon className={styles.racket_details_card_rate_p_star} height={25} width={25} fill={"#38b6ff"} />
                                            </p>
                                        </div>
                                    </Col>

                                    <Col xs={12} sm={12} md={12} lg={4} className={styles.racket_details_card_rate_col}>
                                        <div className={styles.racket_details_card_rate_div}>
                                            <p className={styles.racket_details_card_rate_p}>
                                                <span className={styles.racket_details_card_rate_p_span}>Votes:</span> {racket.amount_of_votes}
                                                <UserIcon className={styles.racket_details_card_rate_p_star} height={25} width={25} fill={"#38b6ff"} />
                                            </p>
                                        </div>
                                    </Col>

                                    <Col xs={12} sm={12} md={12} lg={4} className={styles.racket_details_card_rate_col}>
                                        <div className={styles.racket_details_card_rate_div}>
                                            <p className={styles.racket_details_card_rate_p}>
                                                <span className={styles.racket_details_card_rate_p_span}>Points:</span> {racket.points}
                                            </p>
                                        </div>
                                    </Col>

                                </Row>
                            </Card.Body>
                        </Card>

                        <div className={styles.racket_details_card_footer_button_div}>
                            <Button variant="primary" className={styles.racket_details_card_footer_button}>
                                RATE
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

RacketDetails.getInitialProps = async ({ query }) => {
    const { id } = query;

    return { id };
};

const getRacket = async (racket_id) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    const racket_url = `${domain}/comments-rackets-app/racket/${racket_id}/`



    return axios.get(racket_url, config).then(async (res) => {
        const result = await res.data;
        console.log(result)
        return {
            status: "RACKET_FOUND", racket: result
        }
    }).catch((error) => {
        return {
            status: "RACKET_NOT_FOUND", racket: null
        }
    })
}



const SelectedIcon = (icon_name, icon_color, profile_icon_color_mode) => {

    var background_color = "white";
    var final_icon_color = icon_color;
    if (!profile_icon_color_mode) {
        background_color = icon_color;
        final_icon_color = "white"
    }

    if (icon_name == "Medal") {

        return (
            <div className={styles.account_icon_div} style={{ backgroundColor: background_color, border: " 2px solid " + icon_color }} >
                <MedalIcon className={`${styles.account_icon} ${styles.account_selected_icon}`} height={40} weight={40} fill={final_icon_color} />
            </div>
        );

    }

    if (icon_name == "Racket") {

        return (
            <div className={styles.account_icon_div} style={{ backgroundColor: background_color, border: " 2px solid " + icon_color }} >
                <TennisRacketSimpleR className={`${styles.account_icon} ${styles.account_selected_icon}`} height={40} weight={40} fill={final_icon_color} />
            </div>
        );

    }

    if (icon_name == "Tennis Court") {

        return (
            <div className={styles.account_icon_div} style={{ backgroundColor: background_color, border: " 2px solid " + icon_color }} >
                <TennisCourtIcon className={`${styles.account_icon} ${styles.account_selected_icon}`} height={30} weight={30} fill={final_icon_color} />
            </div>
        );

    }

    if (icon_name == "Tennis Ball") {

        return (
            <div className={styles.account_icon_div} style={{ backgroundColor: background_color, border: " 2px solid " + icon_color }} >
                <TennisBallIcon className={`${styles.account_icon} ${styles.account_selected_icon}`} height={40} weight={40} fill={final_icon_color} />
            </div>
        );

    }


}


export default RacketDetails;