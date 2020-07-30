import React, { useState, useEffect } from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const Edit = function (props) {

  const id = props.location.state.id; // found in docs for react router

  const [inputs, setInputs] = useState({
    title: '',
    content: '',
    note: '',
    age: '',


  });

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const dreamResp = await Axios.get(`/api/dreams/${id}`);
      if (dreamResp.status === 200) setInputs(dreamResp.data);
    })();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const resp = await Axios.post('/api/dreams/update', inputs);

      if (resp.status === 200)  {
        toast("The dream was updated successfully", {
          type: toast.TYPE.SUCCESS
        });
        setRedirect(true);
      } else {
        toast("There was an issue updating the dream", {
          type: toast.TYPE.ERROR
        });
      }
    } catch (error) {
      toast("There was an issue updating the dream", {
        type: toast.TYPE.ERROR
      });
    }
  };

  const handleInputChange = async event => {
    event.persist();

    const { name, value } = event.target;

    setInputs(inputs => ({
      ...inputs,
      [name]: value
    }));
  };

  if (redirect) return (<Redirect to="/dreams"/>);

  return (
    <Container className="my-5">
      <header>
        <h1>Edit Dream Post</h1>
      </header>

      <hr/>

      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Your Dream Career Title:</Form.Label>
            <Form.Control
              name="title"
              onChange={handleInputChange}
              value={inputs.title}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Why do you want this career:</Form.Label>
            <Form.Control
              as="textarea"
              name="note"
              onChange={handleInputChange}
              value={inputs.note}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>At what age you want to achieve your dream?:</Form.Label>
            <Form.Control
              name="age"
              onChange={handleInputChange}
              value={inputs.age}
            />
          </Form.Group>

          <Form.Group>
            <button type="submit" className="btn btn-primary">Update</button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );

};

export default Edit;