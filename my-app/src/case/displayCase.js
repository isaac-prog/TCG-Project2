import React from "react";
import axios from "axios";


export default class DisplayCasePage extends React.Component {
 url = "https://tgc-project2.herokuapp.com/";

 state = {
   data: [],
 };

 async componentDidMount() {
  let response = await axios.get(this.url + "case/" + this.props.id);
  this.setState({
    data: response.data
  })
 }

 render() {
   return (
     <React.Fragment>
        <div>
       <div class="display-image">
          <img class="image_center" src={this.state.data.image}/>
          <h1>{this.state.data.name}</h1>
       </div>

       {/* table */}
    <div id="flex-container">
      
    <div class="result-container">
    <h4>Description</h4>
    <div>{this.state.data.description}</div>
    </div>

    <div class="filter-container">

      <h4>Case type</h4>
      <div class="filter-segments">
	        <React.Fragment>
                {this.state.data.type}
	        </React.Fragment>
        </div>

        <h4>Case color</h4>
      <div class="filter-segments">
	        <React.Fragment>
                {this.state.data.color}
	        </React.Fragment>
        </div>

        <h4>Case brand</h4>
      <div class="filter-segments">
	        <React.Fragment>
                {this.state.data.brand}
	        </React.Fragment>
        </div>

    </div>

    <div class="comment-container">
      <div class="new-comment">

      </div>
      </div>
    </div>
    </div>
     </React.Fragment>
   );
 }
}