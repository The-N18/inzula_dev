import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './userreservations.css';
import { buildImagesLinkList } from "../../configurations";
import InfiniteScroll from 'react-infinite-scroll-component';
import { getReservations, getInitialReservations } from "../../store/actions/userReservations";
import BookingCard from "../../containers/BookingCard/BookingCard";
import $ from "jquery";
import {FormattedMessage} from 'react-intl'
import { openModal } from "../../store/actions/sendPackageModal";

class UserReservationsList extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    isMobile: false,
    isTablet: false
  };

  handleScreenSize = () => {
    if($(window).width() < 768) {
      this.setState({ isMobile: true });
    }
    if($(window).width() >= 768 && $(window).width() <= 950) {
      this.setState({ isTablet: true });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleScreenSize);
  }

  componentDidMount = () => {
    const { user_id } = this.props;
    this.props.getInitialUserReservations(user_id);
    window.addEventListener('resize', this.handleScreenSize, false);
    this.handleScreenSize();
    }

  fetchMoreData = () => {
    const { user_id, next_url, count } = this.props;
    this.props.getUserReservations(user_id, next_url, count);
  }

  getDivHeight = () => {
    const { isMobile, isTablet } = this.state;
    let val = 240;
    if(isTablet) {
      val = 300;
    }
    if(isMobile) {
      val = 445;
    }
    return val;
  }

  handleOpenSendPackageModal = () => {
    this.props.openPackageModal();
  }

/***************************************** */

  COLUMNS=[
    {
      Header: 'Image',
    },
    {
      Header: 'Nom',
    },
    {
      Header: 'Description',
    },
    {
      Header: "Date d'arrivée",
    },
    {
      Header: 'Ville de départ',
    },
    {
      Header: "Ville d'arrivée",
    },
    {
      Header: 'Prix',
    }
  ]


  render() {
    const { reservations, next_url, count, selectable, editable } = this.props;
    const dataLength = reservations ? reservations.length : 0;
    console.log("IN USERRESERVATIONSLIST", reservations);
    return (
      <React.Fragment>
        {reservations.length === 0 ? <div><FormattedMessage
          id="user_reservations.no_reservations"
          defaultMessage="You have not created any reservations."
        />
        <Button color='green' onClick={this.handleOpenSendPackageModal.bind(this)}>
              <FormattedMessage
                id="user_reservations.add_booking"
                defaultMessage="Add a booking"
            /></Button>
            </div> : <div className="dashboard-list-box with-icons">
        <div className="dashboard-title">
          <h4 className="mb-0">Liste de mes colis</h4>
          <p className="mb-0">Vous retrouvez ici la liste des colis que </p>
        </div>
        <div className="table-responsive table-desi">
          <table className="basic-table table table-hover">
            <thead>
              <tr>
                <th>Image</th>
                <th>Description</th>
                <th>Date d'arrivée</th>
                <th>Ville de départ</th>
                <th>Ville d'arrivée</th>
                <th>Prix</th>
                <th>Modifier</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="list-img"><img src="images/reviewer/1.jpg" alt="" className="w-50" /></span>
                </td>
                <td><a href="#"><span>Un petit smartphone de marque samsung.</span></a></td>
                <td>25 Juin 2021</td>
                <td>Paris</td>
                <td>Yaoundé</td>
                <td>
                  <a href="listing-edit.html"><i className="fa fa-eye text-primary" aria-hidden="true" /></a>
                </td>
                <td>
                  <a href="listing-edit.html"><i className="fa fa-pencil-square-o text-success" aria-hidden="true" /></a>
                </td>
                <td>
                  <a href="#"><i className="fa fa-trash-alt text-danger" aria-hidden="true" /></a>
                </td>
              </tr>





              <tr>
                <td><span className="list-img"><img src="images/reviewer/2.jpg" alt="" className="w-50" /></span>
                </td>
                <td><a href="#"><span>Un petit smartphone</span></a></td>
                <td>25 Juin 2021</td>
                <td>Paris</td>
                <td>Yaoundé</td>
                <td>
                  <a href="listing-edit.html"><i className="fa fa-eye text-primary" aria-hidden="true" /></a>
                </td>
                <td>
                  <a href="listing-edit.html"><i className="fa fa-pencil-square-o text-success" aria-hidden="true" /></a>
                </td>
                <td>
                  <a href="#"><i className="fa fa-trash-alt text-danger" aria-hidden="true" /></a>
                </td>
              </tr>
              <tr>
                <td><span className="list-img"><img src="images/reviewer/3.jpg" alt="" className="w-50" /></span>
                </td>
                <td><a href="#"><span>Un petit smartphone</span></a></td>
                <td>25 Juin 2021</td>
                <td>Paris</td>
                <td>Yaoundé</td>
                <td>
                  <a href="listing-edit.html"><i className="fa fa-eye text-primary" aria-hidden="true" /></a>
                </td>
                <td>
                  <a href="listing-edit.html"><i className="fa fa-pencil-square-o text-success" aria-hidden="true" /></a>
                </td>
                <td>
                  <a href="#"><i className="fa fa-trash-alt text-danger" aria-hidden="true" /></a>
                </td>
              </tr>
              <tr>
                <td><span className="list-img"><img src="images/reviewer/4.jpg" alt="" className="w-50" /></span>
                </td>
                <td><a href="#"><span>Un petit smartphone</span></a></td>
                <td>25 Juin 2021</td>
                <td>Paris</td>
                <td>Yaoundé</td>
                <td>
                  <a href="listing-edit.html"><i className="fa fa-eye text-primary" aria-hidden="true" /></a>
                </td>
                <td>
                  <a href="listing-edit.html"><i className="fa fa-pencil-square-o text-success" aria-hidden="true" /></a>
                </td>
                <td>
                  <a href="#"><i className="fa fa-trash-alt text-danger" aria-hidden="true" /></a>
                </td>
              </tr>
              <tr>
                <td><span className="list-img"><img src="images/reviewer/5.jpg" alt="" className="w-50" /></span>
                </td>
                <td><a href="#"><span>Un petit smartphone</span></a></td>
                <td>25 Juin 2021</td>
                <td>Paris</td>
                <td>Yaoundé</td>
                <td>
                  <a href="listing-edit.html"><i className="fa fa-eye text-primary" aria-hidden="true" /></a>
                </td>
                <td>
                  <a href="listing-edit.html"><i className="fa fa-pencil-square-o text-success" aria-hidden="true" /></a>
                </td>
                <td>
                  <a href="#"><i className="fa fa-trash-alt text-danger" aria-hidden="true" /></a>
                </td>
              </tr>
              <tr>
                <td><span className="list-img"><img src="images/reviewer/1.jpg" alt="" className="w-50" /></span>
                </td>
                <td><a href="#"><span>Un petit smartphone</span></a></td>
                <td>25 Juin 2021</td>
                <td>Paris</td>
                <td>Yaoundé</td>
                <td>
                  <a href="listing-edit.html"><i className="fa fa-eye text-primary" aria-hidden="true" /></a>
                </td>
                <td>
                  <a href="listing-edit.html"><i className="fa fa-pencil-square-o text-success" aria-hidden="true" /></a>
                </td>
                <td>
                  <a href="#"><i className="fa fa-trash-alt text-danger" aria-hidden="true" /></a>
                </td>
              </tr>
              <tr>
                <td><span className="list-img"><img src="images/reviewer/2.jpg" alt="" className="w-50" /></span>
                </td>
                <td><a href="#"><span>Un petit smartphone</span></a></td>
                <td>25 Juin 2021</td>
                <td>Paris</td>
                <td>Yaoundé</td>
                <td>
                  <a href="listing-edit.html"><i className="fa fa-eye text-primary" aria-hidden="true" /></a>
                </td>
                <td>
                  <a href="listing-edit.html"><i className="fa fa-pencil-square-o text-success" aria-hidden="true" /></a>
                </td>
                <td>
                  <a href="#"><i className="fa fa-trash-alt text-danger" aria-hidden="true" /></a>
                </td>
              </tr>
              <tr>
                <td><span className="list-img"><img src="images/reviewer/3.jpg" alt="" className="w-50" /></span>
                </td>
                <td><a href="#"><span>Un petit smartphone</span></a></td>
                <td>25 Juin 2021</td>
                <td>Paris</td>
                <td>Yaoundé</td>
                <td>
                  <a href="listing-edit.html"><i className="fa fa-eye text-primary" aria-hidden="true" /></a>
                </td>
                <td>
                  <a href="listing-edit.html"><i className="fa fa-pencil-square-o text-success" aria-hidden="true" /></a>
                </td>
                <td>
                  <a href="#"><i className="fa fa-trash-alt text-danger" aria-hidden="true" /></a>
                </td>
              </tr>
              <tr>
                <td><span className="list-img"><img src="images/reviewer/4.jpg" alt="" className="w-50" /></span>
                </td>
                <td><a href="#"><span>Un dernier smartphone</span></a></td>
                <td>25 Juin 2021</td>
                <td>Paris</td>
                <td>Yaoundé</td>
                <td>
                  <a href="listing-edit.html"><i className="fa fa-eye text-primary" aria-hidden="true" /></a>
                </td>
                <td>
                  <a href="listing-edit.html"><i className="fa fa-pencil-square-o text-success" aria-hidden="true" /></a>
                </td>
                <td>
                  <a href="#"><i className="fa fa-trash-alt text-danger" aria-hidden="true" /></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
            
            
            }

      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    user_id: state.userInfo.userId,
    reservations: state.userReservations.reservations,
    next_url: state.userReservations.next_url,
    count: state.userReservations.count,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openPackageModal: () => dispatch(openModal()),
    getUserReservations: (user_id, next_url, count) => dispatch(getReservations(user_id, next_url, count)),
    getInitialUserReservations: (user_id) => dispatch(getInitialReservations(user_id)),
  };
};

UserReservationsList.propTypes = {
  profileType: PropTypes.string,
  selectable: PropTypes.boolean,
  editable: PropTypes.boolean,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserReservationsList);
