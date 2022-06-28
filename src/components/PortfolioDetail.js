import React from "react";
import PropTypes from "prop-types";

function PortfolioDetail(props) {
  console.log("Props: " + props.portfolio);
  const { portfolio, onClickingDelete} = props;
  

  return (
    <React.Fragment>
      <h1> Portfolio Detail</h1>
      <h3>{portfolio.name} - {portfolio.skills}</h3>
      <p><em>{portfolio.bio}</em></p>
      <button onClick={props.onClickingEdit}>Edit Portfolio</button>
      <button onClick={() => onClickingDelete(portfolio.id)}>Close Portfolio</button>
      <hr />
    </React.Fragment>
  );
}

PortfolioDetail.propTypes = {
  portfolio: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default PortfolioDetail;