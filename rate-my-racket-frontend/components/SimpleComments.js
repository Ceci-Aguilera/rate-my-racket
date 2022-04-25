import React from "react";

import axios from "axios";

import { Button, Card } from "react-bootstrap";

import styles from "../styles/SimpleComments.module.css";

import { useEffect, useState } from "react";

import { ThumbsUpRegular, ThumbsDownRegular, MedalIcon, TennisRacketSimpleR, TennisCourtIcon, TennisBallIcon } from "./Icons"

import { useAuth } from "../context/AuthContext"

const domain = process.env.NEXT_PUBLIC_BACKEND_API_URL

function SimpleComments() {

    const { user } = useAuth()

    const [comments, setComments] = useState(null);

    useEffect(() => {
        async function FetchComments() {
            const temp_comments = await getComments();
            setComments(temp_comments.comments);
        }

        FetchComments();
    }, [])

    const onCreateVoting = async (e, comment_id, vote_type) => {
        e.preventDefault();

        if (user != null) {

            const body = JSON.stringify({
                vote_type,
            })
            const result = await createVoting(comment_id, user.user.id, body)
            const temp_comments = await getComments();
            setComments(temp_comments.comments);
        }
    }

    return (comments == null) ? <div></div> : (
        <div className={styles.simple_comments_div}>

            <h2 className={styles.simple_comments_title}>Latest Rates</h2>

            {comments.map((comment, index) => {
                return (
                    <Card key={index} className={styles.simple_comments_card}>
                        <Card.Header className={styles.simple_comments_card_header}>
                            <div className={styles.simple_comments_card_header_avatar}>
                                {SelectedIcon(comment.userprofile.profile_icon, comment.userprofile.profile_icon_color, comment.userprofile.profile_icon_color_mode)}
                            </div>
                            <div className={styles.simple_comments_card_header_title}>{comment.userprofile.username} - <span className={styles.simple_comments_card_header_span}>
                                {comment.racket.title}</span>
                            </div>
                        </Card.Header>
                        <Card.Body className={styles.simple_comments_card_body}>
                            {comment.comments ? TruncateText(comment.comments) : "Rated this Racket"}
                        </Card.Body>

                        {comment.comments ? <Card.Footer className={styles.simple_comments_card_footer}>
                            <div className={styles.simple_comments_up_votes}>
                                <Button className={styles.simple_comments_button} onClick={(e) => onCreateVoting(e, comment.id, "UP_VOTE")}>
                                    <ThumbsUpRegular height={"25"} fill={"#38b6ff"} />
                                </Button>
                                <div className={styles.simple_comments_card_footer_votes_div}>
                                    {comment.amounts_of_up_votes}
                                </div>
                            </div>

                            <div className={styles.simple_comments_down_votes}>
                                <Button className={styles.simple_comments_button} onClick={(e) => onCreateVoting(e, comment.id, "DOWN_VOTE")}>
                                    <ThumbsDownRegular height={"25"} fill={"#aaaaaa"} />
                                </Button>
                                <div className={styles.simple_comments_card_footer_votes_div}>
                                    {comment.amounts_of_down_votes}
                                </div>
                            </div>
                        </Card.Footer> : <div></div>}
                    </Card>
                )
            })}

        </div>
    );
}




const TruncateText = (text) => {
    if (text.length > 200) {
        return (text.substring(0, 200) + " ...")
    }
    else {
        return text
    }
}


const getComments = async () => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    const comments_url = `${domain}/comments-rackets-app/latest-comments/`



    return axios.get(comments_url, config).then(async (res) => {
        const result = await res.data;
        return {
            status: "COMMENTS_FOUND", comments: result
        }
    }).catch((error) => {
        return {
            status: "COMMENTS_NOT_FOUND", comments: null
        }
    })
}

const createVoting = async (comment_id, user_id, body) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    const comments_url = `${domain}/comments-rackets-app/create-vote/${comment_id}/${user_id}/`



    return axios.post(comments_url, body, config).then(async (res) => {
        return "Success"
    }).catch((error) => {
        return "Error"
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
                <MedalIcon className={`${styles.account_icon} ${styles.account_selected_icon}`} height={30} weight={30} fill={final_icon_color} />
            </div>
        );

    }

    if (icon_name == "Racket") {

        return (
            <div className={styles.account_icon_div} style={{ backgroundColor: background_color, border: " 2px solid " + icon_color }} >
                <TennisRacketSimpleR className={`${styles.account_icon} ${styles.account_selected_icon}`} height={30} weight={30} fill={final_icon_color} />
            </div>
        );

    }

    if (icon_name == "Tennis Court") {

        return (
            <div className={styles.account_icon_div} style={{ backgroundColor: background_color, border: " 2px solid " + icon_color }} >
                <TennisCourtIcon className={`${styles.account_icon} ${styles.account_selected_icon}`} height={20} weight={20} fill={final_icon_color} />
            </div>
        );

    }

    if (icon_name == "Tennis Ball") {

        return (
            <div className={styles.account_icon_div} style={{ backgroundColor: background_color, border: " 2px solid " + icon_color }} >
                <TennisBallIcon className={`${styles.account_icon} ${styles.account_selected_icon}`} height={30} weight={30} fill={final_icon_color} />
            </div>
        );

    }


}


export default SimpleComments;