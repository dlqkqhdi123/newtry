import React from "react";
import "./AboutThree.css";
import HotdogFront from "../assets/source/About_dachshund_front.gif";
import HotdogBack from "../assets/source/About_dachshund_back.gif";

function AboutThree() {
  return (
    <div className="container-about-three">
      <div className="content-item">
        <div className="content-item-one">
          <img className="hotdog-front" src={HotdogFront} alt="hotdog-front" />
          <p className="hotdog-text">
            We provide the service that our pets will be healthy.
          </p>
          <p className="hotdog-text">
            &nbsp; Pet medical care platform service Hospetal.
          </p>
          <img
            className="hotdog-back"
            src={HotdogBack}
            alt="hotdog-back"
            style={{ marginRight: "50px" }}
          />
          <img className="hotdog-front" src={HotdogFront} alt="hotdog-front" />
          <p className="hotdog-text">
            We provide the service that our pets will be healthy.
          </p>
          <p className="hotdog-text">
            &nbsp; Pet medical care platform service Hospetal.
          </p>
          <img className="hotdog-back" src={HotdogBack} alt="hotdog-back" />
        </div>
        <div className="content-item-two">
          <img className="hotdog-front" src={HotdogFront} alt="hotdog-front" />
          <p className="hotdog-text">
            We provide the service that our pets will be healthy.
          </p>
          <p className="hotdog-text">
            &nbsp; Pet medical care platform service Hospetal.
          </p>
          <img
            className="hotdog-back"
            src={HotdogBack}
            alt="hotdog-back"
            style={{ marginRight: "50px" }}
          />
          <img className="hotdog-front" src={HotdogFront} alt="hotdog-front" />
          <p className="hotdog-text">
            We provide the service that our pets will be healthy.
          </p>
          <p className="hotdog-text">
            &nbsp; Pet medical care platform service Hospetal.
          </p>
          <img className="hotdog-back" src={HotdogBack} alt="hotdog-back" />
        </div>
      </div>
    </div>
  );
}

export default AboutThree;
