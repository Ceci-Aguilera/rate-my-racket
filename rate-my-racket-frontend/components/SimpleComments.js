import React from "react";

import { Card } from "react-bootstrap";

import styles from "../styles/SimpleComments.module.css";

import { useEffect, useState } from "react";

import { ThumbsUpRegular, ThumbsDownRegular } from "./Icons"


function SimpleComments() {

    return (
        <div className={styles.simple_comments_div}>

            <h2 className={styles.simple_comments_title}>Latest Comments</h2>

            {fake_comments.map((comment, index) => {
                return (
                    <Card key={index} className={styles.simple_comments_card}>
                        <Card.Header className={styles.simple_comments_card_header}>
                            <div className={styles.simple_comments_card_header_avatar}></div>
                            <div className={styles.simple_comments_card_header_title}>{comment.username} - <span className={styles.simple_comments_card_header_span}>
                                {comment.about}</span>
                            </div>
                        </Card.Header>
                        <Card.Body className={styles.simple_comments_card_body}>
                            {comment.comment}
                        </Card.Body>
                        <Card.Footer className={styles.simple_comments_card_footer}>
                            <div className={styles.simple_comments_up_votes}>
                                <ThumbsUpRegular height={"25"} fill={"#38b6ff"} />
                                <div className={styles.simple_comments_card_footer_votes_div}>
                                    {comment.up_votes}
                                </div>
                            </div>

                            <div className={styles.simple_comments_down_votes}>
                                <ThumbsDownRegular height={"25"} fill={"#aaaaaa"} />
                                <div className={styles.simple_comments_card_footer_votes_div}>
                                    {comment.down_votes}
                                </div>
                            </div>
                        </Card.Footer>
                    </Card>
                )
            })}

        </div>
    );
}




//! FIX: Make comments do not excel an amount of characters for display (cut with "...")



// TODO This most be fetched from the Backend API (just 3 at most)
const fake_comments = [
    {
        username: "User 1", about: "Babolat Pure Drive", comment: "One of the best beginner-intermediate rackets", up_votes: 5, down_votes: 3
    },
    {
        username: "User 2", about: "Babolat Pure Drive", comment: "Best for beginners !!!", up_votes: 10, down_votes: 1
    },

]



export default SimpleComments;