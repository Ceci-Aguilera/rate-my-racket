import { Card, Col, Row, Container, Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';


import styles from "../../styles/BrandRackets.module.css"
import TopRacketsGrid from "../../components/TopRacketsGrid";
import { StarIcon } from "../../components/Icons";

import { useAuth } from "../../context/AuthContext"
import Link from "next/link";

const domain = process.env.NEXT_PUBLIC_BACKEND_API_URL

const TopRacketsCategory = ({ id }) => {

    const { user } = useAuth()

    const [category, setCategory] = useState(null)

    const [rackets, setRackets] = useState(null)

    const [gold_racket, setGoldRacket] = useState(null);
    const [silver_racket, setSilverRacket] = useState(null);
    const [bronze_racket, setBronzeRacket] = useState(null);

    const router = useRouter();

    useEffect(() => {
        async function FetchCategory() {
            const temp_category = await getCategory(id)
            setCategory(temp_category.category)
        }

        async function FetchRackets() {
            const temp_rackets = await getRackets()
            setRackets(temp_rackets.rackets)
        }

        if (id != null) {
            FetchCategory()
            FetchRackets()
        }

    }, [id])

    const onChangeGoldRacket = (gold_racket_id, gold_racket_description) => {
        if (silver_racket != null && silver_racket.id == gold_racket_id) {
            setSilverRacket(null)
        }
        else if (bronze_racket != null && bronze_racket.id == gold_racket_id) {
            setBronzeRacket(null)
        }
        setGoldRacket({ id: gold_racket_id, description: gold_racket_description })
    }

    const onChangeSilverRacket = (silver_racket_id, silver_racket_description) => {
        if (gold_racket != null && gold_racket.id == silver_racket_id) {
            setGoldRacket(null)
        }
        else if (bronze_racket != null && bronze_racket.id == silver_racket_id) {
            setBronzeRacket(null)
        }
        setSilverRacket({ id: silver_racket_id, description: silver_racket_description })
    }

    const onChangeBronzeRacket = (bronze_racket_id, bronze_racket_description) => {
        if (gold_racket != null && gold_racket.id == bronze_racket_id) {
            setGoldRacket(null)
        }
        else if (silver_racket != null && silver_racket.id == bronze_racket_id) {
            setSilverRacket(null)
        }
        setBronzeRacket({ id: bronze_racket_id, description: bronze_racket_description })
    }


    const onSaveChanges = async (e) => {
        e.preventDefault();

        if (gold_racket != null && silver_racket != null && bronze_racket != null) {
            const body = JSON.stringify({
                gold_racket_id: gold_racket.id,
                silver_racket_id: silver_racket.id,
                bronze_racket_id: bronze_racket.id,
            })

            const result = await rateTopRackets(id, user.user.id, body)
            if (result == "Success") {
                router.push('/')
            }
        }

        else {
            alert("Don't leave any choice blank")
        }

    }

    return (category == null || rackets == null) ? <div></div> : (
        <div className={styles.brand_rackets_div}>

            {(user == null) ? <div className={styles.rate_racket_login_message}><Link href="/credentials/login"><a>Login</a></Link> before rating this racket</div> : (

                <div>

                    <div className={styles.brand_rackets_img}>
                        <h1 className={styles.brand_rackets_category_title}>{category.title} - Select Top 3 Rackets</h1>
                    </div>

                    <Row className={styles.top_rackets_row}>
                        <Col xs={6} sm={6} md={6} lg={6}>
                            <div className={styles.top_rackets_div}>
                                <p className={styles.top_rackets_p}>
                                    <span className={styles.top_rackets_p_span}>Top 1st Choice:</span>{" "}{gold_racket ? gold_racket.description : "---"}{" "}
                                    <StarIcon height={20} width={20} fill={"gold"} className={styles.top_racket_gold_star_icon} />
                                </p>

                                <p className={styles.top_rackets_p}>
                                    <span className={styles.top_rackets_p_span}>Top 2nd Choice:</span>{" "}{silver_racket ? silver_racket.description : "---"}{" "}
                                    <StarIcon height={20} width={20} fill={"silver"} className={styles.top_racket_gold_star_icon} />
                                </p>

                                <p className={styles.top_rackets_p}>
                                    <span className={styles.top_rackets_p_span}>Top 3rd Choice:</span>{" "}{bronze_racket ? bronze_racket.description : "---"}{" "}
                                    <StarIcon height={20} width={20} fill={"#cd7f32"} className={styles.top_racket_gold_star_icon} />
                                </p>
                            </div>
                        </Col>

                        <Col xs={6} sm={6} md={6} lg={6}>
                            <div className={styles.brand_rackets_select_top_button_div}>
                                <Button variant="primary" className={styles.brand_rackets_select_top_button} onClick={(e) => onSaveChanges(e)}>
                                    Save Changes
                                </Button>
                            </div>
                        </Col>
                    </Row>

                    <TopRacketsGrid rackets={rackets}
                        onChangeGoldRacket={onChangeGoldRacket}
                        onChangeSilverRacket={onChangeSilverRacket}
                        onChangeBronzeRacket={onChangeBronzeRacket}
                    />



                </div>
            )}
        </div>
    );
};

TopRacketsCategory.getInitialProps = async ({ query }) => {
    const { id } = query;

    return { id };
};

const getCategory = async (category_id) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    const category_url = `${domain}/comments-rackets-app/category-rackets/${category_id}/`



    return axios.get(category_url, config).then(async (res) => {
        const result = await res.data;
        return {
            status: "CATEGORY_FOUND", category: result
        }
    }).catch((error) => {
        return {
            status: "CATEGORY_NOT_FOUND", category: null
        }
    })
}


const getRackets = async () => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    const rackets_url = `${domain}/comments-rackets-app/rackets/`


    return axios.get(rackets_url, config).then(async (res) => {
        const result = await res.data;
        return {
            status: "RACKETS_FOUND", rackets: result
        }
    }).catch((error) => {
        return {
            status: "RACKETS_NOT_FOUND", rackets: []
        }
    })
}

const rateTopRackets = async (category_id, userprofile_id, body) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    const rackets_url = `${domain}/comments-rackets-app/rate-top_rackets/${category_id}/${userprofile_id}/`


    return axios.post(rackets_url, body, config).then(async (res) => {
        return "Success"
    }).catch((error) => {
        return "Error"
    })
}


export default TopRacketsCategory;