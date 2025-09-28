// src/components/ConfirmDialog.jsx
import React from "react";
import { Modal, Button } from "react-bootstrap";
import './confirmDialog.css'
const ConfirmDialog = ({ show, onHide, onConfirm, title, message }) => {
  return (
    <div className="confirm-dilaog">
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title || "Confirm Action"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message || "Are you sure you want to proceed?"}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Yes, Confirm
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
};

export default ConfirmDialog;
