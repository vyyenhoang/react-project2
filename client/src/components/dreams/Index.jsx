import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Axios from 'axios';
//import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Index = function ({user}) {

  const [dreams, setDreams] = useState([]);

  useEffect(() => {
    (async () => {
      await getDreams();
    })();
  }, []);

  const getDreams = async () => {
    const dreamsResp = await Axios.get('/api/dreams');
   
    if (dreamsResp.status === 200) setDreams(dreamsResp.data);
  };





 
  return (
    <Container className="my-5">
      <header>
        <h1>List of your dreams</h1>

      
        <Link to={{
                  pathname: "/dreams/new"
                }}>
                 <p>Create New</p>
                </Link>
   
      </header>

    
      <hr/>
     
      <div className="row">
        {dreams && dreams.map((dream, i) => (

        <div class="col-md-4 mb-5">
          <div key={i} className="card-body">
            <div className="card-header clearfix">
              <div className="float-left">
                <h5 className="card-title">
                  {dream.title}
                </h5>
                {dream.user ? (
                  
                  <p>~{dream.user.fullname} </p>
                ) : null} 
                  
                  <small>{dream.updatedAt}</small>
                   
                   <Link to={{
                  pathname: "/dreams/show",
                  state: {
                    id: dream._id
                  }
                }}>
                  
                  <p> Read More</p>
                  
                </Link>
                
  
              </div>

            </div>

            <div className="card-body">
              <p className="lead">I am now <strong>{dream.user.ageNow} years old </strong> and I am going to become a <strong>{dream.title}</strong> at the age of <strong>{dream.age}</strong> </p>
                 {dream.ageGap > 0  &&     
                <p className="lead">I want to remind myself that I have <strong>{dream.ageGap} years left </strong>to achieve this dream. </p>
              }
          
              {dream.ageGap == 0  &&     
                <p className="lead">Now it is time for you to step up your game. You have <strong>{dream.ageGap} years left </strong>to achieve this dream. </p>
              } 
              
              {dream.ageGap < 0 &&
                <p className="lead">I pass {dream.ageGapAbs} years to achieve my dream. You can now go ahead and <strong>Edit</strong> your dream. If you want to <strong>delete</strong> your dream, <strong>click Read More</strong> and read your note one more time before deleting it.</p>
               }  
          </div>

            {dream.ageGap < 0 &&
              <div className="card-footer">
                 <Link to={{
                  pathname: "/dreams/edit",
                  state: {
                    id: dream._id
                  }
                }}>
                  <i className="fa fa-edit"></i>
                </Link>
           
                </div>  
        }
        </div>   
      </div>         
      )  )} 
      </div> 
  
    </Container>
  );

};

export default Index;