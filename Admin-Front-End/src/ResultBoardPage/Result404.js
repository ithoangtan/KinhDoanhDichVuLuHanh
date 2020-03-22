import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Result, Button } from "antd";

export default class Result404 extends Component {
   render() {
      return (
         <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
               <Link to={{ pathname: `/admin` }}>
                  <Button type="primary">Back Home</Button>
               </Link>
            }
         />
      );
   }
}
