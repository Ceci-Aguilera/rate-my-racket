import { Card, Col, Row, Container, Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

import styles from "../styles/RateRacket.module.css"

const domain = process.env.NEXT_PUBLIC_BACKEND_API_URL

const RatingOptionScale = ({ option_name, current_option, setOption }) => {

    return (
        <div className={styles.rate_racket_form_group}>
            <div className={styles.rate_racket_form_label_div}>
                <p className={styles.rate_racket_form_label_p}>{option_name}: </p>
            </div>
            <div className={styles.rate_racket_form_control_div}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating_opt, index) => {
                    return (
                        <div className={styles.rate_racket_form_control_element_div}>
                            {(rating_opt == current_option) ?
                                <Button className={styles.rate_racket_form_control_element_button_active}>{rating_opt}</Button> : (
                                    <Button className={styles.rate_racket_form_control_element_button}
                                        onClick={(e) => setOption(rating_opt)}
                                    >{rating_opt}</Button>
                                )}
                        </div>
                    );
                })}
                <div className={styles.rate_racket_form_control_element_div}>
                    {
                        (11 == current_option) ?
                            <Button className={styles.rate_racket_form_control_element_button_active}>{"Don't Know"}</Button> : (
                                <Button className={styles.rate_racket_form_control_element_button}
                                    onClick={(e) => setOption(11)}
                                >{"Don't Know"}</Button>
                            )
                    }
                </div>

            </div>
        </div>
    );
};


export default RatingOptionScale;