import React from "react";
import Portfolio from "./Portfolio";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'

function PortfolioList(props){
  useFirestoreConnect([
    { collection: 'portfolios' }
  ]);

  const portfolios = useSelector(state => state.firestore.ordered.portfolios);
  if (isLoaded(portfolios)) {
    return (
      <React.Fragment>
        <hr />
        {portfolios.map((portfolio) => {
        return <Portfolio
        whenPortfolioClicked = { props.onPortfolioSelection }
        name= { props.name}
        projects = { props.projects}
        skills = {props.skills}
        bio = { props.bio }/>
  })}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h3>Loading...</h3>
      </React.Fragment>
    )
  }
}

PortfolioList.propTypes = {
  onPortfolioSelection: PropTypes.func
};

export default PortfolioList;