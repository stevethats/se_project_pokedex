import { useState } from "react";

import "./About.css";
import luxuryBall from "../assets/luxuryball.png";

import { aboutObjects } from "../utils/constants";

function About() {
  const [selectedPhoto, setSelectedPhoto] = useState(aboutObjects[0]);

  const handleButtonClick = (obj) => {
    setSelectedPhoto(obj);
  };

  return (
    <section className="about">
      <section className="about__header">
        <span className="about__title-section">
          <img
            className="about__luxury-ball-image"
            src={luxuryBall}
            alt="Luxury Ball"
          />
          <h1 className="about__title">About Me</h1>
          <img
            className="about__luxury-ball-image"
            src={luxuryBall}
            alt="Luxury Ball"
          />
        </span>
        <p className="about__header-text">
          Hi! Welcome to my Pokédex! I'm glad to be able to show off the skills
          I've learned starting from 2024 learning about Web Development. On
          this page, you get to learn a little more about me and what I like to
          do outside of tapping away at my keyboard. Try clicking one of the
          blue buttons at the bottom!
        </p>
      </section>
      <section className="about__body">
        <div className="about__screen">
          <img className="about__screen-image" src={selectedPhoto.image} />
          <p className="about__screen-message">{selectedPhoto.message}</p>
        </div>
        <div className="about__photo-selector-section">
          <p className="about__button-label">Photo Selector</p>
          <div className="about__blue-button-container">
            {aboutObjects.map((obj, index) => (
              <button
                key={index}
                className="about__blue-button"
                onClick={() => handleButtonClick(obj)}
              ></button>
            ))}
          </div>
        </div>
        <div className="about__decor-buttons">
          <span>
            <div className="about__black-button-rim about__black-button-left"></div>
            <div className="about__black-button about__black-button-left"></div>
            <div className="about__black-button-rim about__black-button-right"></div>
            <div className="about__black-button about__black-button-right"></div>
          </span>
          <span className="about__white-button-rim-container">
            <div className="about__white-button-rim"></div>
            <div className="about__white-button-rim"></div>
          </span>
          <span className="about__white-button-container">
            <div className="about__white-button"></div>
            <div className="about__white-button"></div>
          </span>
          <div className="about__black-decor-screen about__black-decor-screen-left"></div>
          <div className="about__black-decor-screen about__black-decor-screen-right"></div>
          <div className="about__yellow-light-rim"></div>
          <div className="about__yellow-light"></div>
        </div>
      </section>
    </section>
  );
}

export default About;
