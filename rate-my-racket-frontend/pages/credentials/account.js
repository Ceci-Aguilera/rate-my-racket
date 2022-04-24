import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Account.module.css'

import { useEffect, useState } from "react"

import { Row, Col, Container, Card, Form, Button } from "react-bootstrap";


import { useAuth } from "../../context/AuthContext"

import { useRouter } from 'next/router';

import { MedalIcon, TennisRacketSimpleR, TennisCourtIcon, TennisBallIcon } from "../../components/Icons"
import EditAccountInfoModal from '../../components/EditAccountInfoModal'
import Sidebar from '../../components/Sidebar'

export default function Account() {

    const { user, update_userprofile, update_userInfo } = useAuth()

    const router = useRouter();

    const [selected_icon, setSelectedIcon] = useState("");
    const [selected_icon_color, setSelectedIconColor] = useState("");
    const [selected_icon_mode, setSelectedIconMode] = useState(true);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (user != null) {
            setSelectedIcon(user.profile_icon);
            setSelectedIconColor(user.profile_icon_color);
            setSelectedIconMode(user.profile_icon_color_mode);
        }
    }, [user])

    const onUpdateIcon = async (e) => {
        e.preventDefault();
        const body = JSON.stringify({
            profile_icon: selected_icon,
            profile_icon_color: selected_icon_color,
            profile_icon_color_mode: selected_icon_mode,
        });

        const result = await update_userprofile(user.user.id, body)
    }

    const onUpdateInfo = async (body) => {
        const result = await update_userInfo(user.user.id, body)
        window.location.reload()
    }

    return (user == null) ? <div></div> : (
        <div className={styles.container}>
            <Head>
                <title>Account | Rate My Racket</title>
                <meta name="description" content="Account Section of Rate My Racket, a website to rate rackets" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.account_div_wrapper}>

                    <Row className={styles.account_row}>

                        <Col xs={12} sm={12} md={12} lg={2}>
                            <Sidebar />
                        </Col>

                        <Col xs={12} sm={12} md={12} lg={10}>
                        <Card className={styles.account_card}>
                        <Card.Header className={styles.account_card_header}>
                            <h1 className={styles.account_card_header_title}>
                                Account Information
                            </h1>
                        </Card.Header>
                        <Card.Body className={styles.account_card_body}>
                            <Row className={styles.account_card_row}>
                                <Col xs={12} sm={12} md={12} lg={6} className={styles.account_card_col}>
                                    <div className={styles.account_p_div}>
                                        <p className={styles.account_p}><span className={styles.account_p_span}>Username:</span> {user.user.username}</p>
                                    </div>
                                    <div className={styles.account_p_div}>
                                        <p className={styles.account_p}><span className={styles.account_p_span}>Email:</span> {user.user.email}</p>
                                        {/* {user.is_email_verified ? <div></div> : <Button variant="outline-success" className={styles.account_verify_email_address_button}>Verify</Button>} */}
                                    </div>

                                    <div className={styles.account_p_div}>
                                        <p className={styles.account_p}><span className={styles.account_p_span}>Comments:</span> {user.amounts_of_comments}</p>
                                    </div>

                                    <div className={styles.account_p_div}>
                                        <p className={styles.account_p}><span className={styles.account_p_span}>Up Votes Made:</span> {user.amounts_of_up_votes}</p>
                                    </div>

                                    <div className={styles.account_p_div}>
                                        <p className={styles.account_p}><span className={styles.account_p_span}>Down Votes Made:</span> {user.amounts_of_down_votes}</p>
                                    </div>

                                    <div className={styles.account_p_div}>
                                        <p className={styles.account_p}><span className={styles.account_p_span}>Up Votes Received:</span> {user.amounts_of_received_up_votes}</p>
                                    </div>

                                    <div className={styles.account_p_div}>
                                        <p className={styles.account_p}><span className={styles.account_p_span}>Down Votes Received:</span> {user.amounts_of_received_down_votes}</p>
                                    </div>

                                </Col>

                                <Col xs={12} sm={12} md={12} lg={6} className={styles.account_card_col}>
                                    <div className={`${styles.account_p_div} ${styles.account_selected_icon_div}`}>
                                        <p className={styles.account_p}><span className={styles.account_p_span}>Icon:</span></p>
                                        {SelectedIcon(selected_icon, selected_icon_color, selected_icon_mode)}
                                    </div>

                                    <div className={`${styles.account_p_div} ${styles.account_p_icons_div}`}>
                                        <p className={styles.account_p}><span className={styles.account_p_span}>Change Icon:</span></p>
                                    </div>

                                    <Row className={styles.account_icons_row}>
                                        {account_total_icons.map((grid_icon, index) => {
                                            return (
                                                <Col key={index} xs={3} sm={3} md={3} lg={3} className={styles.account_icons_col}>
                                                    <div className={styles.account_icons_element_div} onClick={(e) => setSelectedIcon(grid_icon.name)}>
                                                        {grid_icon.icon}
                                                    </div>
                                                </Col>
                                            );
                                        })}
                                    </Row>

                                    <div className={`${styles.account_p_div} ${styles.account_p_icons_div}`}>
                                        <p className={styles.account_p}><span className={styles.account_p_span}>Change Color:</span></p>
                                    </div>

                                    <Row className={styles.account_icons_row}>
                                        {icons_total_colors.map((icon_color, index) => {
                                            return (
                                                <Col key={index} xs={3} sm={3} md={3} lg={3} className={styles.account_icons_col}>
                                                    <div className={styles.account_icons_color_element_div}
                                                        onClick={(e) => setSelectedIconColor(icon_color)}
                                                        style={{ backgroundColor: icon_color, border: " 2px solid " + icon_color }}
                                                    />
                                                </Col>
                                            );
                                        })}
                                    </Row>

                                    <div className={`mb-3 ${styles.account_outline_div}`}>
                                        <Form.Check
                                            type="switch"
                                            id="custom-switch"
                                            label="Outline"
                                            checked={selected_icon_mode}
                                            onChange={(e) => setSelectedIconMode(e.target.checked)}
                                        />
                                    </div>



                                </Col>
                            </Row>

                            <Row className={styles.account_card_row}>
                                <Col xs={12} sm={12} md={12} lg={6} className={styles.account_card_col}>
                                    <div className={styles.account_update_icon_button_div}>
                                        <Button className={styles.account_update_icon_button} onClick={(e) => handleShow()}>
                                            Edit Info
                                        </Button>
                                    </div>
                                </Col>

                                <Col xs={12} sm={12} md={12} lg={6} className={styles.account_card_col}>
                                    <div className={styles.account_update_icon_button_div}>
                                        <Button className={styles.account_update_icon_button} onClick={(e) => onUpdateIcon(e)}>
                                            Update Icon
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                        </Col>

                    </Row>

                </div>

                <EditAccountInfoModal user={user} show={show} handleClose={handleClose} onEdit={onUpdateInfo} />
            </main>
        </div>
    )
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

const account_total_icons = [
    {
        name: "Racket",
        icon: <TennisRacketSimpleR className={styles.account_icon} height={40} weight={40} />
    },
    {
        name: "Medal",
        icon: <MedalIcon className={styles.account_icon} height={40} weight={40} />
    },
    {
        name: "Tennis Court",
        icon: <TennisCourtIcon className={styles.account_icon} height={40} weight={40} />
    },
    {
        name: "Tennis Ball",
        icon: <TennisBallIcon className={styles.account_icon} height={40} weight={40} />
    }
]

const icons_total_colors = ['#38b6ff', '#aaaaaa', '#71a92c', '#cb5223']