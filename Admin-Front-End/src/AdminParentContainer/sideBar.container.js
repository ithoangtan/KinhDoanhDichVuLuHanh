import React, { Component } from "react";

import { Link } from "react-router-dom";

import { Tooltip } from "antd";

import { LinkUserPage } from "../_constants/index.constants";

import * as INDEX_CONSTANTS from "../_constants/index.constants";
import funcLoadJs from "../_constants/loadJs.constants";

export default class SideBarContainer extends Component {
   constructor(props) {
      super(props);
      this.state = {
         toggled: true,
      };
   }
   componentWillMount() {
      funcLoadJs(INDEX_CONSTANTS.AdminArrayExternalScript);
   }

   toggled = () => {
      this.setState({ toggled: !this.state.toggled });
   };

   render() {
      return (
         <ul
            className={`navbar-nav bg-gradient-primary sidebar  sidebar-menu sidebar-dark accordion  ${
               this.state.toggled ? "toggled" : ""
            }`}
            data-widget="tree"
            id="accordionSidebar"
         >
            {/* Sidebar - Brand */}
            <Tooltip placement="right" title={"Go to user MODE"}>
               <a
                  id="page-top"
                  href={LinkUserPage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sidebar-brand d-flex align-items-center justify-content-center"
               >
                  <div className="sidebar-brand-icon rotate-n-15">
                     <i className="fas fa-laugh-wink" />
                  </div>
                  <div className="sidebar-brand-text mx-3">User MODE</div>
               </a>
            </Tooltip>

            {/* Divider */}
            <hr className="sidebar-divider my-0" />
            {/* Nav Item - Dashboard */}

            <li className="nav-item active">
               <Tooltip placement="right" title={"Go to Report and analytics"}>
                  <Link to="/admin/" className="nav-link">
                     <i className="fas fa-fw fa-tachometer-alt" />
                     <span>Dashboard</span>
                  </Link>
               </Tooltip>
            </li>
            <li className="nav-item">
               <Tooltip placement="right" title={"Config general"}>
                  <Link to="/admin/config" className="nav-link">
                     <i className="fas fa-cogs"></i>
                     <span> General</span>
                  </Link>
               </Tooltip>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider" />
            {/* Heading */}
            <div className="sidebar-heading">Tours Management</div>
            {/* Nav Item - Pages Collapse Menu */}
            <li className="nav-item">
               <Link
                  to="#"
                  className="nav-link collapsed"
                  data-toggle="collapse"
                  data-target="#collapseTwo"
                  aria-expanded="true"
                  aria-controls="collapseTwo"
               >
                  <i className="fas fa-th-large"></i>
                  <span>Tours</span>
               </Link>
               <div
                  id="collapseTwo"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#accordionSidebar"
               >
                  <div className="bg-white py-2 collapse-inner rounded">
                     <h6 className="collapse-header">Tours</h6>
                     <Link to="/admin/tour" className="collapse-item">
                        Tours and Details
                     </Link>
                     <Link
                        to="/admin/tour/tags-and-services"
                        className="collapse-item"
                     >
                        Tags and Services
                     </Link>
                  </div>
               </div>
            </li>
            {/* Nav Item - Utilities Collapse Menu */}
            <li className="nav-item">
               <Link
                  to="#"
                  className="nav-link collapsed"
                  data-toggle="collapse"
                  data-target="#collapseUtilities"
                  aria-expanded="true"
                  aria-controls="collapseUtilities"
               >
                  <i className="fas fa-blog"></i>
                  <span>Blogs</span>
               </Link>
               <div
                  id="collapseUtilities"
                  className="collapse"
                  aria-labelledby="headingUtilities"
                  data-parent="#accordionSidebar"
               >
                  <div className="bg-white py-2 collapse-inner rounded">
                     <Link to="/admin/posts" className="collapse-item">
                        Posts
                     </Link>
                     <Link
                        to="/admin/tour/tags-and-services"
                        className="collapse-item"
                     >
                        Tags And Services
                     </Link>
                     {/* Tag này chỉ chung 1 trang và có radio chọn tag của tour và tag của post - blog */}
                     <Link to="/admin/author-info" className="collapse-item">
                        Author Info
                     </Link>
                  </div>
               </div>
            </li>
            <li className="nav-item">
               <Link to="/admin/order" className="nav-link collapsed">
                  <i className="fas fa-shopping-cart"></i>
                  <span>Orders</span>
               </Link>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider" />
            {/* Heading */}
            <div className="sidebar-heading">Account Management</div>
            {/* Nav Item - Pages Collapse Menu */}
            <li className="nav-item">
               <Link to="/admin/account" className="nav-link collapsed">
                  <i className="fas fa-user-circle"></i>
                  <span>Accounts</span>
               </Link>
            </li>
            {/* Nav Item - Charts */}
            <li className="nav-item">
               <Link to="/admin/notifications" className="nav-link collapsed">
                  <i className="far fa-bell"></i>
                  <span>Notifications</span>
               </Link>
            </li>
            <li className="nav-item">
               <Link to="/admin/mails" className="nav-link collapsed">
                  <i className="far fa-envelope"></i>
                  <span>Mails</span>
               </Link>
            </li>
            {/* Divider */}
            {/* Divider */}
            <hr className="sidebar-divider d-none d-md-block" />
            {/* Sidebar Toggler (Sidebar) */}
            <div className="text-center d-none d-md-inline">
               <button
                  className="rounded-circle border-0"
                  id="sidebarToggle"
                  onClick={this.toggled}
               />
            </div>
         </ul>
      );
   }
}
