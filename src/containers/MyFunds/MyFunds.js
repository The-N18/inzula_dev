import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Select,
  Image,
  Divider,
  Card
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './myfunds.css';
import { backend_url, buildImagesLinkList } from "../../configurations";
import ImageUploader from 'react-images-upload';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getFunds, cashout } from "../../store/actions/myFunds";
import $ from "jquery";
import {FormattedMessage, FormattedDate} from 'react-intl'
import { openBankAccountFormModal } from "../../store/actions/bankAccountFormModal";

class MyFunds extends React.Component {
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
    this.props.getFunds(user_id);
    window.addEventListener('resize', this.handleScreenSize, false);
    this.handleScreenSize();
    }

  cashout = () => {
    const { user_id } = this.props;
    this.props.cashout(user_id, 0);
  }

  openCashoutModal = () => {
    this.props.openBankAccountFormModal();
  }

  render() {
    const { loading, funds } = this.props;
    return (
      <Segment basic className={"profile-tab-section"}>
      <Card>
        <Card.Content textAlign={"center"}>
          <Card.Header>{funds}</Card.Header>
        </Card.Content>
        <Card.Content extra>
            <Button basic color='green' fluid onClick={this.openCashoutModal.bind(this)} disabled={funds === "EUR 0"}>
              <FormattedMessage
                id="my_funds.cashout"
                defaultMessage="Cash out"
              />
            </Button>
        </Card.Content>
      </Card>
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    user_id: state.userInfo.userId,
    funds: state.myFunds.funds,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cashout: (user_id, amount) => dispatch(cashout(user_id, amount)),
    getFunds: (user_id) => dispatch(getFunds(user_id)),
    openBankAccountFormModal: () => dispatch(openBankAccountFormModal()),
  };
};

MyFunds.propTypes = {
  profileType: PropTypes.string,
  selectable: PropTypes.boolean,
  editable: PropTypes.boolean,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyFunds);
