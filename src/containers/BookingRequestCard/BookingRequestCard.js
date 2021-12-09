import React from "react";
import PropTypes from "prop-types";
import {
  Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './bookingrequestcard.css';


class BookingRequestCard extends React.Component {


  render() {
    return (
      <Segment basic>
        <div class="container">
          <div class="product-card">
            <div class="image">
              <img src="https://www.kicksonfire.com/wp-content/uploads/2018/06/air-jordan-1-mid-orange-peel-2.jpg" alt=""/>
            </div>
            <div class="card-content">
              <h3>Air Jordan 1 Mid</h3>
              <p>Lorem ipsum dolor sit amet, consectetur</p>
              <div class="store-purchase">
                <div class="price">$149.99</div>
                <div class="buy">
                  <button>Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

BookingRequestCard.propTypes = {
  title: PropTypes.string,
  desctiption: PropTypes.string,
  img: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingRequestCard);
