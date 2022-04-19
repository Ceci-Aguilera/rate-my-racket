import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import axios from "axios"

import styles from '../styles/Brands.module.css'

import { useEffect, useState } from "react"

import { Row, Col, Container, Button } from "react-bootstrap";

import TopRackets from '../components/TopRackets'

import {RightArrowIcon} from "../components/Icons"

const domain = process.env.NEXT_PUBLIC_BACKEND_API_URL

export default function Brands() {


    const [brands, setBrands] = useState([])

    useEffect(() => {

        async function FetchBrands() {
            const temp_brands = await getBrands()
            setBrands(temp_brands.brands)
        }

            FetchBrands()

    }, [])

    return (brands == null) ? <div></div> : (
        <div className={styles.container}>
            <Head>
                <title>Brands | Rate My Racket</title>
                <meta name="description" content="Brands section of Rate My Racket, a Website to rate rackets" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.brands_div_wrapper}>

                    {brands.map((brand, index) => {
                        return (
                            <div key={index} className={styles.brand_div}>
                                <div key={index} className={styles.brand_img_div}>
                                    <img src={brand.image} alt={`${brand.title} Image`} className={styles.brand_img} />
                                </div>
                                <TopRackets rackets={brand.top_rackets} />

                                <div className={styles.brands_div_button}>
                                    <Button href={`/brands/${brand.id}`} variant="primary" className={styles.brands_button}>
                                        All {brand.title} Rackets <RightArrowIcon height={30} width={30} fill={"white"} className={styles.brands_button_icon}/>
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    )
}


const getBrands = async () => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    const brands_url = `${domain}/comments-rackets-app/brands/`


    return axios.get(brands_url, config).then(async (res) => {
        const result = await res.data;
        return {
            status: "BRANDS_FOUND", brands: result
        }
    }).catch((error) => {
        return {
            status: "BRANDS_NOT_FOUND", brands: []
        }
    })
}