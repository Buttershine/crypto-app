import React, { Component } from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

 class PriceDropdown extends React.Component {
   constructor(props){
     super(props);
   }
   render() {
     return(
        <DropdownButton title="PriceDropdown" onSelect={this.props.priceSelect.bind(this)}>
          <MenuItem eventKey={1}>Ascending</MenuItem>
          <MenuItem eventKey={2}>Descending</MenuItem>
        </DropdownButton>
     )
   }
 }

export default PriceDropdown;
