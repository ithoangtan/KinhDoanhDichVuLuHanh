import React, { Component } from "react";

import {
   Form,
   Input,
   Tooltip,
   Icon,
   Cascader,
   InputNumber,
   Button,
   message
} from "antd";

import { mapAddressToOptionAntd } from "./addressVN";

const tailFormItemLayout = {
   wrapperCol: {
      xs: {
         offset: 0
      },
      sm: {
         offset: 2
      },
      md: {
         offset: 2
      },
      lg: {
         offset: 2
      },
      xl: {
         offset: 2
      },
      xxl: {
         offset: 2
      }
   }
};

class BookTourStep2 extends Component {
   state = {
      confirmDirty: false,
      autoCompleteResult: []
   };

   handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
         if (!err) {
            message.success("OK! Bây giờ bạn có thể đến bước tiếp theo rồi");
            this.props.step2OK();
            //    const { authAllActions } = this.props;
            //    const { fetchLoginRequest } = authAllActions;
            //    fetchLoginRequest(values);
            //Lưu thông tin vào storage
            localStorage.setItem("orders", JSON.stringify(values));
            // localStorage.setItem("name", values.name);
            // localStorage.setItem("email", values.email);
            // localStorage.setItem("phone", values.phone);
            // localStorage.setItem("numberChildren", values.numberChildren);
            // localStorage.setItem("numberPeople", values.numberPeople);
            // localStorage.setItem("province", values.residence[0]);
            // localStorage.setItem("district", values.residence[1]);
            // localStorage.setItem("ward", values.residence[2]);
            //Đến khi người dùng ấn done mới tiến hành lưu xuống CSDL
            console.log("Received values of form: ", values);
         }
      });
   };

   handleConfirmBlur = e => {
      const { value } = e.target;
      this.setState({
         confirmDirty: this.state.confirmDirty || !!value
      });
   };

   initValue(name) {
      if (localStorage.getItem("orders")) {
         if (name === "name")
            return JSON.parse(localStorage.getItem("orders")).name;
         if (name === "email")
            return JSON.parse(localStorage.getItem("orders")).email;
         if (name === "phone")
            return JSON.parse(localStorage.getItem("orders")).phone;
         if (name === "numberPeople")
            return JSON.parse(localStorage.getItem("orders")).numberPeople;
         if (name === "numberChildren")
            return JSON.parse(localStorage.getItem("orders")).numberChildren;
         if (name === "address")
            return [
               JSON.parse(localStorage.getItem("orders")).address[0],
               JSON.parse(localStorage.getItem("orders")).address[1],
               JSON.parse(localStorage.getItem("orders")).address[2]
            ];
      }
   }

   render() {
      const { getFieldDecorator } = this.props.form;

      const formItemLayout = {
         labelCol: {
            xs: { span: 24 },
            sm: { span: 8 }
         },
         wrapperCol: {
            xs: { span: 24 },
            sm: { span: 12 }
         }
      };

      return (
         <Form
            {...formItemLayout}
            onSubmit={this.handleSubmit}
            className="book-tour-step2"
         >
            <Form.Item
               label={
                  <span>
                     Tên&nbsp;
                     <Tooltip title="Bạn sẽ được chúng tôi gọi là?">
                        <Icon type="question-circle-o" />
                     </Tooltip>
                  </span>
               }
            >
               {getFieldDecorator("name", {
                  initialValue: this.initValue("name"),
                  rules: [
                     {
                        required: true,
                        message: "Xin hãy cho chúng tôi biết tên của bạn!"
                     }
                  ]
               })(<Input placeholder="Họ và tên của bạn" />)}
            </Form.Item>
            <Form.Item label="E-mail">
               {getFieldDecorator("email", {
                  initialValue: this.initValue("email"),
                  rules: [
                     {
                        type: "email",
                        message: "Hãy nhập một E-mail hợp lệ á nè!"
                     },
                     {
                        required: true,
                        message: "Xin hãy cho chúng tôi biết E-mail của bạn!"
                     }
                  ]
               })(<Input placeholder="Địa chỉ mail của bạn" />)}
            </Form.Item>
            <Form.Item
               label={
                  <span>
                     Địa chỉ&nbsp;
                     <Tooltip title="Chúng tôi cần biết địa chỉ của bạn!">
                        <Icon type="question-circle-o" />
                     </Tooltip>
                  </span>
               }
            >
               {getFieldDecorator("address", {
                  initialValue: this.initValue("address"),
                  rules: [
                     {
                        type: "array",
                        required: true,
                        message: "Xin hãy chọn nơi cư trú của bạn!"
                     }
                  ]
               })(
                  <Cascader
                     options={mapAddressToOptionAntd()}
                     placeholder="Hãy chọn nơi cư trú của bạn"
                  />
               )}
            </Form.Item>
            <Form.Item
               label={
                  <span>
                     Số điện thoại&nbsp;
                     <Tooltip title="Có thể chúng tôi sẽ gọi cho bạn!">
                        <Icon type="question-circle-o" />
                     </Tooltip>
                  </span>
               }
            >
               {getFieldDecorator("phone", {
                  initialValue: this.initValue("phone"),
                  rules: [
                     {
                        required: true,
                        message:
                           "Có thể cho chúng tôi số điện thoại để liên hệ chứ!"
                     }
                  ]
               })(
                  <Input
                     style={{ width: "100%" }}
                     placeholder="Số điện thoại của bạn"
                  />
               )}
            </Form.Item>
            <Form.Item
               label={
                  <span>
                     Số người tham gia&nbsp;
                     <Tooltip title="Bạn có ai cùng đi với bạn chứ?">
                        <Icon type="question-circle-o" />
                     </Tooltip>
                  </span>
               }
            >
               {getFieldDecorator("numberPeople", {
                  initialValue: this.initValue("numberPeople"),
                  rules: [
                     {
                        required: true,
                        message: "Xin hãy cho chúng tôi biết số lượng người!"
                     }
                  ]
               })(<InputNumber style={{ width: "100%" }} min={0} max={100} />)}
            </Form.Item>
            <Form.Item
               label={
                  <span>
                     Số trẻ tham gia&nbsp;
                     <Tooltip
                        title={`Bạn có trẻ con cùng đi với bạn không? 
                     Giá vé tour sẽ bằng một nửa so với giá vé người lớn
                     Trẻ con cao dưới 1m2 bạn nhé!`}
                     >
                        <Icon type="question-circle-o" />
                     </Tooltip>
                  </span>
               }
            >
               {getFieldDecorator("numberChildren", {
                  initialValue: this.initValue("numberChildren")
               })(<InputNumber style={{ width: "100%" }} min={0} max={10} />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
               <Tooltip
                  placement="bottom"
                  title={"Thông tin của bạn sẽ được bảo mật!"}
               >
                  <Button
                     type="primary"
                     htmlType="submit"
                     style={{ width: "100%" }}
                  >
                     Xác nhận thông tin của bạn là chính xác!
                  </Button>
               </Tooltip>
            </Form.Item>
         </Form>
      );
   }
}

const WrappedBookTourStep2 = Form.create({ name: "bookstep2" })(BookTourStep2);

export default WrappedBookTourStep2;
