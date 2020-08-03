import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as tourImageActions from "../../_actions/image.actions";
import { API_ENDPOINT } from "../../_constants/index.constants";

import { Upload, Icon, Modal, message, Button, Tooltip } from "antd";

import TimelinesContainer from "./Timelines";
import TagsAndServicesContainer from "./TagsAndServies";

function getBase64(file) {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
   });
}

class TableGallery extends Component {
   constructor(props) {
      super(props);
      this.state = {
         previewVisible: false,
         previewImage: "",
         action: `${API_ENDPOINT}/image`,
         fileList: [],
         visibleTimelineModal: false,
         visibleTagsAndServicesModal: false,
      };
   }

   showModalTagsAndServices = () => {
      this.setState({
         visibleTagsAndServicesModal: true,
      });
   };

   handleOkTagsAndServices = (e) => {
      this.setState({
         visibleTagsAndServicesModal: false,
      });
   };

   handleCancelTagsAndServices = (e) => {
      this.setState({
         visibleTagsAndServicesModal: false,
      });
   };

   showModalTimeline = () => {
      this.setState({
         visibleTimelineModal: true,
      });
   };

   handleOkTimeline = (e) => {
      this.setState({
         visibleTimelineModal: false,
      });
   };

   handleCancelTimeline = (e) => {
      this.setState({
         visibleTimelineModal: false,
      });
   };

   componentWillMount() {
      const { listImage, record } = this.props;
      const listImageFilterIdTour = listImage
         .filter((image) => image.idTour === record.idTour)
         .map((image) => ({
            ...image,
            //APIImage is http://localhost:8000
            //image.url is /img/<name file image>.xxx
            url: API_ENDPOINT + image.url,
            uid: image.idImage,
         }));
      this.setState({ fileList: listImageFilterIdTour });
   }

   handleCancel = () => this.setState({ previewVisible: false });

   beforeUpload = (file) => {
      const isJpgOrPng =
         file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
         message.error("You can only upload JPG/PNG file!");
      }
      return isJpgOrPng;
   };

   handlePreview = async (file) => {
      if (!file.url && !file.preview) {
         file.preview = await getBase64(file.originFileObj);
      }
      this.setState({
         previewImage: file.url || file.preview,
         previewVisible: true,
      });
   };

   handleChange = ({ fileList }) => this.setState({ fileList });

   actionUpload = (file) => {
      const { record } = this.props;
      const { action } = this.state;
      /**
       * If you return, action will call again
       * */
      const actionUpload = `${action}?idTour=${record.idTour}`;

      const newListImage = [...this.state.fileList];
      this.setState({
         fileList: newListImage,
      });
      const key = "updatable";
      return (
         message.loading({
            content: `${file.name} is uploading.....`,
            key,
            duration: 1,
         }),
         actionUpload
      );
   };

   onRemove = async (file) => {
      const { tourImageAllActions } = this.props;
      const { fetchDeleteTourImageRequest } = tourImageAllActions;
      fetchDeleteTourImageRequest(file);
      message.warn(`${file.idImage}, ${file.name} deleted!`);
   };

   render() {
      const { record } = this.props;

      const { previewVisible, previewImage, fileList } = this.state;

      const uploadButton = (
         <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
         </div>
      );

      return (
         <>
            <Button
               type="default"
               size="small"
               className="mb-1 mr-2"
               onClick={this.showModalTimeline}
            >
               Time lines
            </Button>
            <Modal
               style={{ top: 70 }}
               width="90%"
               title="Chỉnh sửa mốc thời gian hiển thị"
               visible={this.state.visibleTimelineModal}
               onCancel={this.handleCancelTimeline}
               footer={null}
            >
               <div className="ht-timeline-container-main container col-md-12">
                  <TimelinesContainer
                     idTour={record.idTour}
                     titleTour={record.titleTour}
                     onCancel={this.handleCancelTimeline}
                  />
               </div>
            </Modal>
            <Button
               type="default"
               size="small"
               className="mb-1 mr-2"
               onClick={this.showModalTagsAndServices}
            >
               Tags and Services
            </Button>
            <Modal
               style={{ top: 70 }}
               width="90%"
               title="Chỉnh sửa các Tag và Dịch vụ cung cấp trong Tour"
               visible={this.state.visibleTagsAndServicesModal}
               // onOk={this.handleOkTagsAndServices}
               onCancel={this.handleCancelTagsAndServices}
               footer={null}
            >
               <div className="ht-timeline-container-main container col-md-12">
                  <TagsAndServicesContainer
                     idTour={record.idTour}
                     titleTour={record.titleTour}
                     checkTags={record.tags}
                     checkServices={record.services}
                  />
               </div>
            </Modal>

            <Link
               type="primary"
               to={{
                  pathname: `/admin/schedule-detail/${record.idTour}`,
                  state: {
                     record: true,
                  },
               }}
               // target={"_blank"}
            >
               <Tooltip
                  placement="bottom"
                  title="Sửa lịch trình (trong tab mới)"
               >
                  <Button type="default" size="small" className="mb-1 mr-2">
                     Go To Schedule
                  </Button>
               </Tooltip>
            </Link>
            {/* </Link> */}
            <Link
               type="primary"
               to={{
                  pathname: `/admin/note/${record.idTour}`,
                  state: {
                     record: true,
                  },
               }}
               // target={"_blank"}
            >
               <Tooltip placement="bottom" title="Sửa lưu ý (trong tab mới)">
                  <Button type="default" size="small" className="mb-1 mr-2">
                     Note
                  </Button>
               </Tooltip>
            </Link>
            <Link
               type="primary"
               to={{
                  pathname: `/admin/policy/${record.idTour}`,
                  state: {
                     record: true,
                  },
               }}
               // target={"_blank"}
            >
               <Tooltip
                  placement="bottom"
                  title="Sửa chính sách và điều khoản (trong tab mới)"
               >
                  <Button type="default" size="small" className="mb-1 mr-2">
                     Policy
                  </Button>
               </Tooltip>
            </Link>
            <Link
               type="primary"
               to={{
                  pathname: `/admin/detail-price/${record.idTour}`,
                  state: {
                     record: true,
                  },
               }}
               // target={"_blank"}
            >
               <Tooltip
                  placement="bottom"
                  title="Sửa chi tiết giá tour (trong tab mới)"
               >
                  <Button type="default" size="small" className="mb-1 mr-2">
                     Detail Price
                  </Button>
               </Tooltip>
            </Link>

            <Link
               type="primary"
               to={{
                  pathname: `/admin/contact/${record.idTour}`,
                  state: {
                     record: true,
                  },
               }}
               // target={"_blank"}
            >
               <Tooltip placement="bottom" title="Sửa liên hệ (trong tab mới)">
                  <Button type="default" size="small" className="mb-1 mr-2">
                     Contact
                  </Button>
               </Tooltip>
            </Link>
            <div className="clearfix">
               <Upload
                  name={"imgUploader"} //This is important similar backend name field
                  multiple={false}
                  action={this.actionUpload}
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                  beforeUpload={this.beforeUpload}
                  onRemove={this.onRemove}
               >
                  {fileList.length >= 8 ? null : uploadButton}
               </Upload>
               <Modal
                  visible={previewVisible}
                  footer={null}
                  onCancel={this.handleCancel}
               >
                  <img
                     alt="example"
                     style={{ width: "100%" }}
                     src={previewImage}
                  />
               </Modal>
            </div>
         </>
      );
   }
}

TableGallery.propTypes = {
   tourImageAllActions: PropTypes.shape({
      fetchDeleteTourImageRequest: PropTypes.func,
   }),
   listImageTour: PropTypes.array,
};

const mapStateToProps = (state) => {
   return {
      listImageTour: state.image.listImageTour,
   };
};
const mapDispatchToProps = (dispatch) => {
   return {
      tourImageAllActions: bindActionCreators(tourImageActions, dispatch),
      //Bên trái chỉ là đặt tên thôi, bên phải là tourActions ở bên tour.action.js
   };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableGallery);
