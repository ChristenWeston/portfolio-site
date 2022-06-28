import React from "react";
import PropTypes from "prop-types";

function Portfolio(props){
  return (
    <React.Fragment>
      <div onClick = {() => props.whenPortfolioClicked(props.id)}>
        <h3>{props.name}</h3>
        <h4>{props.projects}</h4>
        <h4>{props.skills}</h4>
        <h5>{props.bio}</h5>
        <hr/>
      </div>
    </React.Fragment>
  );
}

Portfolio.propTypes = {
  name: PropTypes.string,
  projects: PropTypes.string,
  skills: PropTypes.string,
  bio: PropTypes.string,
  id: PropTypes.string,
  whenPortfolioClicked: PropTypes.func
};

export default Portfolio;