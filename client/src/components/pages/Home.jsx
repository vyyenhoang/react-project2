import React from 'react';
import { Container } from 'react-bootstrap';
function Home () {
  return (
    <Container className="my-5">
      <header class="jumbotron">
        <h1>About the project</h1>
      </header>

  
    <p className = "Lead">The purpose of this application is to remind that once you had a dream to become someone at some point in your life. It will help you to remind your targets, goals and carrer's target that you want to achieve at certain age in the future. Once dream is created, you must commit to your dream and you cannot edit or delete your dream. When you pass your target dream age, the application will calculate how many years have passed and allow you to edit or kill your dream. </p>
  
   
  
    <h2>Career Dream Box Stories</h2>
  
    <ul>
      <li>
        Users can store their dream career by creating new dream
      </li>
      <li>
        Users must input the target dream age that they want to achieve their dreams
      </li>
      <li>
        Users are not allowed edit and delete their dreams until they are older than their target dream age
      </li>
  
      <li>
        Users can only view their dreams if their target dream age do not pass their current age
      </li>
      <li>
        User can view list of their dream by going to index
      </li>
    
    </ul>
    <h2>User Stories</h2>
  <ul>
    <li>
      User can only view their own dreams
    </li>
    <li>User can only edit, delete and create their own dreams</li>
    <li>
      User can store their name, birthday and information of what they love to do
    </li>
  </ul>
 

    </Container>
  
 );
};

export default Home;