import { Card, Col, Row, Container, Button, Form, Modal, Alert } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

import styles from "../../styles/RateRacket.module.css"

import { useAuth } from "../../context/AuthContext"

import { useRouter } from 'next/router';
import Link from "next/link";
import RatingOptionScale from "../../components/RatingOptionScale";

import { MedalIcon, TennisRacketSimpleR, TennisCourtIcon, TennisBallIcon } from "../../components/Icons"

const domain = process.env.NEXT_PUBLIC_BACKEND_API_URL

const RateRacket = ({ id }) => {

    const { user } = useAuth()

    const [racket, setRacket] = useState(null)

    const [spin_rating, setSpinRating] = useState(6);
    const [maneuverable_rating, setManeuverableRating] = useState(6);
    const [flexibility_rating, setFlexibilityRating] = useState(6);
    const [comfort_rating, setComfortRating] = useState(6);
    const [control_rating, setControlRating] = useState(6);
    const [power_rating, setPowerRating] = useState(6);
    const [serving_rating, setServingRating] = useState(6);
    const [stable_rating, setStableRating] = useState(6);
    const [racket_sweet_spot_rating, setRacketSweetSpot] = useState(6);
    const [volley_rating, setVolleyRating] = useState(6);
    const [overall_rating, setOverallRating] = useState(6);
    const [audience, setAudience] = useState("Beginner");

    const [comments, setComments] = useState("");

    const [showAlert, setShowAlert] = useState(false);
    const router = useRouter();


    useEffect(() => {

        async function FetchRacket() {
            const temp_racket = await getRacket(id)
            setRacket(temp_racket.racket)
        }

        if (id != null && id != undefined && user != null) {
            FetchRacket()
        }

    }, [id, user])


    const onCreateComment = async (e) => {
        e.preventDefault();

        const body = JSON.stringify({
            spin_rating,
            maneuverable_rating,
            flexibility_rating,
            comfort_rating,
            control_rating,
            power_rating,
            serving_rating,
            stable_rating,
            racket_sweet_spot_rating,
            volley_rating,
            overall_rating,
            audience,
            comments
        });

        const result = await createComment(id, user.user.id, body);

        if (result == "Success") {
            router.push('/')
        }
        else{
            setShowAlert(true);
            window.scrollTo(0, 0);
        }
    }

    return (racket == null || user == null) ? <div className={styles.rate_racket_login_message}><Link href="/credentials/login"><a>Login</a></Link> before rating this racket</div> : (
        <div className={styles.rate_racket_div}>

            {showAlert?<Alert variant="info" className={styles.alert} onClose={() => setShowAlert(false)} dismissible>
        <Alert.Heading>Error</Alert.Heading>
        <p>
          You have already rated this racket.
          Please rate another racket or go to Account {">"} Rated Rackets and edit your rating for this racket
        </p>
      </Alert>:<div></div>}

            <Form onSubmit={(e) => onCreateComment(e)}>
                <Row className={styles.rate_racket_row}>
                    <Col xs={12} sm={12} md={12} lg={6} className={styles.rate_racket_col}>
                        <div className={styles.rate_racket_img_div}>
                            <img src={racket.image} alt="Silver Racket" className={styles.rate_racket_img} />
                        </div>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={6} className={styles.rate_racket_col}>
                        <div className={styles.rate_racket_form}>

                            <RatingOptionScale option_name="For Spin" current_option={spin_rating} setOption={setSpinRating} />
                            <RatingOptionScale option_name="Maneuverability" current_option={maneuverable_rating} setOption={setManeuverableRating} />
                            <RatingOptionScale option_name="Flexibility" current_option={flexibility_rating} setOption={setFlexibilityRating} />
                            <RatingOptionScale option_name="Comfort" current_option={comfort_rating} setOption={setComfortRating} />
                            <RatingOptionScale option_name="Control" current_option={control_rating} setOption={setControlRating} />
                            <RatingOptionScale option_name="Power" current_option={power_rating} setOption={setPowerRating} />
                            <RatingOptionScale option_name="During Service" current_option={serving_rating} setOption={setServingRating} />
                            <RatingOptionScale option_name="During Volley" current_option={volley_rating} setOption={setVolleyRating} />
                            <RatingOptionScale option_name="Sweet Spot" current_option={racket_sweet_spot_rating} setOption={setRacketSweetSpot} />
                            <RatingOptionScale option_name="Stability" current_option={stable_rating} setOption={setStableRating} />
                            <RatingOptionScale option_name="Overall Rating" current_option={overall_rating} setOption={setOverallRating} />

                            <div className={styles.rate_racket_form_group}>
                                <div className={styles.rate_racket_form_label_div}>
                                    <p className={styles.rate_racket_form_label_p}>Ideal for: </p>
                                </div>
                                <div className={styles.rate_racket_form_control_div}>
                                    <Form.Select value={audience} onChange={(e) => setAudience(e.target.value)}>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advance">Advance</option>
                                        <option value="Dont Know">{"Don't Know"}</option>
                                    </Form.Select>
                                </div>
                            </div>

                        </div>
                    </Col>
                </Row>

                <div className={styles.rate_racket_comments_div}>
                    <Form.Group className="mb-3">
                        <Form.Label className={styles.rate_racket_label_p}>
                            <div className={styles.rate_racket_user_icon}>
                                {SelectedIcon(user.profile_icon, user.profile_icon_color, user.profile_icon_color_mode)}
                            </div>
                            <span className={styles.rate_racket_label_p_span}>Post Comment About Racket</span>
                        </Form.Label>
                        <Form.Control as="textarea" rows={20} value={comments} onChange={(e) => setComments(e.target.value)} />
                    </Form.Group>
                </div>

                <div className={styles.rate_racket_rate_button_div}>
                    <Button className={styles.rate_racket_rate_button} type="submit">
                        Submit Rating
                    </Button>
                </div>
            </Form>
        </div>
    );
};

RateRacket.getInitialProps = async ({ query }) => {
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

const createComment = async (racket_id, userprofile_id, body) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    const create_comment_url = `${domain}/comments-rackets-app/create-comment/${racket_id}/${userprofile_id}/`



    return axios.post(create_comment_url, body, config).then(async (res) => {
        return "Success"
    }).catch(async(error) => {
        const result = await error.response.data
        const res = result["Result"]
        return res;
    })
}


export default RateRacket;