import React, { Component } from "react";

import SideBarContainer from "../AdminParentContainer/sideBar.container";
import TourWrapperContainer from "./TourContent/tourWrapper.container";

import * as INDEX_CONSTANTS from "../_constants/index.constants";
import funcLoadJs from "../_constants/loadJs.constants";

export default class WrapperTableParentContainer extends Component {
   componentWillMount() {
      funcLoadJs(INDEX_CONSTANTS.AdminArrayExternalScript);
   }
   
   render() {
      return (
         <div id="wrapper">
            {/* Sidebar */}
            <SideBarContainer />
            {/* End of Sidebar */}
            {/* Content Wrapper */}
            <TourWrapperContainer {...this.props} />
            {/* End of Content Wrapper */} {/* Scroll to Top Button*/}
            <a className="scroll-to-top rounded ht-loaded" href="#page-top">
               <i className="fas fa-angle-up" />
            </a>
         </div>
      );
   }
}
