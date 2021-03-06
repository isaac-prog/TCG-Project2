import React from "react";
import axios from "axios";


export default class CpuPage extends React.Component {
 url = "https://tgc-project2.herokuapp.com/";

 state = {
   data: [],
   filterclockspeed: [],
   filterOverclockspeed: [],
   filterBrands: [],
   filterCore: [],
   '_id': '',
   "page":"Cpu"
   
 };

 updateFormField = (event) => {
  this.setState({
      [event.target.name]: event.target.value,
  })
}

// updateCheckBox= (event) =>{
  
//   let currentValues= this.state[event.target.name];
//   let modifiedValues;
//   if (!currentValues.includes(event.target.value))
//   {
//       console.log('1',modifiedValues)
//       modifiedValues = [...currentValues, event.target.value];
//   }
//   else{
//       modifiedValues = currentValues.filter((element)=>{
//         console.log('2',element)
//           return element !== event.target.value;
//       })
//   }  
//   this.setState({
//       Case: modifiedValues
//   })
// }
checkTask = (name) => {
  let currentTask = this.state.data.filter(t => t.type === name);
  console.log(currentTask)
  let modifiedTask = { ...currentTask };
  modifiedTask.done = !currentTask.done;
  console.log(modifiedTask);
  console.log(currentTask)
  let modifiedTasksList = this.state.data.map(t => {
      if (t.type !== name) {
          console.log(t, "t")
          return t;
      } else {
          console.log(modifiedTask, "modified task")
          return modifiedTask;
      }
  })
  this.setState({
      'data': modifiedTasksList
  })
  
  console.log(this.state.data)
}


async componentDidMount() {
  let response = await axios.get(this.url + "cpu");

  let clockspeed = [];
  for(let data of response.data){
    if(!clockspeed.includes(data.clockspeed)){
      clockspeed.push(data.clockspeed);
    }
  }

  this.setState({
    data: response.data,
    filterclockspeed: clockspeed
  });

  let overclockspeed = [];
  for(let data of response.data){
    if(!overclockspeed.includes(data.over_clockspeed)){
      overclockspeed.push(data.over_clockspeed);
    }
  }

  this.setState({
    data: response.data,
    filterOverclockspeed: overclockspeed
  });
  

  let brands = [];
  for(let data of response.data){
    if(!brands.includes(data.brand)){
      brands.push(data.brand);
    }
  }

  this.setState({
    data: response.data,
    filterBrands: brands
  });

  let core = [];
  for(let data of response.data){
    if(!core.includes(data.core)){
      core.push(data.core);
    }
  }

  this.setState({
    data: response.data,
    filterBrands: core
  });

  
}

deleteCpu = async (task_id) => {
  let task_index = this.state.data.findIndex(t => t._id === task_id);
  let data = {
    _id: task_id
  }

  let response = await axios.post(this.url + "cpu/delete", data);
  let modifiedTasks = [
      ...this.state.data.slice(0, task_index),
      ...this.state.data.slice(task_index + 1),
      task_index
  ];
  this.setState({
      data: modifiedTasks
  });
};

 render() {
   return (
     <React.Fragment>
       <div class="wallPaper">
          <img class="image_center" src={require("./../images/computerCase.jpg").default}/>
       </div>

       {/* table */}
<div id="flex-container">
    <div class="result-container">

    <table>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Brand</th> 
            <th>Clockspeed</th>
            <th>over_clockspeed</th>
            <th>Core</th>
            <th>View/Edit/Delete</th>
          </tr>
    {this.state.data.map(c => {
         return (
          <tr>
            <td><img class="result-images" src={c.image}/></td>
            <td>{c.name}</td>
            <td>{c.brand}</td>
            <td>{c.clockspeed}</td>
            <td>{c.over_clockspeed}</td>
            <td>{c.core}</td>

            <td>
            <button onClick={() => this.props.pageHandler("display", c._id)}> View</button>
            <button onClick={() => this.props.pageHandler("edit", c._id)}> Edit</button>
            <button onClick={() => this.deleteCpu(c._id)}>Delete</button></td>
          </tr>
          )
        })}
        </table>
       </div>

       
     </div>
    
     </React.Fragment>
   );
 }
}