import React from "react";

import moment from "moment";

import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as tourActions from "../../_actions/tour.actions";

import Highlighter from "react-highlight-words";
import reqwest from "reqwest";
import { Resizable } from "react-resizable";

import { API_ENDPOINT } from "../../_constants/index.constants";

import {
   Table,
   Input,
   InputNumber,
   Popconfirm,
   Form,
   Button,
   Icon,
   Modal,
   DatePicker,
   Select,
   Tooltip,
} from "antd";

import NumberFormat from "react-number-format";

import TableGallery from "./tableGallery";
import TableNewRow from "./tableNewTour";
import Cookies from "js-cookie";
import TourPreview from "./tourPreview";
import TextArea from "antd/lib/input/TextArea";

const { Option } = Select;

let idTourNew = 0;

function getCookie(name) {
   const token = Cookies.get(name);
   return token;
}

const EditableContext = React.createContext();

const ResizeableTitle = (props) => {
   const { onResize, width, ...restProps } = props;

   if (!width) {
      return <th {...restProps} />;
   }

   return (
      <Resizable
         width={width}
         height={0}
         onResize={onResize}
         draggableOpts={{ enableUserSelectHack: false }}
      >
         <th {...restProps} />
      </Resizable>
   );
};

class EditableCell extends React.Component {
   getInput = () => {
      if (this.props.inputType === "disabled") return <Input disabled />;
      else if (this.props.inputType === "reuseSelect")
         return (
            <Select
               showSearch
               style={{ width: "100%" }}
               optionFilterProp="children"
               filterOption={(input, option) =>
                  option.props.children
                     .toLowerCase()
                     .indexOf(input.toLowerCase()) >= 0
               }
            >
               <Option value={0}>0 ngày</Option>
               <Option value={1}>1 ngày</Option>
               <Option value={2}>2 ngày</Option>
               <Option value={3}>3 ngày</Option>
               <Option value={4}>4 ngày</Option>
               <Option value={5}>5 ngày</Option>
               <Option value={6}>6 ngày</Option>
               <Option value={7}>1 tuần</Option>
               <Option value={14}>2 tuần</Option>
               <Option value={21}>3 tuần</Option>
               <Option value={30}>1 tháng</Option>
            </Select>
         );
      else if (this.props.inputType === "priceNumber")
         return <InputNumber min={0} step={10000} />;
      else if (this.props.inputType === "timeSelect")
         return (
            <Select
               showSearch
               style={{ width: "100%" }}
               optionFilterProp="children"
               filterOption={(input, option) =>
                  option.props.children
                     .toLowerCase()
                     .indexOf(input.toLowerCase()) >= 0
               }
            >
               <Option value="1N 0Đ">1N 0Đ</Option>
               <Option value="2N 1Đ">2N 1Đ</Option>
               <Option value="3N 2Đ">3N 2Đ</Option>
               <Option value="4N 3Đ">4N 3Đ</Option>
               <Option value="5N 4Đ">5N 4Đ</Option>
               <Option value="6N 5Đ">6N 5Đ</Option>
               <Option value="7N 6Đ">7N 6Đ</Option>
               <Option value="8N 7Đ">8N 7Đ</Option>
               <Option value="9N 8Đ">9N 8Đ</Option>
               <Option value="10N 9Đ">10N 9Đ</Option>
            </Select>
         );
      else if (this.props.inputType === "datetime")
         return <DatePicker showTime />;
      else if (this.props.inputType === "describe") return <TextArea row={1} />;
      else if (this.props.inputType === "saleNumber")
         return <InputNumber min={0} max={100} />;
      else if (this.props.inputType === "type")
         return (
            <Select
               showSearch
               style={{ width: "100%" }}
               optionFilterProp="children"
               filterOption={(input, option) =>
                  option.props.children
                     .toLowerCase()
                     .indexOf(input.toLowerCase()) >= 0
               }
            >
               <Option value={"World"} disabled>
                  Thế Giới:
               </Option>
               <Option value={"Asian"}>Châu Á</Option>
               <Option value={"Euro"}>Châu Âu</Option>
               <Option value={"America"}>Châu Mỹ</Option>
               <Option value={"VietNam"} disabled>
                  Việt Nam:
               </Option>
               <Option value={"NorthernVietnam"}>Bắc Bộ</Option>
               <Option value={"NorthCentral"}>Bắc Trung Bộ</Option>
               <Option value={"SouthCentralCoast"}>
                  Duyên Hải Nam Trung Bộ
               </Option>
               <Option value={"CentralHighlands"}>Tây Nguyên</Option>
               <Option value={"Southeast"}>Đông Nam Bộ</Option>
               <Option value={"MekongRiverDelta"}>
                  Đồng Bằng Sông Cửu Long
               </Option>
            </Select>
         );
      else return <Input />;
   };

   initialValueEditForm = (record, index) => {
      if (index === "departureDay") return moment(record[index]);
      else return record[index];
   };

   renderCell = ({ getFieldDecorator }) => {
      const {
         editing,
         dataIndex,
         title,
         inputType,
         record,
         index,
         children,
         ...restProps
      } = this.props;
      return (
         <td {...restProps}>
            {editing ? (
               <Form.Item style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                     rules: [
                        {
                           required: true,
                           message: `Pls input ${title}!`,
                        },
                     ],
                     initialValue: this.initialValueEditForm(record, dataIndex),
                  })(this.getInput())}
               </Form.Item>
            ) : (
               children
            )}
         </td>
      );
   };

   render() {
      return (
         <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
      );
   }
}

const pagination = { position: "both" };
const scroll = { x: 1840 + 150, y: 400 };
const showHeader = true;
const title = () => "Tạm thời không biết phải ghi gì";
const footer = () => "Dùng tổ hợp Shift + con lăn chuột để cuộn ngang";

class EditableTable extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         rowsDescribe: 1,
         hasData: true,
         data: null,
         count: this.props.listTour.length,
         bordered: true,
         loading: false,
         size: "default",
         ellipsis: false,

         // title,
         showHeader,
         footer,
         editingidTour: "",

         // rowSelection: {},
         scroll: scroll,
         tableLayout: "auto",

         //sort and filter
         filteredInfo: null,
         sortedInfo: null,
         searchText: "",
         pagination,

         //add show form
         showAdd: false,
         visiblePreview: false,
      };
   }

   /** Editting */
   isEditing = (record) => record.idTour === this.state.editingidTour;

   cancel = () => {
      this.setState({ editingidTour: "" });
   };

   save(form, idTour) {
      const { tourAllActions } = this.props;
      const { fetchPatchTourRequest } = tourAllActions;

      form.validateFields((error, row) => {
         if (error) {
            return;
         }
         const newData = [...this.state.data];
         const index = newData.findIndex((item) => idTour === item.idTour);
         if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
               ...item,
               ...row,
            });
            //Gọi API update dưới CSDL
            fetchPatchTourRequest(row);

            //Kết thúc gọi API update dươi CSDL
            this.setState({ data: newData, editingidTour: "" });
         } else {
            newData.push(row);
            //Gọi API update dưới CSDL
            fetchPatchTourRequest(row);
            //Kết thúc gọi API update dươi CSDL
            this.setState({ data: newData, editingidTour: "" });
         }
      });
   }

   edit(idTour) {
      this.setState({ editingidTour: idTour });
   }

   handleDelete = (record) => {
      const data = [...this.state.data];
      //Gọi API xóa dưới CSDL
      const { tourAllActions } = this.props;
      const { fetchDeleteTourRequest } = tourAllActions;
      fetchDeleteTourRequest(record);
      //Kết thúc gọi API xóa dươi CSDL
      this.setState({
         data: data.filter((item) => item.idTour !== record.idTour),
      });
   };

   handleShowAdd = () => {
      this.setState({ showAdd: true });
   };

   handleEditTour = (newTour) => {
      const { count, data } = this.state;
      if (idTourNew === 0) idTourNew = data[data.length - 1].idPost;
      idTourNew++;
      const newData = {
         idTour: idTourNew,
         titleTour: newTour.titleTour,
         price: newTour.price,
         sale: newTour.sale,
         dateAdded: new Date().toJSON().slice(0, 10).replace(/-/g, "-"),
         departureDay: newTour.departureDay,
         reuse: newTour.reuse,
         describe: newTour.describe,
         address: newTour.address,
         vocationTime: newTour.vocationTime,
         type: newTour.type,
         idAccount: newTour.idAccount,
      };
      //Gọi API create dưới CSDL
      const { tourAllActions } = this.props;
      const { fetchPostTourRequest } = tourAllActions;
      fetchPostTourRequest(newData);
      //Kết thúc gọi API create dươi CSDL
      this.setState({
         data: [newData, ...data],
         count: count + 1,
         pagination: { total: data.length },
      });
   };

   handleAddNew = (newTour) => {
      const { count, data } = this.state;
      const newData = {
         idTour:
            newTour.idTour | (data.length !== 0)
               ? data[data.length - 1].idTour + 1
               : 0,
         titleTour: newTour.titleTour,
         price: newTour.price,
         sale: newTour.sale,
         dateAdded: new Date().toJSON().slice(0, 10).replace(/-/g, "-"),
         departureDay: newTour.departureDay,
         reuse: newTour.reuse,
         tags: JSON.stringify(newTour.checkedListTags),
         services: JSON.stringify(newTour.checkedListServices),
         describe: newTour.describe,
         address: newTour.address,
         vocationTime: newTour.vocationTime,
         type: newTour.type,
         idAccount: newTour.idAccount,
      };
      //Gọi API create dưới CSDL
      const { tourAllActions } = this.props;
      const { fetchPostTourRequest } = tourAllActions;
      fetchPostTourRequest(newData);
      //Kết thúc gọi API create dươi CSDL
      this.setState({
         data: [newData, ...data],
         count: count + 1,
         pagination: { total: data.length },
      });
   };

   handleSaveOnChange = (row) => {
      const newData = [...this.state.data];
      const index = newData.findIndex((item) => row.idTour === item.idTour);
      const item = newData[index];
      newData.splice(index, 1, {
         ...item,
         ...row,
      });
      this.setState({ data: newData });
   };

   /**Preload */
   componentWillMount() {
      const { tourAllActions } = this.props;
      const { fetchListTourImageRequest } = tourAllActions;
      fetchListTourImageRequest();
      this.fetch();
   }

   handleTableChange = (pagination, filters, sorter) => {
      const pager = { ...this.state.pagination };
      pager.current = pagination.current;
      this.setState({
         pagination: pager,
      });
      this.fetch({
         tours: pagination.pageSize,
         page: pagination.current,
         sortField: sorter.field,
         sortOrder: sorter.order,
         ...filters,
      });
   };

   fetch = async (params = {}) => {
      this.setState({ loading: true });
      reqwest({
         url: `${API_ENDPOINT}/tours`,
         method: "GET",
         headers: { Authentication: getCookie("token") },
         data: {
            ...params,
         },
         type: "json",
      }).then((data) => {
         const pagination = { ...this.state.pagination };
         // Read total count from server
         pagination.total = data.length;

         // map data

         this.setState({
            loading: false,
            data: data,
            pagination,
         });
      });
   };
   //    EndPreload

   /** Search */
   getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({
         setSelectedKeys,
         selectedKeys,
         confirm,
         clearFilters,
      }) => (
         <div style={{ padding: 8 }}>
            <Input
               ref={(node) => {
                  this.searchInput = node;
               }}
               placeholder={`Search ${dataIndex}`}
               value={selectedKeys[0]}
               onChange={(e) =>
                  setSelectedKeys(e.target.value ? [e.target.value] : [])
               }
               onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
               style={{ width: 188, marginBottom: 8, display: "block" }}
            />
            <Button
               type="primary"
               onClick={() => this.handleSearch(selectedKeys, confirm)}
               icon="search"
               size="small"
               style={{ width: 90, marginRight: 8 }}
            >
               Search
            </Button>
            <Button
               onClick={() => this.handleReset(clearFilters)}
               size="small"
               style={{ width: 90 }}
            >
               Reset
            </Button>
         </div>
      ),
      filterIcon: (filtered) => (
         <Icon
            type="search"
            style={{ color: filtered ? "#1890ff" : undefined }}
         />
      ),
      onFilter: (value, record) =>
         record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
         if (visible) {
            setTimeout(() => this.searchInput.select());
         }
      },
      render: (text) => (
         <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={
               text === null || text === undefined ? " " : text.toString()
            }
         />
      ),
   });

   handleSearch = (selectedKeys, confirm) => {
      confirm();
      this.setState({
         searchText: selectedKeys[0],
         pagination: { total: this.state.data.length },
      });
   };

   handleReset = (clearFilters) => {
      clearFilters();
      this.setState({
         searchText: "",
         pagination: { total: this.state.data.length },
      });
   };
   //EndSearch

   /**More function */
   handleToggle = (prop) => (enable) => {
      this.setState({ [prop]: enable });
   };

   handleSizeChange = (e) => {
      this.setState({ size: e.target.value });
   };

   handleTableLayoutChange = (e) => {
      this.setState({ tableLayout: e.target.value });
   };

   handleTitleChange = (enable) => {
      this.setState({ title: enable ? title : undefined });
   };

   handleRowSelectionChange = (enable) => {
      this.setState({ rowSelection: enable ? {} : undefined });
   };

   handleScollChange = (enable) => {
      this.setState({ scroll: enable ? scroll : undefined });
   };

   handleDataChange = (hasData) => {
      this.setState({ hasData });
   };

   handleChange = (pagination, filters, sorter, extra) => {
      this.setState({
         filteredInfo: filters,
         sortedInfo: sorter,
      });
   };

   clearFilters = () => {
      this.setState({ filteredInfo: null });
   };

   clearAll = () => {
      this.setState({
         filteredInfo: null,
         sortedInfo: null,
      });
   };

   /** Resize */
   handleResize = (index) => (e, { size }) => {
      const nextColumns = [...this.columns];
      nextColumns[index] = {
         ...nextColumns[index],
         width: size.width,
      };
      return { columns: nextColumns };
   };

   /** Add */
   handleShowAdd = () => {
      this.setState({ showAdd: !this.state.showAdd });
   };
   onCancle = () => {
      this.setState({ showAdd: false });
   };

   /** Expanded Row Render */
   expandedRowRender = (record) => {
      const { listImageTour } = this.props;
      return (
         <TableGallery
            record={record}
            listImage={listImageTour}
            {...this.props}
         />
      );
   };

   /** Show Preivew */
   showModalPreview(record) {
      const { listImageTour } = this.props;
      const listImageFilterIdTour = listImageTour.filter(
         (image) => image.idTour === record.idTour
      );
      Modal.info({
         width: 1000,
         title: "This is a item tour at category tours",
         wrapClassName: "",
         content: (
            <TourPreview tour={record} listImageTour={listImageFilterIdTour} />
         ),
      });
   }

   handleCancelPreview = (e) => {
      this.setState({
         visiblePreview: false,
      });
   };

   render() {
      function chooseType(type) {
         if (type === "idTour" || type === "idAccount" || type === "dateAdded")
            return "disabled";
         else if (type === "reuse") return "reuseSelect";
         else if (type === "price") return "priceNumber";
         else if (type === "vocationTime") return "timeSelect";
         else if (type === "departureDay") return "datetime";
         else if (type === "describe") return "textarea";
         else if (type === "sale") return "saleNumber";
         else if (type === "type") return "type";
      }

      const { state } = this;
      const { data } = this.state;
      const components = {
         body: {
            cell: EditableCell,
         },
         header: {
            cell: ResizeableTitle,
         },
      };

      let { sortedInfo } = this.state;
      // let { sortedInfo, filteredInfo } = this.state;
      sortedInfo = sortedInfo || {};
      // filteredInfo = filteredInfo || {};

      const widthClient = window.outerWidth;

      this.columns = [
         {
            title: "Title",
            dataIndex: "titleTour",
            key: "titleTour",
            width: 200,
            ...this.getColumnSearchProps("titleTour"),
            sorter: (a, b) => a.titleTour.length - b.titleTour.length,
            sortOrder: sortedInfo.columnKey === "titleTour" && sortedInfo.order,
            ellipsis: true,
            editable: true,
         },
         {
            title: "ID",
            dataIndex: "idTour",
            key: "idTour",
            width: 50,
            ellipsis: true,
            editable: true,
         },
         {
            title: "Reuse",
            dataIndex: "reuse",
            key: "reuse",
            width: 100,
            // filteredValue: filteredInfo.reuse || null,
            // filterMultiple: false,
            // onFilter: (value, record) => record.reuse.indexOf(value) === 0,
            ...this.getColumnSearchProps("reuse"),
            sorter: (a, b) => a.reuse.length - b.reuse.length,
            sortOrder: sortedInfo.columnKey === "reuse" && sortedInfo.order,
            editable: true,
            ellipsis: true,
         },
         {
            title: "Type",
            dataIndex: "type",
            key: "type",
            width: 150,
            ...this.getColumnSearchProps("type"),
            sorter: (a, b) => a.type.length - b.type.length,
            sortOrder: sortedInfo.columnKey === "type" && sortedInfo.order,
            editable: true,
            ellipsis: true,
            render: (text) => {
               if (text === "Asian") return "Châu Á";
               if (text === "Euro") return "Châu Âu";
               if (text === "America") return "Châu Mỹ";
               if (text === "NorthernVietnam") return "Bắc Bộ";
               if (text === "NorthCentral") return "Bắc Trung Bộ";
               if (text === "SouthCentralCoast")
                  return "Duyên Hải Nam Trung Bộ";

               if (text === "CentralHighlands") return "Tây Nguyên";
               if (text === "Southeast") return "Đông Nam Bộ";
               if (text === "MekongRiverDelta")
                  return "Đồng Bằng Sông Cửu Long";
            },
         },
         {
            title: "Price(vnđ)",
            dataIndex: "price",
            key: "price",
            width: 130,
            ...this.getColumnSearchProps("price"),
            sorter: (a, b) => a.price - b.price,
            sortOrder: sortedInfo.columnKey === "price" && sortedInfo.order,
            ellipsis: true,
            editable: true,
            render: (text) => {
               return (
                  <NumberFormat
                     value={text}
                     displayType={"text"}
                     thousandSeparator={true}
                     suffix={""}
                     prefix={""}
                  />
               );
            },
         },
         {
            title: "Address",
            dataIndex: "address",
            key: "address",
            width: 200,
            ...this.getColumnSearchProps("address"),
            sorter: (a, b) => a.address.length - b.address.length,
            sortOrder: sortedInfo.columnKey === "address" && sortedInfo.order,
            ellipsis: true,
            editable: true,
         },

         {
            title: "Time",
            dataIndex: "vocationTime",
            key: "vocationTime",
            width: 90,
            ...this.getColumnSearchProps("vocationTime"),
            sorter: (a, b) => a.vocationTime - b.vocationTime,
            sortOrder:
               sortedInfo.columnKey === "vocationTime" && sortedInfo.order,
            ellipsis: true,
            editable: true,
         },
         {
            title: "Departure",
            dataIndex: "departureDay",
            key: "departureDay",
            width: 150,
            ...this.getColumnSearchProps("departureDay"),
            sorter: (a, b) => a.departureDay.length - b.departureDay.length,
            sortOrder:
               sortedInfo.columnKey === "departureDay" && sortedInfo.order,
            ellipsis: true,
            editable: true,
            render: (text) => {
               return moment(text).format("hh:mm A DD/MM/YYYY");
            },
         },

         {
            title: "Describe",
            dataIndex: "describe",
            key: "describe",
            width: 400,
            ...this.getColumnSearchProps("describe"),
            sorter: (a, b) => a.describe.length - b.describe.length,
            sortOrder: sortedInfo.columnKey === "describe" && sortedInfo.order,
            ellipsis: true,
            editable: true,
         },
         {
            title: "Sale(%)",
            dataIndex: "sale",
            key: "sale",
            width: 110,
            filters: [
               { text: "10%", value: 9 },
               { text: "20%", value: 43 },
            ],
            // filteredValue: filteredInfo.sale || null,
            // filterMultiple: false,
            // onFilter: (value, record) => record.sale.indexOf(value) === 0,
            ...this.getColumnSearchProps("sale"),
            sorter: (a, b) => a.sale.length - b.sale.length,
            sortOrder: sortedInfo.columnKey === "sale" && sortedInfo.order,
            editable: true,
            ellipsis: true,
         },
         {
            title: "Added",
            dataIndex: "dateAdded",
            key: "dateAdded",
            width: 100,

            ...this.getColumnSearchProps("dateAdded"),
            sorter: (a, b) => a.dateAdded.length - b.dateAdded.length,
            sortOrder: sortedInfo.columnKey === "dateAdded" && sortedInfo.order,
            ellipsis: true,
            editable: true,
            render: (text) => {
               return moment(text).format("DD/MM/YYYY");
            },
         },
         {
            title: "IDAcc",
            dataIndex: "idAccount",
            key: "idAccount",
            width: 60,
            // fixed: "left",
            ellipsis: true,
            editable: true,
         },
         {
            title: "Edit",
            dataIndex: "edit",
            width: 125,
            key: "edit",
            fixed: widthClient > 768 ? "right" : "",
            render: (text, record) => {
               const { editingidTour } = this.state;
               const editable = this.isEditing(record);
               return editable ? (
                  <span>
                     <EditableContext.Consumer>
                        {(form) => (
                           <Button
                              size="small"
                              type="primary"
                              onClick={() => this.save(form, record.idTour)}
                              style={{ marginRight: 8 }}
                           >
                              Save
                           </Button>
                        )}
                     </EditableContext.Consumer>
                     <Popconfirm
                        title="Sure to cancel?"
                        onConfirm={() => this.cancel(record.idTour)}
                     >
                        <Button type="dashed" size="small">
                           Cancel
                        </Button>
                     </Popconfirm>
                  </span>
               ) : (
                  <>
                     <Button
                        type="default"
                        size="small"
                        disabled={editingidTour !== ""}
                        onClick={() => this.edit(record.idTour)}
                     >
                        Edit
                     </Button>
                     <Tooltip title="Preview">
                        <Button
                           size="small"
                           type="primary"
                           onClick={() => this.showModalPreview(record)}
                           style={{ marginLeft: 6 }}
                        >
                           <i className="fas fa-search"></i>
                        </Button>
                     </Tooltip>
                     <Tooltip title="Duplicate (Clone)">
                        <Button
                           size="small"
                           type="default"
                           onClick={() => this.handleEditTour(record)}
                           style={{ marginLeft: 6 }}
                        >
                           <i className="far fa-clone"></i>
                        </Button>
                     </Tooltip>
                  </>
               );
            },
         },
         {
            title: "Delete",
            dataIndex: "delete",
            width: 70, //110
            key: "delete",
            fixed: widthClient > 768 ? "right" : "",
            render: (text, record) =>
               this.state.data.length >= 1 ? (
                  <Popconfirm
                     title="Sure to delete?"
                     onConfirm={() => this.handleDelete(record)}
                  >
                     <Button type="danger" size="small">
                        Delete
                     </Button>
                  </Popconfirm>
               ) : null,
         },
      ];

      const columns = this.columns.map((col) => {
         if (!col.editable) {
            return col;
         }
         return {
            ...col,
            onCell: (record) => ({
               record,
               inputType: chooseType(col.dataIndex),
               dataIndex: col.dataIndex,
               title: col.title,
               editing: this.isEditing(record),
               onChange: this.handleSaveOnChange,
            }),
         };
      });

      //Show ADD
      const { showAdd } = this.state;

      return (
         <div className="container-fluid card">
            {showAdd ? (
               <TableNewRow
                  onCancle={this.onCancle}
                  handleAddNew={this.handleAddNew}
               />
            ) : (
               <div className="row">
                  <Button
                     onClick={this.handleShowAdd}
                     type="primary"
                     style={{ margin: "12px 12px 0px" }}
                  >
                     Add New Tour
                  </Button>
                  <Button
                     onClick={this.clearAll}
                     style={{ margin: "12px 12px 0px" }}
                  >
                     Clear filters and sorters
                  </Button>
               </div>
            )}
            <EditableContext.Provider value={this.props.form}>
               <Table
                  rowKey={"idTour"}
                  components={components}
                  pagination={{
                     onChange: this.cancel,
                  }}
                  // dataSource={data}
                  dataSource={state.hasData ? data : null}
                  columns={columns.map((item, index) => ({
                     ...item,
                     ellipsis: state.ellipsis,
                     onHeaderCell: (column) => ({
                        //resize
                        width: column.width,
                        onResize: this.handleResize(index),
                     }), //end resize
                  }))}
                  rowClassName={() => "editable-row"}
                  onChange={this.handleChange}
                  {...this.state}
                  //Expanded Row Render
                  expandedRowRender={this.expandedRowRender}
               />
            </EditableContext.Provider>
         </div>
      );
   }
}

const TablesContainer = Form.create()(EditableTable);

TablesContainer.propTypes = {
   classes: PropTypes.object,
   tourAllActions: PropTypes.shape({
      fetchListTourRequest: PropTypes.func,
      fetchPostTourRequest: PropTypes.func,
      fetchDeleteTourRequest: PropTypes.func,
      fetchPatchTourRequest: PropTypes.func,
      fetchListTourImageRequest: PropTypes.func,
   }),
   listTour: PropTypes.array,
};

const mapStateToProps = (state) => {
   return {
      listTour: state.tour.listTour,
      listImageTour: state.tour.listImageTour,
   };
};
const mapDispatchToProps = (dispatch) => {
   return {
      tourAllActions: bindActionCreators(tourActions, dispatch),
      //Bên trái chỉ là đặt tên thôi, bên phải là tourActions ở bên tour.action.js
   };
};
export default connect(mapStateToProps, mapDispatchToProps)(TablesContainer);
