import React, { Component } from 'react';
import { Modal, Form, Col } from 'react-bootstrap';
import './popup.sass';

export default class PopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      showModal: false
    };
  }

  handleClose = () => {
    this.props.toggleModal();
  }

  render() {
    return (
      <>
        <Modal show={this.props.isShow || this.state.showModal} onHide={this.handleClose} animation={true} dialogClassName="modal-90w" centered>
          <Modal.Header closeButton />
          <Modal.Body>
            <Form>
              <Form.Row>
                <Col>
                  <Form.Label>Month</Form.Label>
                  <Form.Control type="text" value={this.props.date && this.props.date.toLocaleDateString('en-US', { month: 'long'})} readOnly />
                </Col>
                <Col>
                  <Form.Label>Day</Form.Label>
                  <Form.Control type="text" value={this.props.date && this.props.date.toLocaleDateString('en-US', {day: 'numeric'}) + 'th ' + this.props.date.toLocaleDateString('en-US', {weekday: 'long'})} readOnly />
                </Col>
              </Form.Row>
            </Form>
          </Modal.Body>
        </Modal>
    </>
    )
  }
}