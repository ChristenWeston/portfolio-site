import React from "react";
import Portfolio from "./Portfolio";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase'

function PortfolioList(props){
  useFirestoreConnect([
    { collection: 'portfolio' }
  ]);

  const portfolios = useSelector(state => state.firestore.ordered.portfolio);
  console.log(portfolios);
  if (isLoaded(portfolios)) {
    return (
      <React.Fragment>
        <center>
        <hr />
        <h1>Hi I am a portfolio list</h1>
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-3">
        {portfolios.map((portfolio) => {
        return <Portfolio
        whenPortfolioClicked = { props.onPortfolioSelection }
        name= { portfolio.name}
        projects = { portfolio.projects}
        skills = {portfolio.skills}
        bio = { portfolio.bio }
        id={portfolio.id} 
        key={portfolio.id}/>
        })}
        </div>
        </center>
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