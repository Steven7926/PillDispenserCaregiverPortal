import React, { useState } from 'react';
import logo from './logo.png';
import './App.css';
import './fontawesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'react-dropdown/style.css';

var BASE_URL = 'https://magicmeds.herokuapp.com/';

function App() {
    var firstname;
    var lastname;
    var phonenum;

    const [signupMessage, setSignupMessage] = useState('');


    const addCaregiver = async event => {
        event.preventDefault();

        if (firstname.value === "" || lastname.value === "" || phonenum.value === "") {
            setSignupMessage("Please fill in all of the blanks.");
            return;
        }

        var userInfo = '{"firstName":"'
            + firstname.value
            + '","lastName":"'
            + lastname.value
            + '","phoneNum":"'
            + phonenum.value          
            + '"}';

        try {
            const response = await fetch(BASE_URL + 'api/addCaregivertopool',
                { method: 'POST', body: userInfo, headers: { 'Content-Type': 'application/json' } });

            var res = JSON.parse(await response.text());

            if (res.status === "Caregiver already added!") {
                // Case for when the username is already taken
                setSignupMessage("Caregiver has already been added!");
            }
            else {
                // Case for when the username does not exist
                setSignupMessage("Caregiver has successfully been added to the database!");

            }
        }
        catch (e) {
            alert(e.toString());
            return;
        }
    };

  return (
    <div className="App">
      <div className="App-header">
        <p className= "headinglarge">Magic Meds</p>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
                  Welcome to Magic Meds! Fill out the form below to be added to the Caregiver database!
        </p>
        <p style={{fontSize: 'small'}}>
                ***By adding yourself as a caregiver you are consenting to receive sms text messages***
        </p>
        <form>
            <div>
                <span style={{ marginRight: '10px' }}><FontAwesomeIcon icon={['fas', 'user']} size="sm" style={{ color: 'white' }} transform="down-4" /></span>
                <input id="firstIn" className="inputslong" style={{ marginLeft: '10px' }} type="text" placeholder="First Name" ref={(c) => firstname = c}></input>
                <br></br>
                <span style={{ marginRight: '10px' }}><FontAwesomeIcon icon={['fas', 'signature']} size="sm" style={{ color: 'white' }} transform="down-4" /></span>
                <input id="lastIn" className="inputslong" type="text" placeholder="Last Name" ref={(c) => lastname = c}></input>
                <br></br>
                <span style={{ marginRight: '10px' }}><FontAwesomeIcon icon={['fas', 'hashtag']} size="sm" style={{ color: 'white' }} transform="down-4" /> </span>
                <input id="phonein" className="inputslong" type="text" placeholder="Phone Number" ref={(c) => phonenum = c}></input>
                <p style={{ fontSize: 'small' }}>As plain numbers please (Ex: 3524034106)</p>
                <br></br>                
            </div>
         </form>
         <button className="button" onClick={addCaregiver}>
            <b>Add me as a Caregiver!</b>
         </button>
         <span id="signupResult" className="addmessage">{signupMessage}</span>
      </div>
    </div>
  );
}

export default App;
