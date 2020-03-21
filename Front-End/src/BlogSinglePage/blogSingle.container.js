import React, { Component } from "react";

import { Link } from "react-router-dom";

import * as INDEX_CONSTANTS from "../_constants/index.constants";
import funcLoadJs from "../_constants/loadJs.constants";

import BlogRightContainer from "../BlogPage/blogRight.container";
import BlogNavigationContainer from "../BlogPage/blogNavigation.container";

import { Rate } from "antd";

const desc = ["terrible", "bad", "normal", "good", "wonderful"];

export default class BlogSingleContainer extends Component {
   componentDidMount() {
      window.scrollTo({
         top: 0,
         left: 0
      });
      funcLoadJs(INDEX_CONSTANTS.CustomerArrayExternalScript);
   }

   renderContentPost() {
      return <></>;
   }

   constructor(props) {
      super(props);
      this.state = {
         vote: false,
         numVote: 131,
         valueRate: 3
      };
   }

   handleChange = value => {
      this.setState({ valueRate: value });
   };
   onChangeVote = () => {
      this.setState({
         vote: !this.state.vote,
         numVote: this.state.vote
            ? this.state.numVote - 1
            : this.state.numVote + 1
      });
   };
   render() {
      const { vote, numVote, valueRate } = this.state;
      return (
         <section className="ftco-section">
            <div className="container">
               <BlogNavigationContainer />

               <div className="row">
                  <div className="col-lg-8 ftco-animate">
                     <div className="ht-title-post-container ftco-animate">
                        <div className="ht-title">
                           Thử Làm "Rich Kid" Một Lần Xem Chúng Bạn Có Trầm Trồ
                           Tại 3 Resort Sang Chảnh Bậc Nhất Đà Lạt
                        </div>
                        <div className="ht-date-view-vote">
                           <div className="ht-date-view">
                              <i className="far fa-calendar-alt"></i> 03/03/2020
                              <i className="far fa-eye ml-3"></i> 1244
                              <i className="far fa-comment ml-3"></i> 115
                           </div>
                           <div
                              className={vote ? "ht-vote-up" : "ht-vote"}
                              onClick={this.onChangeVote}
                           >
                              {" "}
                              <i className="far fa-thumbs-up"></i> {numVote}
                           </div>
                        </div>
                     </div>
                     {this.renderContentPost()}
                     <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Reiciendis, eius mollitia suscipit, quisquam
                        doloremque distinctio perferendis et doloribus unde
                        architecto optio laboriosam porro adipisci sapiente
                        officiis nemo accusamus ad praesentium? Esse minima nisi
                        et. Dolore perferendis, enim praesentium omnis, iste
                        doloremque quia officia optio deserunt molestiae
                        voluptates soluta architecto tempora.
                     </p>
                     <p>
                        <img
                           src="images/image_6.jpg"
                           alt="#"
                           className="img-fluid"
                        />
                     </p>
                     <p>
                        Molestiae cupiditate inventore animi, maxime sapiente
                        optio, illo est nemo veritatis repellat sunt doloribus
                        nesciunt! Minima laborum magni reiciendis qui voluptate
                        quisquam voluptatem soluta illo eum ullam incidunt rem
                        assumenda eveniet eaque sequi deleniti tenetur dolore
                        amet fugit perspiciatis ipsa, odit. Nesciunt dolor
                        minima esse vero ut ea, repudiandae suscipit!
                     </p>
                     <h2 className="mb-3 mt-5">
                        #2. Creative WordPress Themes
                     </h2>
                     <p>
                        Temporibus ad error suscipit exercitationem hic
                        molestiae totam obcaecati rerum, eius aut, in.
                        Exercitationem atque quidem tempora maiores ex
                        architecto voluptatum aut officia doloremque. Error
                        dolore voluptas, omnis molestias odio dignissimos culpa
                        ex earum nisi consequatur quos odit quasi repellat qui
                        officiis reiciendis incidunt hic non? Debitis commodi
                        aut, adipisci.
                     </p>
                     <p>
                        <img
                           src="images/image_4.jpg"
                           alt="#"
                           className="img-fluid"
                        />
                     </p>
                     <p>
                        Quisquam esse aliquam fuga distinctio, quidem delectus
                        veritatis reiciendis. Nihil explicabo quod, est eos
                        ipsum. Unde aut non tenetur tempore, nisi culpa
                        voluptate maiores officiis quis vel ab consectetur
                        suscipit veritatis nulla quos quia aspernatur
                        perferendis, libero sint. Error, velit, porro. Deserunt
                        minus, quibusdam iste enim veniam, modi rem maiores.
                     </p>
                     <p>
                        Odit voluptatibus, eveniet vel nihil cum ullam dolores
                        laborum, quo velit commodi rerum eum quidem pariatur!
                        Quia fuga iste tenetur, ipsa vel nisi in dolorum
                        consequatur, veritatis porro explicabo soluta commodi
                        libero voluptatem similique id quidem? Blanditiis
                        voluptates aperiam non magni. Reprehenderit nobis odit
                        inventore, quia laboriosam harum excepturi ea.
                     </p>
                     <p>
                        Adipisci vero culpa, eius nobis soluta. Dolore, maxime
                        ullam ipsam quidem, dolor distinctio similique
                        asperiores voluptas enim, exercitationem ratione aut
                        adipisci modi quod quibusdam iusto, voluptates beatae
                        iure nemo itaque laborum. Consequuntur et pariatur totam
                        fuga eligendi vero dolorum provident. Voluptatibus,
                        veritatis. Beatae numquam nam ab voluptatibus culpa,
                        tenetur recusandae!
                     </p>
                     <p>
                        Voluptas dolores dignissimos dolorum temporibus, autem
                        aliquam ducimus at officia adipisci quasi nemo a
                        perspiciatis provident magni laboriosam repudiandae iure
                        iusto commodi debitis est blanditiis alias laborum sint
                        dolore. Dolores, iure, reprehenderit. Error provident,
                        pariatur cupiditate soluta doloremque aut ratione. Harum
                        voluptates mollitia illo minus praesentium, rerum ipsa
                        debitis, inventore?
                     </p>
                     <div className="tag-widget post-tag-container mb-2 mt-2">
                        <div className="tagcloud">
                           <div className="ht-tag-container-beautiful">
                              <i className="far fa-folder-open"></i> Category
                           </div>
                           <Link to="#" className="tag-cloud-link">
                              Life
                           </Link>
                           <Link to="#" className="tag-cloud-link">
                              Sport
                           </Link>
                           <Link to="#" className="tag-cloud-link">
                              Tech
                           </Link>
                           <Link to="#" className="tag-cloud-link">
                              Travel
                           </Link>
                           <Link to="#" className="tag-cloud-link">
                              Travel
                           </Link>
                        </div>

                        <div className="tagcloud">
                           <div className="ht-tag-container-beautiful">
                              <i className="fas fa-tags"></i> Tags
                           </div>
                           <Link to="#" className="tag-cloud-link">
                              Life
                           </Link>
                           <Link to="#" className="tag-cloud-link">
                              Sport
                           </Link>
                           <Link to="#" className="tag-cloud-link">
                              Tech
                           </Link>
                           <Link to="#" className="tag-cloud-link">
                              Travel
                           </Link>
                           <Link to="#" className="tag-cloud-link">
                              Travel
                           </Link>
                           <Link to="#" className="tag-cloud-link">
                              Travel kakakakakak
                           </Link>
                           <Link to="#" className="tag-cloud-link">
                              Travel kakakakakak
                           </Link>
                           <Link to="#" className="tag-cloud-link">
                              Travel kakakakakak
                           </Link>
                           <Link to="#" className="tag-cloud-link">
                              Travel kakakakakak
                           </Link>
                           <Link to="#" className="tag-cloud-link">
                              Travel
                           </Link>
                           <Link to="#" className="tag-cloud-link">
                              Travel
                           </Link>
                        </div>
                     </div>
                     <div className="pt-2 mt-2 mb-4 ht-rating-post">
                        ĐÁNH GIÁ BÀI VIẾT NÀY
                        <div className="ht-rating">
                           <span>
                              <Rate
                                 allowClear={false}
                                 tooltips={desc}
                                 onChange={this.handleChange}
                                 value={valueRate}
                              />
                              {valueRate ? (
                                 <span className="ant-rate-text">
                                    {desc[valueRate - 1]}
                                 </span>
                              ) : (
                                 ""
                              )}
                           </span>
                        </div>
                     </div>

                     <div className="about-author d-flex p-4 bg-light">
                        <div className="bio mr-5">
                           <img
                              src="images/person_1.jpg"
                              alt="#"
                              className="img-fluid mb-4"
                           />
                        </div>
                        <div className="desc">
                           <h3>ithoangtan</h3>
                           <p>
                              Create a beautiful blog that fits your style.
                              Choose from a selection of easy-to-use templates –
                              all with flexible layouts and hundreds of
                              background images – or design something new.
                           </p>
                        </div>
                     </div>
                  </div>
                  {/* .col-md-8 */}
                  <div className="col-lg-4 sidebar ftco-animate col-md-4 ht-blog-right ftco-animate">
                     <BlogRightContainer />
                  </div>
               </div>
            </div>
         </section>
      );
   }
}
