import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

const IssueForm = ({onSubmit}) => {

    return (
        <div className ="container mt-5 mb-5 newissue-container p-3">
            <Form onSubmit={onSubmit}>
            <Form.Group controlId="issue-author">
                    <Form.Control as="textarea" placeholder="Author" rows={1} className="newissue-author"/>
                </Form.Group>
                <Form.Group controlId="issue-title">
                    <Form.Control as="textarea" placeholder="Title" rows={1} className="newissue-title"/>
                </Form.Group>
                <Form.Group controlId="issue-content">
                    <Form.Control as="textarea" rows={4} placeholder="Leave a comment" className="newissue-body"/>
                </Form.Group>
                <Link className= "ml-auto new-issue-link float-left" to= "/">Back to issues</Link>
                <Button variant="success" type="submit" className="float-right">Submit</Button>
            </Form>
        </div>
        
    );
}

export default IssueForm;