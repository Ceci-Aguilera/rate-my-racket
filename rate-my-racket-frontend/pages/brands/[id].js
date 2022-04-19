import { Card, Col, Row, Container, Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

import styles from "../../styles/BrandRackets.module.css"
import RacketsGrid from "../../components/RacketsGrid";

const domain = process.env.NEXT_PUBLIC_BACKEND_API_URL

const BrandRackets = ({ id }) => {

    const [brand, setBrand] = useState(null)

    useEffect(() => {



        async function FetchBrand() {
            const temp_brand = await getBrand(id)
            setBrand(temp_brand.brand)
        }

        if (id != null) {
            FetchBrand()
        }

    }, [id])

    return (brand == null) ? <div></div> : (
        <div className={styles.brand_rackets_div}>
            <div className={styles.brand_rackets_img}>
                <img src={brand.image} alt={`${brand.title} Image`} className={styles.brand_img} />
            </div>

            <RacketsGrid rackets={brand.all_rackets} />
        </div>
    );
};

BrandRackets.getInitialProps = async ({ query }) => {
    const { id } = query;

    return { id };
};

const getBrand = async (brand_id) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    const brand_url = `${domain}/comments-rackets-app/brand-rackets/${brand_id}/`



    return axios.get(brand_url, config).then(async (res) => {
        const result = await res.data;
        console.log(result)
        return {
            status: "BRAND_FOUND", brand: result
        }
    }).catch((error) => {
        return {
            status: "BRAND_NOT_FOUND", brand: null
        }
    })
}


export default BrandRackets;