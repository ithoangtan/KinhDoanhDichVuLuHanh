import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as tourActions from "../_actions/tour.actions";
import * as scheduleActions from "../_actions/schedule.actions";

import SideBarContainer from "../AdminParentContainer/sideBar.container";
import ScheduleDetailWrapperContainer from "./ScheduleDetail/scheduleDetailWrapper.container";

import * as INDEX_CONSTANTS from "../_constants/index.constants";
import funcLoadJs from "../_constants/loadJs.constants";

class ScheduleDetail extends Component {
   constructor(props) {
      super(props);

      this.state = {
         scheduleByIdTour: {},
         tour: {}
      };
   }

   componentWillMount() {
      if (this.props.match !== null) {
         this.fetch();
      }
   }
   fetch = async () => {
      await funcLoadJs(INDEX_CONSTANTS.AdminArrayExternalScript);
      const { idTour } = this.props.match.params;

      //Load data tour by Id tour
      const { tourAllActions } = this.props;
      const { fetchTourByIdRequest } = tourAllActions;
      await fetchTourByIdRequest(idTour);

      //Load data schedule by id tour
      const { scheduleAllActions } = this.props;
      const { fetchScheduleByIdTourRequest } = scheduleAllActions;
      await fetchScheduleByIdTourRequest(idTour);
   };

   render() {
      const { tour, scheduleByIdTour } = this.props;
      return (
         <div id="wrapper">
            {/* Sidebar */}
            <SideBarContainer {...this.props} />
            {/* End of Sidebar */}
            {/* Content Wrapper */}
            <ScheduleDetailWrapperContainer
               {...this.props}
               tour={tour}
               scheduleByIdTour={scheduleByIdTour}
            />
            {/* End of Content Wrapper */}
            {/* Scroll to Top Button*/}
            <a className="scroll-to-top rounded ht-loaded" href="#page-top">
               <i className="fas fa-angle-up" />
            </a>
         </div>
      );
   }
}

ScheduleDetail.propTypes = {
   classes: PropTypes.object,
   tourAllActions: PropTypes.shape({
      fetchTourByIdRequest: PropTypes.func,
      fetchScheduleByIdTourRequest: PropTypes.func
   }),
   scheduleByIdTour: PropTypes.object,
   tour: PropTypes.object
};

const mapStateToProps = state => {
   return {
      tour: state.tour.tourById,
      scheduleByIdTour: state.schedule.scheduleByIdTour
   };
};
const mapDispatchToProps = dispatch => {
   return {
      tourAllActions: bindActionCreators(tourActions, dispatch),
      scheduleAllActions: bindActionCreators(scheduleActions, dispatch)
      //Bên trái chỉ là đặt tên thôi, bên phải là tourActions ở bên tour.action.js
   };
};
export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDetail);
