import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <p>
        <strong>firstname:</strong> {currentUser.firstname}
      </p>
      <p>
        <strong>name:</strong> {currentUser.name}
      </p>
      <p>
        <strong>City:</strong> {currentUser.city}
      </p>
      <p>
        <strong>address:</strong> {currentUser.adress}
      </p>
      <p>
        <strong>postalCode:</strong> {currentUser.postalcode}
      </p>
      <p>
        <strong>phone:</strong> {currentUser.phone}
      </p>
      <p>
        <strong>cv:</strong> {currentUser.cv}
      </p>
      <p>
        <strong>profilPic:</strong> {currentUser.profilpic}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
};

export default Profile;
