 import React, { Component } from 'react';

 class Child extends React.Component {
   constructor(props){
     super(props);
   }
   render() {
     return(
     	<div>
        <button onClick={this.props.parentToggle.bind(this)}>Toggle</button>
      </div>
     )
   }
 }

export default Child;
