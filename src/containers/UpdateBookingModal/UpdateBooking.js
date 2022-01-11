import React from "react";

import { connect } from "react-redux";
// import styles from './sendpackage.css';
import { backend_url } from "../../configurations";

import {
  Image
} from "semantic-ui-react";
import ImageUploader from 'react-images-upload';
import {createNotification} from 'react-redux-notify';
import {Field, reset, reduxForm, formValueSelector} from 'redux-form';
import {renderField, renderDropdownList, renderCitiesList, renderDateTimePickerDown, renderPhoneNumber} from "../../containers/ReduxForm/renderField";
import { validate } from "./validation";
import { updateBooking } from "../../store/actions/addBooking";
import { updateBookingOpenModal, updateBookingCloseModal } from "../../store/actions/updateBookingModal";
import { sizeOptions, sizeOptionsFr, categoryOptions, categoryOptionsFr, weightOptions, weightOptionsFr, valueOptions, valueOptionsFr, calculateMinPrice } from "../../utils/options";
import {FormattedMessage} from 'react-intl'



import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));




function UpdateBooking(props){
  const { lang, handleSubmit,
    invalid, change, product_name, images,
    departure_location, destination_location, proposed_price,
    product_category, product_weight, product_size, product_value,
    recipient_name, recipient_phone_number, product_description, open } = props;

  /************************************************************ */
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [pictures, setPictures] = React.useState([]);
  

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

  
  const onDrop = (picture) => {
      setPictures(picture)
  }

  const getSubmitVal = (values, option) => {
    let val = "";
    if(typeof values[option] === "string") {
      val = values[option];
    } else {
      val = values[option]['value'];
    }
    return val;
  }

  const submitForm = (val) => {
    const depdate = val['delivery_date'];
    // const {pictures} = picture;
    const { userId, userProfileId, createNotification, user_id, next_url, count, pk } = props;
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
    // this.setState({ activeStep: 1});
    setActiveStep(1);
  };

  const getOptTxt = (val, arr) => {
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




  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div className="row">
            <div className="col-lg-3 col-md-3 col-xs-12">
              {images && images.length > 0 ? images.map((item, index) => (
                <Image centered bordered size="tiny" src={item['name']} />
              )) : ''}
              {/* <Image centered bordered circular src= {backend_url() + '/static/images/box.jpg'} /> */}
              <ImageUploader
                  withIcon={true}
                  buttonText={<FormattedMessage
                    id="add_booking.choose_p_images"
                    defaultMessage="Choose product images"
                  />}
                  onChange={onDrop}
                  imgExtension={['.jpg', '.gif', '.png', '.gif']}
                  maxFileSize={5242880}
                  withPreview={true}
              />

            </div>
            <div className="col-lg-9 col-md-9 col-xs-12">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-xs-12">
                  <div className="form-group">
                    <div className="input-box">
                      <label className="form-label">Nom du colis</label>
                      {/* <input type="text" className placeholder /> */}
                      <Field
                      name="product_name"
                      component="input"
                      type="text"
                      component={renderField}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-xs-12">
                  <div className="form-group">
                    <div className="input-box">
                      <label>Date limite de livraison du colis</label>
                      {/* <input type="text" className placeholder /> */}
                      <Field
                      name="delivery_date"
                      showTime={false}
                      component={renderDateTimePickerDown}
                      min={new Date()}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-xs-12">
                  <div className="form-group">
                    <label>Ou se trouve le colis?</label>
                    <div className="input-box">
                      {/* <select className="niceSelect">
                        <option>Australia</option>
                        <option>Sydney</option>
                        <option>Newyork</option>
                        <option>Los Angels</option>
                      </select> */}
                      <Field
                        name="departure_location"
                        label={lang === "en" ? "Departure location" : "Lieu de départ"}
                        type="text"
                        component={renderCitiesList}
                      />
                    </div>                               
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-xs-12">
                  <div className="form-group">
                    <div className="input-box">
                      <label>Lieu de récupération</label>
                      {/* <div className="input-box">
                        <select className="niceSelect">
                          <option>Australia</option>
                          <option>Sydney</option>
                          <option>Newyork</option>
                          <option>Los Angels</option>
                        </select>
                      </div>    */}
                      <Field
                        name="destination_location"
                        label={lang === "en" ? "Select destination location" : "Sélectionnez la destination"}
                        type="text"
                        component={renderCitiesList}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-xs-12">
                  <div className="form-group">
                    <div className="input-box">
                      <label>Catégorie du colis</label>
                      <div className="input-box">
                        {/* <select className="niceSelect">
                          <option>Denrées alimentaires</option>
                          <option>Electronique</option>
                          <option>Vetements</option>
                          <option>Documents</option>
                          <option>Utensils de cuisine</option>
                          <option>Equipements electriques</option>
                          <option>Soins de la peau</option>
                          <option>Bijoux</option>
                          <option>Autres</option>
                        </select> */}
                        <Field
                         name="product_category"
                         component={renderDropdownList}
                         data={lang === "en" ? categoryOptions : categoryOptionsFr}
                         valueField="value"
                         textField="text"
                         onChange={handleMinPriceCatChange}/>
                      </div>   
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-xs-12">
                  <div className="form-group">
                    <div className="input-box">
                      <label>Poids du colis</label>
                      <div className="input-box">
                        {/* <select className="niceSelect">
                          <option>0.1 - 500g</option>
                          <option>500g - 1kg</option>
                          <option>1.1kg - 5kg</option>
                          <option>5.1kg - 10kg</option>
                          <option>10.1kg - 20kg</option>
                          <option>20.1kg - 30kg</option>
                        </select> */}
                        <Field
                         name="product_weight"
                         placeholder='Product weight'
                         component={renderDropdownList}
                         data={lang === "en" ? weightOptions: weightOptionsFr}
                         valueField="value"
                         textField="text"
                         onChange={handleMinPriceWeiChange}/>
                      </div>   
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-xs-12">
                  <div className="form-group">
                    <label>Taille du colis</label>
                    <div className="input-box">
                      {/* <select className="niceSelect">
                        <option>Petit (rentre dans une boite de chaussures)</option>
                        <option>Moyenne (rentre dans une valise de cabine)</option>
                        <option>Large (rentre dans la malle d\'une voiture)</option>
                        <option>Extra Large</option>
                      </select> */}
                      <Field
                      name="product_size"
                      placeholder='Product size'
                      component={renderDropdownList}
                      data={lang === "en" ? sizeOptions: sizeOptionsFr}
                      valueField="value"
                      textField="text"
                      onChange={handleMinPriceSizChange}/>
                    </div>                             
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-xs-12">
                  <div className="form-group">
                    <div className="input-box">
                      <label>Valeur déclarative du colis</label>
                      <div className="input-box">
                        {/* <select className="niceSelect">
                          <option>Valeur basse</option>
                          <option>Valeur moyenne</option>
                          <option>Grande valeur</option>
                          <option>Luxueux</option>
                          <option>Exclusif</option>
                        </select> */}
                        <Field
                        name="product_value"
                        placeholder='Product value'
                        component={renderDropdownList}
                        data={lang === "en" ? valueOptions: valueOptionsFr}
                        valueField="value"
                        textField="text"
                        onChange={handleMinPriceValChange}/>
                      </div> 
                    </div>                             
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-xs-12">
                  <div className="form-group">
                    <div className="input-box">
                      <label>Prénom et Nom du destinataire final</label>
                      {/* <input type="text" className placeholder /> */}
                      <Field
                        name="recipient_name"
                        component="input"
                        type="text"
                        component={renderField}
                      />
                    </div>                             
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-xs-12">
                  <div className="form-group">
                    <div className="input-box">
                      <label>Numéro de téléphone du destinataire final</label>
                      {/* <input type="text" className placeholder /> */}
                      <Field
                        name="recipient_phone_number"
                        type="number"
                        component={renderField}
                      />
                    </div>                             
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-xs-12">
                  <div className="form-group">
                    <div className="input-box">
                      <label>Prix Minimum</label>
                      {/* <input type="text" className placeholder /> */}
                      <Field
                       name="min_price"
                       type="number"
                       component={renderField}
                       disabled={true}
                     />
                    </div>                             
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-xs-12">
                  <div className="form-group">
                    <div className="input-box">
                      <label>Prix Proposé</label>
                      {/* <input type="text" className placeholder /> */}
                      <Field
                        name="proposed_price"
                        type="text"
                        component={renderField}
                      />
                    </div>                             
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="input-box">
                      <label>Description du colis</label>
                      {/* <textarea id="desc" rows={8} className placeholder defaultValue={""} /> */}
                      <Field
                        name="product_description"
                        component="textarea"
                        className={"custom-field"}
                      />
                    </div>
                  </div>
                </div>
                <div className="term-conds mb-3">
                  <div className="pretty p-default p-thick p-pulse">
                    {/* <input type="checkbox" /> */}
                    <Field name="terms_conditions" id="terms_conditions" component="input" type="checkbox"/>
                    <div className="state d-flex align-items-center p-warning-o">
                      <label>J’ai lu et j’accepte  <a href="#">les conditions générales</a></label>
                    </div>
                  </div> 
                </div>
                <div className="term-conds mb-3">
                  <div className="pretty p-default p-thick p-pulse">
                    {/* <input type="checkbox" /> */}
                    <Field name="user_agreement" id="user_agreement" component="input" type="checkbox"/>
                    <div className="state d-flex align-items-center p-warning-o">
                      <label>J’ai lu et je m’engage à respecter <a href="#">les règles de bienveillance du site</a></label>
                    </div>
                  </div>
                </div>
  
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                  disabled={invalid}
                >
                  Suivant
                </Button>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <React.Fragment>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-xs-12">
                <p className={"form-details-display"}><b><FormattedMessage
                  id="add_booking.p_name"
                  defaultMessage="Product name:"
                /></b> {product_name}</p>
                <p className={"form-details-display"}><b><FormattedMessage
                  id="add_booking.p_location"
                  defaultMessage="Product location:"
                /></b> {departure_location ? departure_location['label'] : ''}</p>
                <p className={"form-details-display"}><b><FormattedMessage
                  id="add_booking.p_category"
                  defaultMessage="Product category:"
                /></b> {getOptTxt(product_category, categoryOptions)}</p>
                <p className={"form-details-display"}><b><FormattedMessage
                  id="add_booking.p_size"
                  defaultMessage="Product size:"
                /></b> {getOptTxt(product_size, sizeOptions)}</p>
                <p className={"form-details-display"}><b><FormattedMessage
                  id="add_booking.proposed_price"
                  defaultMessage="Proposed price:"
                /></b> {proposed_price}</p>
                <p className={"form-details-display"}><b><FormattedMessage
                  id="add_booking._rec_name"
                  defaultMessage="Recipient name:"
                /></b> {recipient_name}</p>
                <p className={"form-details-display"}><b><FormattedMessage
                  id="add_booking.rec_phone_number"
                  defaultMessage="Recipient phone number:"
                /></b> {recipient_phone_number}</p>
              </div>
              <div className="col-lg-6 col-md-6 col-xs-12">
                <p className={"form-details-display"} title={product_description}><b><FormattedMessage
                  id="add_booking.p_desc"
                  defaultMessage="Product description:"
                /></b> {product_description}</p>
                <p className={"form-details-display"}><b><FormattedMessage
                  id="add_booking.pickup_address"
                  defaultMessage="Pickup address:"
                /></b> {destination_location ? destination_location['label'] : ''}</p>
                <p className={"form-details-display"}><b><FormattedMessage
                  id="add_booking.weight"
                  defaultMessage="Weight:"
                /></b> {getOptTxt(product_weight, weightOptions)}</p>
                <p className={"form-details-display"}><b><FormattedMessage
                  id="add_booking.p_value"
                  defaultMessage="Product value:"
                /></b> {getOptTxt(product_value, valueOptions)}</p>
                <p className={"form-details-display"}><b><FormattedMessage
                  id="add_booking._rec_name"
                  defaultMessage="Recipient name:"
                /></b> {recipient_name}</p>
              </div>
            </div>
            <br/><br/>
            <Button 
              variant="contained"
              color="secondary"
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.button}
            >
              Précédent
            </Button>
            <a onClick={handleSubmit(submitForm)} className="nir-btn">Ajouter colis</a>
          </React.Fragment>
          
          );
      default:
        return 'Unknown step';
    }
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
                

                <form action="/">
                  <div className={classes.root}>
                    <Stepper activeStep={activeStep}>
                      <Step key="Détails du colis" >
                        <StepLabel>Détails du colis</StepLabel>
                      </Step>
                      <Step key="Confirmez">
                        <StepLabel>Confirmez</StepLabel>
                      </Step>
                    </Stepper>
                    <div>
                        <div>
                          {/* <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography> */}
                          {getStepContent(activeStep)}
                         
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
