import React from 'react';
import { Link, useRouteMatch, useLocation, Redirect } from "react-router-dom";
import {
    Message,
    Segment,
    Tab,
    Radio,
    Grid
  } from "semantic-ui-react";
import { connect } from "react-redux";
import {FormattedMessage, FormattedDate} from 'react-intl'
import { toggleProfileType } from "../../store/actions/userInfo";
import { setActiveIndex } from "../../store/actions/myProfile";
import { backend_url, get_img_url } from "../../configurations";
import DashboardRouter from '../../dashboardRoutes';
import { logout } from "../../store/actions/auth";
import { clearUserInfo } from "../../store/actions/userInfo";
import $ from "jquery";

function DashboardLayout(props) {
    const {token, handleSubmit, loading, deleteLoading, username, invalid, date_joined, profile_pic, passport_number, phone_number, email, lang, id_document, profileType} = props;
    const {url} = useRouteMatch();
    const location = useLocation();
    const financeDropdown = React.createRef();

    // toggleActiveClass = ()=>{
        
    // }

    console.log("URLLLL",url);

    if (token === null || token === "") {
        return <Redirect to="/" />;
      }

    const handleRadioChange = (e, data) => {
        const {profileType, activeIndex} = props;
        if(profileType === "carrier" && activeIndex === 4) {
          props.setActiveIndex(0);
        }
        props.toggleProfileType(profileType === "sender" ? "carrier" : "sender");
      };
    
    const logoutUtil = () => {
        console.log(" IN DASHBOARD LOGOUT")
        logout();
        props.clearUserInfo();
        props.history.push('/');
        window.location.href = '/'
      }

    const toggleFinanceDropdown = () => {
        if(location.pathname=='/dashboard/my-transactions'){
            $('#financeDropdown').addClass('active');
        }else{
            $('#financeDropdown').toggleClass('active');
        }
        
    }

    return (
        <div>
            {/* BreadCrumb Starts */}  
            {/* <section className="breadcrumb-main pb-2" style={{backgroundImage: 'url(/images/bg/bg8.jpg)'}}>
            <div className="dot-overlay" />
            </section> */}
            {/* BreadCrumb Ends */} 
         
            {/* Dashboard */}
            <div id="dashboard" className="pt-14 pb-10">
            <div className="container">
                <div className="dashboard-main">
                <div className="row">
                    <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                    <div className="dashboard-sidebar">
                        <div className="profile-sec">
                        <div className="author-news mb-3">
                            <div className="author-news-content text-center p-3">
                                <div className="author-thumb mt-0">
                                    <img src={profile_pic !== null && profile_pic !== "null" ? get_img_url(profile_pic) : '/images/team/img1.jpg'} alt="author" />
                                </div>
                                <div className="author-content pt-2 p-0">
                                    <h3 className="mb-1 white"><a href="#" className="white">{username}</a></h3>
                                    <p className="detail"><i className="fa fa-user-circle" /> 
                                        {date_joined ? <div style={{display:"inline"}}> <FormattedMessage
                                            id="profile_tab.member_since"
                                            defaultMessage="Member since"
                                        /><FormattedDate
                                        value={date_joined}
                                        year="numeric"
                                        month="short"
                                        day="numeric"
                                        weekday="short"
                                        /></div> : ''}
                                    </p>
                                    {phone_number ? <p className="detail">
                                        <i className="fa fa-phone" />
                                        {` ${phone_number}`}</p> : ''}
                                    <div className="header-social mt-2">
                                    <ul>
                                        <li><a href="#"><i className="fab fa-facebook-f" /></a></li>
                                        <li><a href="#"><i className="fab fa-google-plus-g" /></a></li>
                                        {/* <li><a href="#"><i class="fab fa-twitter"></i></a></li> */}
                                    </ul>
                                    </div>
                                </div>
                                <div><br/>
                                <Message floating compact info>
                                {profileType === "carrier" ? <FormattedMessage
                                id="my_profile.sender"
                                defaultMessage="Expediteur."
                                /> : <FormattedMessage
                                id="my_profile.carrier"
                                defaultMessage="Voyageur."
                            />}
                                    <Radio
                                    toggle
                                    checked={profileType === "sender"}
                                    onChange={handleRadioChange}
                                    />
                                </Message>
                            </div>
                            </div>
                            <div className="dot-overlay" />
                        </div>
                        </div>
                        {/* Responsive Navigation Trigger */}
                        <a href="#" className="dashboard-responsive-nav-trigger"><i className="fa fa-reorder" /> Dashboard Navigation</a>  
                        <div className="dashboard-nav">
                            <div className="dashboard-nav-inner">
                                <ul>
                                    <Link to={`${url}/profile`}><li className={location.pathname=='/dashboard/profile'&& "active"}><a ><i className="sl sl-icon-user" /> Profil</a></li></Link>
                                    <Link to={`${url}/my-bookings`}><li className={location.pathname=='/dashboard/my-bookings'&& "active"}><a ><i className="sl sl-icon-layers" /> {profileType === "sender"?"Mes colis":"Mes voyages"}</a></li></Link>
                                    <Link to={`${url}/alerts`}><li className={location.pathname=='/dashboard/alerts'&& "active"}><a ><i class="sl sl-icon-star"></i>Alertes</a></li></Link>
                                    {/* <li><a href="dashboard-history.html"><i class="fa fa-list-ul"></i>Finances</a></li>  fas fa-exclamation-circle*/}
                                    <li  id="financeDropdown" onClick={toggleFinanceDropdown}><a><i className="fa fa-list-ul" />Finances</a>
                                        <ul><li><a href="/dashboard/my-transactions"><i className="sl sl-icon-plus" /> Mes transactions</a></li></ul>
                                        <ul><li><a href="dashboard-add-new.html"><i className="sl sl-icon-directions" /> Transfert de fonds</a></li></ul>
                                        <ul><li><a href="dashboard-add-new.html"><i className="sl sl-icon-credit-card" /> Mes moyens de paiement</a></li></ul>
                                    </li>
                                    {profileType === "carrier"?<Link to={`${url}/my-reservations`}><li className={location.pathname=='/dashboard/my-reservations'&& "active"}><a ><i className="sl sl-icon-notebook" /> Réservations sur mes voyages</a></li></Link>:""}
                                    <li><a onClick={logoutUtil}><i className="sl sl-icon-power" /> Deconnexion</a></li>


                                    {/* <Link to={`${url}/add-booking`}><li className={location.pathname=='/dashboard/add-booking'&& "active"} ><a ><i className="sl sl-icon-plus" /> Ajouter colis</a></li></Link> */}
                                    {/* {profileType === "sender"?<Link to={`${url}/add-booking`}><li className={location.pathname=='/dashboard/add-booking'&& "active"} ><a ><i className="sl sl-icon-plus" /> Ajouter colis</a></li></Link>:""} */}
                                    {/* {profileType === "carrier"?<li className={location.pathname=='/dashboard/add-trip'&& "active"}><a href="dashboard-add-new-trip.html"><i className="sl sl-icon-plus" /> Ajouter voyage</a></li>:""} */}
                                    {/* {profileType === "carrier"?<Link to={`${url}/my-trips`}><li className={location.pathname=='/dashboard/my-trips'&& "active"}><a ><i className="sl sl-icon-plane" /> Mes voyages</a></li></Link>:""} */}
                                </ul>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">    
                        <DashboardRouter />
                    </div>
                </div>    
                </div>    
                {/* Content / End */}
            </div>
            </div>
            {/* Dashboard / End */}
        </div>
    )
}

    const mapStateToProps = state => {
        return {
        token: state.auth.token,
        loading: state.auth.loading,
        deleteLoading: state.auth.deleteLoading,
        first_name: state.userInfo.first_name,
        last_name: state.userInfo.last_name,
        username: state.userInfo.username,
        passport_number: state.userInfo.passport_number,
        email: state.userInfo.email,
        user_type: state.userInfo.user_type,
        lang: state.appConfig.lang,
        date_joined: state.userInfo.date_joined,
        phone_number: state.userInfo.phone_number,
        profile_pic: state.userInfo.profile_pic,
        id_document: state.userInfo.id_document,
        initialValues: state.userInfo.profileData,
        activeIndex: state.myProfile.activeIndex,
        profileType: state.userInfo.profileType,
        };
    };

  const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
        clearUserInfo: () => dispatch(clearUserInfo()),
        setActiveIndex: (activeIndex) => dispatch(setActiveIndex(activeIndex)),
      toggleProfileType: (profileType) => dispatch(toggleProfileType(profileType)),
    };
  };


  export default connect(
        mapStateToProps,
        mapDispatchToProps
    )(DashboardLayout)
