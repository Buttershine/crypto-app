import React, { Component } from 'react';
import { Button } from 'antd';


class Filters extends React.Component {
    constructor(props){
        super(props);
    }

    comparisonFilter() {

    }

    render() {
        return <div>
            <div className={"ant-radio-group"}>
                <label class="ant-radio-button-wrapper">
                    <span class="ant-radio-button">
                        <input type="radio" class="ant-radio-button-input" onClick={this.sortByPercentage}></input>
                        <span class="ant-radio-button-inner"></span>
                    </span>
                    <span>Large</span>
                </label>
                <label class="ant-radio-button-wrapper">
                    <span class="ant-radio-button">
                        <input type="radio" class="ant-radio-button-input" onClick={this.sortByDollarAmount}></input>
                        <span class="ant-radio-button-inner"></span>
                    </span>
                    <span>Middle</span>
                </label>
                <label class="ant-radio-button-wrapper">
                    <span class="ant-radio-button">
                        <input type="radio" class="ant-radio-button-input" onClick={this.sortByBTCRatio}></input>
                        <span class="ant-radio-button-inner"></span>
                    </span>
                    <span>Small</span>
                </label>
            </div>
            <span className={"button-panel-padding"}></span>
            <div className={"ant-radio-group"}>
                <label class="ant-radio-button-wrapper">
                    <span class="ant-radio-button">
                        <input type="radio" class="ant-radio-button-input" onClick={this.sortByPercentage}></input>
                        <span class="ant-radio-button-inner"></span>
                    </span>
                    <span>+</span>
                </label>
                <label class="ant-radio-button-wrapper">
                    <span class="ant-radio-button">
                        <input type="radio" class="ant-radio-button-input" onClick={this.sortByBTCRatio}></input>
                        <span class="ant-radio-button-inner"></span>
                    </span>
                    <span>-</span>
                </label>
            </div>
            <span className={"button-panel-padding"}></span>
            <div className={"ant-radio-group"}>
                <label class="ant-radio-button-wrapper">
                    <span class="ant-radio-button">
                        <input type="radio" class="ant-radio-button-input" onClick={this.sortByPercentage}></input>
                        <span class="ant-radio-button-inner"></span>
                    </span>
                    <span>D</span>
                </label>
                <label class="ant-radio-button-wrapper">
                    <span class="ant-radio-button">
                        <input type="radio" class="ant-radio-button-input" onClick={this.sortByDollarAmount}></input>
                        <span class="ant-radio-button-inner"></span>
                    </span>
                    <span>M</span>
                </label>
                <label class="ant-radio-button-wrapper">
                    <span class="ant-radio-button">
                        <input type="radio" class="ant-radio-button-input" onClick={this.sortByBTCRatio}></input>
                        <span class="ant-radio-button-inner"></span>
                    </span>
                    <span>Y</span>
                </label>
            </div>
        </div>

    }
}

export default Filters;

 //        <DropdownButton title="Percentage Change" onSelect={this.props.percentageSelect.bind(this)}>
{/*<span class="ant-radio-button ant-radio-button-checked">*/}
    {/*<input type="radio" class="ant-radio-button-input" value="large"></input>*/}
        {/*<span class="ant-radio-button-inner">*/}
        {/*</span>*/}
{/*</span>*/}