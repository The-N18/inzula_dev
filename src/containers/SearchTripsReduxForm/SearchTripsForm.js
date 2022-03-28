import React from "react";
import {
  Container,
  Header,
  Segment,
  Divider,
  Grid 
} from "semantic-ui-react";
import { connect } from "react-redux";
import { searchTrips } from "../../store/actions/searchTrips";
import styles from './searchtripsform.module.css';
import TripCard from "../../containers/TripCard/TripCard";
import InfiniteScroll from 'react-infinite-scroll-component';
import { openModal, closeModal } from "../../store/actions/sendPackageModal";
import { createNotif } from "../../store/actions/appConfig";
import { Field, reduxForm, formValueSelector } from 'redux-form'
import {renderDateTimePicker, renderCitiesList, renderDateTimePickerDown} from "../../containers/ReduxForm/renderField";
import $ from "jquery";
import {FormattedMessage} from 'react-intl'
import {NOTIFICATION_TYPE_WARNING} from 'react-redux-notify';
import { openLoginParentModal } from "../../store/actions/loginParentModal";
import { Button} from 'reactstrap';
// import 'react-widgets/dist/css/react-widgets.css';

class SearchTripsForm extends React.Component {

  state = {
    isMobile: false,
    isTablet: false
  }

  handleResetFields = ()=>{
    const {reset,initialize}=this.props;
    initialize();
    
  }

  submitForm = (val) => {
    const { user_id, next_url, count } = this.props;
    console.log("SearchTripsForm submitForm",next_url)
    const departureLocation = val['departure_location'] ? val['departure_location']['pk'] : null;
    const destinationLocation = val['destination_location'] ? val['destination_location']['pk'] : null;
    this.props.findTrip(departureLocation, destinationLocation, val['travel_date'], user_id, next_url, count);
  };

  fetchMoreData = () => {
    const { user_id, next_url, count, departure_location, destination_location, travel_date } = this.props;
    this.props.findTrip(departure_location, destination_location, travel_date, user_id, next_url, count);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
    window.addEventListener('resize', this.handleScreenSize, false);
    this.handleScreenSize();
    
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScreenSize);
  }

  handleScreenSize = () => {
    if($(window).width() < 768) {
      this.setState({ isMobile: true });
    }
    if($(window).width() >= 768 && $(window).width() <= 950) {
      this.setState({ isTablet: true });
    }
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
    if(this.props.authenticated) {
      this.props.openPackageModal();
      $("#sendPackage").modal("show");
    } else {
      this.props.createNotif("send_package.login_msg", "Please login to create a booking request.", NOTIFICATION_TYPE_WARNING);
      this.props.openLoginModal();
      $("#login").modal("show");
    }
  }


  render() {
    const { loading, trips, next_url, count, handleSubmit, lang } = this.props;
    return (
      <Container className={"layoutcontainer"}>
          <Segment id="search_trips_section">
          {/* <Header as="h4" textAlign="center">
            <FormattedMessage
              id="search_trips.title"
              defaultMessage="Prefer to know what shipping offers are available before committing?"
            />
          </Header> */}
          <div className="form-main">
            <div className="container-fluid">
              <div className={`${styles["form-content"]}`}> 
                <h3 className={`${styles["form-title"]} ${"text-center"} ${"d-inline"} ${"white"}`}>Trouvez des voyageurs disponibles</h3>
                <div className="row d-flex align-items-center justify-content-between">
                  <div className="col-lg">
                    <div className="form-group pr-4 m-0">
                      <div className="input-box">
                        <Field
                          name="departure_location"
                          label={lang === "en" ? "Departure location" : "Lieu de départ"}
                          component="input"
                          type="text"
                          className={"custom-field"}
                          component={renderCitiesList}
                        />
                      </div>                            
                    </div>
                  </div>
                  <div className="col-lg">
                    <div className="form-group pr-4 m-0">
                      <Field
                        name="destination_location"
                        label={lang === "en" ? "Destination location" : "Lieu d'arrivée"}
                        component="input"
                        type="text"
                        className={"custom-field"}
                        component={renderCitiesList}
                      />                           
                    </div>
                  </div>
                  <div className="col-lg">
                    <div className="form-group pr-4 m-0">
                      <div className="input-box">
                        <Field
                          name="travel_date"
                          placeHolder={lang === "en" ? "Departure date" : "Date de départ"}
                          showTime={false}
                          className={`${styles["date-picker"]}`}
                          component={renderDateTimePickerDown}
                        />
                      </div>   
                    </div>
                  </div>     
                  <div className="col-lg">
                    <div className="form-group m-0 w-100">
                      <a  className={`hover-white nir-btn ${loading?'disabled':''}`} onClick={handleSubmit(this.submitForm)} ><i className="fa fa-search" /> Rechercher</a>
                    </div>
                  </div>
                  <div className="col-lg">
                    <Button variant="contained" color="success" onClick={this.handleResetFields}>
                      Réinitialiser
                    </Button>
                  </div>                      
                </div>
              </div>
            </div>
          </div>
          {/* form main ends */}
          {/* section 2 ends */}
          {/*find travel start */}
          <div className="cta-horizon bg-white pt-4 pb-2">
          </div>
          {/* <div className="cta-horizon bg-white pt-4 pb-2">
          </div> */}
          <Divider/>
          {trips && trips.length === 0 ? <div> <FormattedMessage
              id="search_trips.no_results"
              defaultMessage="No search results. Please try a more general search."
            /></div> : <React.Fragment>
            <div className="dashboard-list-box with-icons">
              <div className="dashboard-title">
                <h4 className="mb-0">Liste de voyageurs disponibles</h4>
                {/* <p className="mb-0">Vous retrouvez ici la liste des voyages ajoutés par d'autres utilisateurs</p> */}
              </div>
              <div className="table-responsive table-desi">
                <table className="basic-table table table-hover">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Nom</th>
                      <th>Date de départ</th>
                      <th>Ville de départ</th>
                      <th>Ville d'arrivée</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                  {trips.map((item, index) => (
                      <TripCard
                      trip_type={item["trip_type"]}
                      comeback_date={item["comeback_date"]}
                      depart_date={item["depart_date"]}
                      departure_location={item["departure_location"]}
                      destination_location={item["destination_location"]}
                      img={item["created_by"]["profile_pic"] === null ? '' : item["created_by"]["profile_pic"]}
                      creator_user_name={item["creator_user_name"]}
                      trip_id={item["pk"]}
                      no_book={false} />
                  ))}


                  </tbody>
                </table>
              </div>
            </div>
            <Header as="h4" textAlign="center">
            <div className="cta-horizon pt-4 pb-2" style={{backgroundColor: '#a10115'}}>
            <div className="container d-md-flex align-items-center justify-content-between">
              <h4 className="mb-2 white">Impossible de trouver le bon voyageur ? Enregistrez votre colis pour être contacté rapidement.</h4>
              <a className="nir-btn-black hover-white" onClick={this.handleOpenSendPackageModal.bind(this)} >Expédier</a>
            </div>
          </div>
          </Header>
        </React.Fragment>
          }
        </Segment>
      </Container>
      
    );
  }
}

const selector = formValueSelector('search_trips');

const mapStateToProps = state => {
  const departure_location = selector(state, 'departure_location');
  const destination_location = selector(state, 'destination_location');
  const travel_date = selector(state, 'travel_date');
  return {
    loading: state.searchTrips.loading,
    error: state.searchTrips.error,
    lang: state.appConfig.lang,
    trips: state.searchTrips.trips,
    next_url: state.searchTrips.next_url,
    count: state.searchTrips.count,
    user_id: state.userInfo.userId,
    authenticated: state.auth.token !== null,
    departure_location: departure_location,
    destination_location: destination_location,
    travel_date: travel_date,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openPackageModal: () => dispatch(openModal()),
    closePackageModal: () => dispatch(closeModal()),
    openLoginModal: () => dispatch(openLoginParentModal()),
    createNotif: (key, default_text, type) => dispatch(createNotif(key, default_text, type)),
    findTrip: (departure_location, destination_location, travel_date, user_id, next_url, count) => dispatch(searchTrips(departure_location, destination_location, travel_date, user_id, next_url, count))
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({ form: "search_trips",destroyOnUnmount:false, enableReinitialize: true })(SearchTripsForm));
