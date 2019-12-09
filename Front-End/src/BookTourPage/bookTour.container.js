import React, { Component } from "react";

import { Redirect } from "react-router-dom";

import { Button, Steps, message } from "antd";

import BookTourStep1 from "./bookTourStep1";
import BookTourStep2 from "./bookTourStep2";
import BookTourStep3 from "./bookTourStep3";

import funcLoadJs from "../_constants/loadJs.constants";
import * as INDEX_CONSTANTS from "../_constants/index.constants";

const { Step } = Steps;

const stepStyle = {
   marginBottom: 60,
   boxShadow: "0px -1px 0 0 #e8e8e8 inset"
};
class BookTourContainer extends Component {
   constructor(props) {
      super(props);
      this.state = {
         current: 0,
         step2OK: false,
         redirectResult: false
      };
   }
   //steps container
   next() {
      if (!this.state.step2OK && this.state.current === 1) {
         message.error(
            "Vui lòng nhập đầy đủ thông tin và xác nhận trước khi đến bước tiếp theo! next"
         );
         return;
      } else {
         const current = this.state.current + 1;
         this.setState({ current });
         // this.setState({ current, step2OK: false });
         funcLoadJs(INDEX_CONSTANTS.CustomerArrayExternalScript);
      }
   }

   step2OK() {
      this.setState({ step2OK: true });
   }

   prev() {
      const current = this.state.current - 1;
      this.setState({ current });
      funcLoadJs(INDEX_CONSTANTS.CustomerArrayExternalScript);
   }
   onChange = current => {
      if (!this.state.step2OK && this.state.current === 1) {
         message.error(
            "Vui lòng nhập đầy đủ thông tin và xác nhận trước khi đến bước tiếp theo!"
         );
         return;
      }
      console.log(this.state.current, this.state.step2OK);
      this.setState({ current });
      funcLoadJs(INDEX_CONSTANTS.CustomerArrayExternalScript);
   };

   //end step container

   orderList = () => {
      const { tourById, listImageByIdTour } = this.props;
      return (
         <BookTourStep1
            tourById={tourById}
            listImageByIdTour={listImageByIdTour}
         />
      );
   };

   //Step 2: Your information
   orderInfo = () => {
      return <BookTourStep2 step2OK={() => this.step2OK()} />;
   };

   orderFinish = () => {
      return <BookTourStep3 />;
   };

   statusOrder = current => {
      let status = "";
      if (current === 1) status = "";
      if (current === 2) status = "";
      return status;
   };

   //Done
   onDone = () => {
      message.success("Processing complete!");
      this.setState({ redirectResult: true });
      //Lưu xuống data base nữa nha
   };
   onRedirect() {
      const PIN = Date.now();
      localStorage.setItem("PIN", PIN);
      if (this.state.redirectResult) {
         this.setState({ redirectResult: false });
         return (
            <Redirect
               to={{
                  pathname: `/successfulResult/${PIN}`,
                  // search: `?idOrder=${PIN}`,
                  state: { done: true }
               }}
            />
         );
      }
   }
   render() {
      const { current } = this.state;

      const steps = [
         {
            title: "Check Your Order",
            status: this.statusOrder(current),
            description: "Estimaed: 00:00:10",
            content: this.orderList()
         },
         {
            title: "Your Information",
            status: this.statusOrder(current),
            description: "Estimaed: 00:02:00",
            content: this.orderInfo()
         },
         {
            title: "Payments Method",
            // subTitle: "00:05:00",
            status: this.statusOrder(current),
            description: "Estimaed: 00:02:00",
            content: this.orderFinish()
         }
      ];

      return (
         <div className="book-tour-container">
            {this.onRedirect()}
            <Steps
               current={current}
               type="navigation"
               size="small"
               onChange={this.onChange}
               style={stepStyle}
            >
               {steps.map(item => (
                  <Step
                     key={item.title}
                     title={item.title}
                     subTitle={item.subTitle}
                     status={item.status}
                     description={item.description}
                  />
               ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action">
               {current > 0 && (
                  <Button
                     style={{ marginRight: 8 }}
                     onClick={() => this.prev()}
                  >
                     Previous
                  </Button>
               )}
               {current < steps.length - 1 && (
                  <Button type="primary" onClick={() => this.next()}>
                     Next
                  </Button>
               )}
               {current === steps.length - 1 && (
                  <Button type="primary" onClick={this.onDone}>
                     Done
                  </Button>
               )}
            </div>
         </div>
      );
   }
}

export default BookTourContainer;