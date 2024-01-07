import React from "react";
import "./FeedbackItem.css";

const FeedbackItem = () => {
  return (
    <div>
      <div className="feedback-item">
        <div className="feedback-top">
          <div className="feedback-username">
            <h3>Dilli</h3>
          </div>
          <div className="feedback-date">
            <h5>Fri Jul 16 2023 11:17:40 (IST)</h5>
          </div>
        </div>
        <div className="feedback-text">
          <h4>
            The website is very user friendy and its a great platform for the
            people who are facing the problem in the institution...Nice
            work...Keep it up..🥳 !!
          </h4>
        </div>
      </div>
    </div>
  );
};

export default FeedbackItem;
