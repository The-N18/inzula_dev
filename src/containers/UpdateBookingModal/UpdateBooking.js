import React from "react";
import {
  Button,
  Grid,
  Segment,
  Icon,
  Step,
  Image,
  Modal
} from "semantic-ui-react";
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput } from "mdbreact";
import { connect } from "react-redux";
// import styles from './sendpackage.css';
// import { backend_url } from "../../configurations";
import ImageUploader from 'react-images-upload';
import {createNotification} from 'react-redux-notify';
import {Field, reset, reduxForm, formValueSelector} from 'redux-form';
import {renderField, renderDateTimePicker, renderDropdownList, renderCitiesList} from "../../containers/ReduxForm/renderField";
import { validate } from "./validation";
import { updateBooking } from "../../store/actions/addBooking";
import { updateBookingOpenModal, updateBookingCloseModal } from "../../store/actions/updateBookingModal";
import { sizeOptions, sizeOptionsFr, categoryOptions, categoryOptionsFr, weightOptions, weightOptionsFr, valueOptions, valueOptionsFr, calculateMinPrice } from "../../utils/options";
import {FormattedMessage} from 'react-intl'

class UpdateBooking extends React.Component {

  constructor(props) {
    super(props)
    this.onDrop = this.onDrop.bind(this);
  }

  state = {
    activeStep: 1,
    pictures: [],
    isNextValid: true,
    formActivePanel3: 1,
    formActivePanel1Changed: false,

  }



  handleButtonClick = (e) => {
    if(this.state.activeStep === 1) {
      this.setState({ activeStep: 2});
    }
  }

  // componentDidUpdate(prevProps) {
  //   const { userId, change } = this.props;
  //   if (prevProps.images === undefined && this.props.images && this.props.images.length !== 0) {
  //     this.onDrop(this.props.images);
  //   }
  // }

  handleBackButtonClick = (e) => {
    if(this.state.activeStep === 2) {
      this.setState({ activeStep: 1});
    }
  }

  onDrop = (picture) => {
      this.setState({
          pictures: picture,
      });
  }

  getSubmitVal = (values, option) => {
    let val = "";
    if(typeof values[option] === "string") {
      val = values[option];
    } else {
      val = values[option]['value'];
    }
    return val;
  }

  submitForm = (val) => {
    const depdate = val['delivery_date'];
    const {pictures} = this.state;
    const { userId, userProfileId, createNotification, user_id, next_url, count, pk } = this.props;
    const created_by = {"user": userId};
      const departureLocation = val['departure_location'] ? val['departure_location']['pk'] : null;
      const destinationLocation = val['destination_location'] ? val['destination_location']['pk'] : null;
      const dta = {
        "pk": pk,
        "created_by": userProfileId,
        "pictures": pictures,
        "departure_location": departureLocation,
        "description": val['product_description'],
        "name": val['product_name'],
        "product_category": this.getSubmitVal(val, 'product_category'),
        "weight": this.getSubmitVal(val, 'product_weight'),
        "space": this.getSubmitVal(val, 'product_size'),
        "price": this.getSubmitVal(val, 'product_value'),
        "proposed_price": val['proposed_price'],
        "arrival_date": depdate.toISOString(),
        "destination_location": destinationLocation,
        "recipient_name": val['recipient_name'],
        "recipient_phone_number": val['recipient_phone_number'],
        "terms_conditions": val['terms_conditions'],
        "user_agreement": val['user_agreement']};
      this.props.updateBooking(dta);
      this.setState({ activeStep: 1});
  };

  getOptTxt = (val, arr) => {
    let txt = "";
    if(typeof val === "string") {
      for(let i = 0; i < arr.length; i++) {
        if(arr[i]['value'] === val) {
          txt = arr[i]['text'];
        }
      }
    } else {
      txt = val ? val['text'] : "";
    }
    return txt;
  }


/************************************************* */
  swapFormActive = (a) => (param) => (e) => {
    this.setState({
      ['formActivePanel' + a]: param,
      ['formActivePanel' + a + 'Changed']: true
    });
  }


  render() {
    const { lang, handleSubmit,
      invalid, change, product_name, images,
      departure_location, destination_location, proposed_price,
      product_category, product_weight, product_size, product_value,
      recipient_name, recipient_phone_number, product_description, open } = this.props;
    const { activeStep } = this.state;
    // if(token === null) {
    //   console.log("TOKEN");
    //   console.log(token);
    //   return <Redirect to="/" />;
    // }

    const handleMinPriceCatChange = (event, value) => {
      change('min_price', calculateMinPrice(product_weight, product_size, value, product_value));
    }
    const handleMinPriceWeiChange = (event, value) => {
      change('min_price', calculateMinPrice(value, product_size, product_category, product_value));
    }
    const handleMinPriceSizChange = (event, value) => {
      change('min_price', calculateMinPrice(product_weight, value, product_category, product_value));
    }
    const handleMinPriceValChange = (event, value) => {
      change('min_price', calculateMinPrice(product_weight, product_size, product_category, value));
    }

    return (
      <div className="dashboard-content">
        <div className="add-listing">   
          <div className="listing-main">
            <div className="addlist-inner mb-3">
              <div className="addlist-title">
                <h4 className="m-0"><i className="fa fa-cube pr-2" />Ajouter un colis</h4>
              </div>
              <div className="addlist-content bg-white">
                {/* <MDBStepper form>
                  <MDBStep form>
                    <a href="#formstep1" onClick={this.swapFormActive(1)(1)}>
                      <MDBBtn color={ this.state.formActivePanel1===1 ? "indigo" : "default" } circle>
                        1
                      </MDBBtn>
                    </a>
                    <p>MDBStep 1</p>
                  </MDBStep>
                  <MDBStep form>
                    <a href="#formstep2" onClick={this.swapFormActive(1)(2)}>
                      <MDBBtn color={ this.state.formActivePanel1===2 ? "indigo" : "default" } circle>
                        2
                      </MDBBtn>
                    </a>
                    <p>MDBStep 2</p>
                  </MDBStep>
                  <MDBStep form>
                    <a href="#formstep3" onClick={this.swapFormActive(1)(3)}>
                      <MDBBtn color={ this.state.formActivePanel1===3 ? "indigo" : "default" } circle>
                        3
                      </MDBBtn>
                    </a>
                    <p>MDBStep 3</p>
                  </MDBStep>
                </MDBStepper> */}
                <form action="/">
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-xs-12">
                    
                  </div>
                  <div className="col-lg-9 col-md-9 col-xs-12">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-xs-12">
                        <div className="form-group">
                          <div className="input-box">
                            <label className="form-label">Nom du colis</label>
                            <input type="text" className placeholder />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-xs-12">
                        <div className="form-group">
                          <div className="input-box">
                            <label>Date limite de livraison du colis</label>
                            <input type="text" className placeholder />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-xs-12">
                        <div className="form-group">
                          <label>Ou se trouve le colis?</label>
                          <div className="input-box">
                            <select className="niceSelect">
                              <option>Australia</option>
                              <option>Sydney</option>
                              <option>Newyork</option>
                              <option>Los Angels</option>
                            </select>
                          </div>                               
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-xs-12">
                        <div className="form-group">
                          <div className="input-box">
                            <label>Lieu de récupération</label>
                            <div className="input-box">
                              <select className="niceSelect">
                                <option>Australia</option>
                                <option>Sydney</option>
                                <option>Newyork</option>
                                <option>Los Angels</option>
                              </select>
                            </div>   
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-xs-12">
                        <div className="form-group">
                          <div className="input-box">
                            <label>Catégorie du colis</label>
                            <div className="input-box">
                              <select className="niceSelect">
                                <option>Denrées alimentaires</option>
                                <option>Electronique</option>
                                <option>Vetements</option>
                                <option>Documents</option>
                                <option>Utensils de cuisine</option>
                                <option>Equipements electriques</option>
                                <option>Soins de la peau</option>
                                <option>Bijoux</option>
                                <option>Autres</option>
                              </select>
                            </div>   
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-xs-12">
                        <div className="form-group">
                          <div className="input-box">
                            <label>Poids du colis</label>
                            <div className="input-box">
                              <select className="niceSelect">
                                <option>0.1 - 500g</option>
                                <option>500g - 1kg</option>
                                <option>1.1kg - 5kg</option>
                                <option>5.1kg - 10kg</option>
                                <option>10.1kg - 20kg</option>
                                <option>20.1kg - 30kg</option>
                              </select>
                            </div>   
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-xs-12">
                        <div className="form-group">
                          <label>Taille du colis</label>
                          <div className="input-box">
                            <select className="niceSelect">
                              <option>Petit (rentre dans une boite de chaussures)</option>
                              <option>Moyenne (rentre dans une valise de cabine)</option>
                              <option>Large (rentre dans la malle d\'une voiture)</option>
                              <option>Extra Large</option>
                            </select>
                          </div>                             
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-xs-12">
                        <div className="form-group">
                          <div className="input-box">
                            <label>Valeur déclarative du colis</label>
                            <div className="input-box">
                              <select className="niceSelect">
                                <option>Valeur basse</option>
                                <option>Valeur moyenne</option>
                                <option>Grande valeur</option>
                                <option>Luxueux</option>
                                <option>Exclusif</option>
                              </select>
                            </div> 
                          </div>                             
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-xs-12">
                        <div className="form-group">
                          <div className="input-box">
                            <label>Prénom et Nom du destinataire final</label>
                            <input type="text" className placeholder />
                          </div>                             
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-xs-12">
                        <div className="form-group">
                          <div className="input-box">
                            <label>Numéro de téléphone du destinataire final</label>
                            <input type="text" className placeholder />
                          </div>                             
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-xs-12">
                        <div className="form-group">
                          <div className="input-box">
                            <label>Prix Minimum</label>
                            <input type="text" className placeholder />
                          </div>                             
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-xs-12">
                        <div className="form-group">
                          <div className="input-box">
                            <label>Prix Proposé</label>
                            <input type="text" className placeholder />
                          </div>                             
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <div className="input-box">
                            <label>Description du colis</label>
                            <textarea id="desc" rows={8} className placeholder defaultValue={""} />
                          </div>
                        </div>
                      </div>
                      <div className="term-conds mb-3">
                        <div className="pretty p-default p-thick p-pulse">
                          <input type="checkbox" />
                          <div className="state d-flex align-items-center p-warning-o">
                            <label>J’ai lu et j’accepte  <a href="#">les conditions générales</a></label>
                          </div>
                        </div> 
                      </div>
                      <div className="term-conds mb-3">
                        <div className="pretty p-default p-thick p-pulse">
                          <input type="checkbox" />
                          <div className="state d-flex align-items-center p-warning-o">
                            <label>J’ai lu et je m’engage à respecter <a href="#">les règles de bienveillance du site</a></label>
                          </div>
                        </div>
                      </div>
                      <a href="#" className="nir-btn">Ajouter colis</a>
                    </div>
                  </div>
                </div>
                  

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const selector = formValueSelector('update_booking');

const mapStateToProps = state => {
  const product_name = selector(state, 'product_name')
  const delivery_date = selector(state, 'delivery_date')
  const departure_location = selector(state, 'departure_location')
  const destination_location = selector(state, 'destination_location')
  const proposed_price = selector(state, 'proposed_price')
  const product_category = selector(state, 'product_category')
  const product_weight = selector(state, 'product_weight')
  const product_size = selector(state, 'product_size')
  const product_value = selector(state, 'product_value')
  const recipient_name = selector(state, 'recipient_name')
  const recipient_phone_number = selector(state, 'recipient_phone_number')
  const product_description = selector(state, 'product_description')
  const images = selector(state, 'images')
  return {
    loading: state.addBooking.loading,
    error: state.addBooking.error,
    token: state.auth.token,
    lang: state.appConfig.lang,
    userId: state.userInfo.userId,
    userProfileId: state.userInfo.userProfileId,
    username: state.userInfo.username,
    authenticated: state.auth.token !== null,
    product_name: product_name,
    departure_location: departure_location,
    destination_location: destination_location,
    proposed_price: proposed_price,
    product_category: product_category,
    product_weight: product_weight,
    product_size: product_size,
    product_value: product_value,
    recipient_name: recipient_name,
    recipient_phone_number: recipient_phone_number,
    product_description: product_description,
    images: images,
    delivery_date: delivery_date,
    initialValues: state.updateBookingModal.bookingInfo,
    open: state.updateBookingModal.open,
    pk: state.updateBookingModal.pk,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateBookingCloseModal: () => dispatch(updateBookingCloseModal()),
    updateBookingOpenModal: () => dispatch(updateBookingOpenModal()),
    updateBooking: (values) => dispatch(updateBooking(values)),
    createNotification: (config) => {dispatch(createNotification(config))},
  };
};

const afterSubmit = (result, dispatch) => dispatch(reset('update_booking'));

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({ form: "update_booking", enableReinitialize: true, validate })(UpdateBooking));
