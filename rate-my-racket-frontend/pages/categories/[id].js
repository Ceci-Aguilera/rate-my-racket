import { Card, Col, Row, Container, Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

import styles from "../../styles/BrandRackets.module.css"
import RacketsGrid from "../../components/RacketsGrid";

const domain = process.env.NEXT_PUBLIC_BACKEND_API_URL

const CategoryRackets = ({ id }) => {

    const [category, setCategory] = useState(null)

    useEffect(() => {
        async function FetchCategory() {
            const temp_category = await getCategory(id)
            setCategory(temp_category.category)
        }

        if (id != null) {
            FetchCategory()
        }

    }, [id])

    return (category == null) ? <div></div> : (
        <div className={styles.brand_rackets_div}>
            <div className={styles.brand_rackets_img}>
                <h1 className={styles.brand_rackets_category_title}>{category.title}</h1>
            </div>


            <div className={styles.brand_rackets_select_top_button_div}>
                <Button href={`/top-rackets-category/${category.id}`} variant="primary" className={styles.brand_rackets_select_top_button}>
                    Select Top 3
                </Button>
            </div>

            <RacketsGrid rackets={category.all_rackets} usePoints={true} points={category.points} />
        </div>
    );
};

CategoryRackets.getInitialProps = async ({ query }) => {
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
        console.log("Cat")
        console.log(result)
        return {
            status: "CATEGORY_FOUND", category: result
        }
    }).catch((error) => {
        return {
            status: "CATEGORY_NOT_FOUND", category: null
        }
    })
}


export default CategoryRackets;