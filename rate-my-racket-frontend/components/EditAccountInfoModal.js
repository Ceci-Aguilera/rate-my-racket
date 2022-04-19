import React from "react";
import Link from "next/link"

import { Modal, Button, Form } from "react-bootstrap";

import styles from "../styles/EditAccountInfoModal.module.css";

import { useEffect, useState } from "react";
import Image from "next/image";

import { useAuth } from "../context/AuthContext";


function EditAccountInfoModal({ user, show, handleClose, onEdit }) {

    const [email, setEmail] = useState("");

    useEffect(() => {
        if (user != null) {
            setEmail(user.user.email)
        }
    }, [user])


    const onSubmit = async (e) => {
        e.preventDefault();

        const body = JSON.stringify({
            email: email,
        })
        const result = await onEdit(body);
        handleClose();
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Form onSubmit={(e) => onSubmit(e)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className={`mb-3 ${styles.edit_group}`}>
                        <Form.Label className={styles.edit_label}>Email</Form.Label>
                        <Form.Control className={styles.edit_control} type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className={styles.edit_button} onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className={styles.edit_button} type="submit">Update Info</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default EditAccountInfoModal;