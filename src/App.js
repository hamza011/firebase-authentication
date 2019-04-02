import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';


class App extends Component {

  email;
  password;
  todo;
  uId;

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <input type="email" placeholder="Email" ref={el => this.email = el} />
        <input type="password" placeholder="Password" ref={el => this.password = el} />
        {/* <button onClick={this.checkUser.bind(this)}>Submit</button> */}
        <button onClick={this.signIn.bind(this)}>Submit</button>

        <div>
          <input type="text" placeholder="Todo" ref={el => this.todo = el} />
          <button onClick={this.add.bind(this)}>Add Todo</button>
        </div>
      </div>
    );
  }

  add() {
    console.log("Step 1");
    firebase.database().ref('todos/' + this.uId).set({
      todo: this.todo.value
    });
    console.log("Step 2");
  }

  get() {
    firebase.database().ref('todos/' + this.uId).once('value').then(function (snapshot) {
      // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      console.log("Snapshot: ", snapshot.val());
    });
  }

  checkUser() {
    firebase.auth().createUserWithEmailAndPassword(this.email.value, this.password.value).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

  signIn() {
    firebase.auth().signInWithEmailAndPassword(this.email.value, this.password.value)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    }).then((response) => {
      console.log("Response ==> ", response);
      this.uId = response.user.uid;
      this.get();
    });
  }

}

export default App;




//  data:image/png;base64,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