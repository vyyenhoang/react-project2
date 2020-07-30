import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

const Show = function (props, {user}) {

const id = props.location.state.id; // found in docs for react router

const [dream, setDream] = useState({});

const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      await getDream();
     
    })();
  }, []);

  const getDream = async () => {
    const dreamResp = await Axios.get(`/api/dreams/${id}`);
    if (dreamResp.status === 200) setDream(dreamResp.data);
  }

  const deleteDream = async dream => {
    try {
      const resp = await Axios.post('/api/dreams/delete', {
        id: dream._id
      });

      if (resp.status === 200) 
      toast("The dream was deleted successfully", {type: toast.TYPE.SUCCESS});
      setRedirect(true);
    //  await getDream();
    
    } catch (error) {
      toast("There was an error deleting the dream", {type: toast.TYPE.ERROR});
    }
};

  
  if (redirect) return (<Redirect to="/dreams"/>);

  return (
    <Container className="my-5">
      <header>
        <h1>{dream.title}</h1>
      
      </header>

       <hr/>

      <div className="container my-5">

        <h1 className="display-4">I love to become a <strong>{dream.title}</strong></h1>

        <p className = "lead">This is why you want to be a <em>{dream.title}</em></p>
    
        <p>  {dream.note}</p>


        {dream.ageGap < 0 &&
              
          <div className="card-footer">

            <button type="button" onClick={() => deleteDream(dream)}>
              <i className="fa fa-trash"></i>
            </button>
      
          </div>
        }   

      </div>  
    
    </Container>
  );

};

export default Show;