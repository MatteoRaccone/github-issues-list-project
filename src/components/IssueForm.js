import React from "react";
import { useInput } from './useInput';
import { Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";


export function IssueForm(props) {
    const { value:Author, bind:bindAuthor, reset:resetAuthor } = useInput('');
    const { value:Body, bind:bindBody, reset:resetBody } = useInput('');
    
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Submitting Name ${Author} ${Body}`);
        resetAuthor();
        resetBody();
    }
    return (
      <div className ="container mt-5 mb-5 newissue-container p-3">
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="issue-author">
                    <Form.Control as="textarea" placeholder="Author" rows={1} className="newissue-author" {...bindAuthor}/>
                </Form.Group>
                <Form.Group controlId="issue-title">
                    <Form.Control as="textarea" placeholder="Title" rows={1} className="newissue-title"/>
                </Form.Group>
                <Form.Group controlId="issue-content">
                    <Form.Control as="textarea" rows={4} placeholder="Leave a comment" className="newissue-body" {...bindBody}/>
                </Form.Group>
                <Link className= "ml-auto new-issue-link float-left" to= "/">Back to issues</Link>
                <Button variant="success" type="submit" className="float-right">Submit</Button>
            </Form>
        </div>
    );
  }