import React from "react";
import PropTypes from "prop-types";

function PortfolioDetail(props) {
  console.log("Props: " + props.portfolio);
  const { portfolio, onClickingDelete} = props;
  

  return (
    <React.Fragment>
      <center>
      <div className="card shadow-lg w-75 mx-auto" style={{fontSize: 24, color: "black"}}>
        <div className="headingFont card-header text-center text-black" style={{fontSize: 24, backgroundColor: "#ffdcd2", color: "black"}}><em>Portfolio Details</em></div>
          <div className="card-body">
            <div class="row">
            <h3>{portfolio.name} - {portfolio.skills}</h3>
            <p><em>{portfolio.bio}</em></p>
            <button onClick={props.onClickingEdit}>Edit Portfolio</button>
            <button onClick={() => onClickingDelete(portfolio.id)}>Close Portfolio</button>
            <hr />
          </div>
        </div>
      </div>
      </center>
    </React.Fragment>
  );
}

PortfolioDetail.propTypes = {
  portfolio: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default PortfolioDetail;