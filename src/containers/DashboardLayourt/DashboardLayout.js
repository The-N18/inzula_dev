import React from 'react';
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {FormattedMessage, FormattedDate} from 'react-intl'
import { backend_url, get_img_url } from "../../configurations";
import DashboardRouter from '../../dashboardRoutes';

function DashboardLayout(props) {
    const {handleSubmit, loading, deleteLoading, username, invalid, date_joined, profile_pic, passport_number, phone_number, email, lang, id_document} = props;
    const {url} = useRouteMatch();
    const location = useLocation();
    const financeDropdown = React.createRef();

    // toggleActiveClass = ()=>{
        
    // }

    console.log("URLLLL",url);

    return (
        <div>
            {/* BreadCrumb Starts */}  
            <section className="breadcrumb-main pb-2" style={{backgroundImage: 'url(/images/bg/bg8.jpg)'}}>
            <div className="dot-overlay" />
            </section>
            {/* BreadCrumb Ends */} 
            {/* Dashboard */}
            <div id="dashboard" className="pt-10 pb-10">
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
                                <p className="detail"><i className="fa fa-phone" />
                                    {phone_number ? ` ${phone_number}` : ''}
                                </p>
                                <div className="header-social mt-2">
                                <ul>
                                    <li><a href="#"><i className="fab fa-facebook-f" /></a></li>
                                    <li><a href="#"><i className="fab fa-google-plus-g" /></a></li>
                                    {/* <li><a href="#"><i class="fab fa-twitter"></i></a></li> */}
                                </ul>
                                </div>
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
                                <Link to={`${url}/add-booking`}><li className={location.pathname=='/dashboard/add-booking'&& "active"} ><a ><i className="sl sl-icon-plus" /> Ajouter colis</a></li></Link>
                                <li className={location.pathname=='/dashboard/my-packages'&& "active"}><a href="dashboard-package-list.html"><i className="sl sl-icon-layers" /> Mes colis</a></li>
                                <li className={location.pathname=='/dashboard/add-trip'&& "active"}><a href="dashboard-add-new-trip.html"><i className="sl sl-icon-plus" /> Ajouter voyage</a></li>
                                <li className={location.pathname=='/dashboard/my-trip'&& "active"}><a href="dashboard-trip-list.html"><i className="sl sl-icon-plane" /> Mes voyages</a></li>
                                <li className={location.pathname=='/dashboard/alerts'&& "active"}><a href="dashboard-reviews.html"><i className="sl sl-icon-star" /> Alertes</a></li>
                                {/* <li><a href="dashboard-history.html"><i class="fa fa-list-ul"></i>Finances</a></li> */}
                                <li  className={location.pathname=='/dashboard/my-transactions'&& "active"}><a><i className="fa fa-list-ul" />Finances</a>
                                    <ul><li><a href="dashboard-add-new.html"><i className="sl sl-icon-plus" /> Mes transactions</a></li></ul>
                                    <ul><li><a href="dashboard-add-new.html"><i className="sl sl-icon-directions" /> Transfert de fonds</a></li></ul>
                                    <ul><li><a href="dashboard-add-new.html"><i className="sl sl-icon-credit-card" /> Mes moyens de paiement</a></li></ul>
                                </li>
                                <li><a href="login.html"><i className="sl sl-icon-power" /> Deconnexion</a></li>
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
      initialValues: state.userInfo.profileData
    };
  };


  export default connect(
        mapStateToProps
    )(DashboardLayout)
