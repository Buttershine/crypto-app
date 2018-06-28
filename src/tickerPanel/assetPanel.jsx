import React, { Component } from 'react'
import * as NumberFormat from 'react-number-format'
import logo from '../logo.svg';
import { updateStoreForAssetRow } from "../reducers/reducers";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const isMobile = typeof window.orientation !== 'undefined';

class AssetPanel extends Component {

    constructor() {
        super();
        this.state = {
            tokens: {}
        }
        this.placeholderToken = {
            id: '',
            amount: '',
            fiatValue: ''
        }
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput = (event) => {
        const id = event.target.parentElement.parentElement.id;
        const amount = event.target.value;
        let fiatValue = '';
        for(let token in this.props.data){
            if(token.id === id){
                fiatValue = this.props.data.price_usd * amount;
            }
        }
        this.createElement(id, amount, fiatValue);
    }

    createElement = (id, amount, fiatValue) => {
        //dynamically created object is concatenated with state
        let token = {
            id: id,
            amount: amount,
            fiatValue: fiatValue
        }

        let newState = Object.assign({}, this.state);
        newState.tokens[id] = token;
        this.setState(newState, () => {
            this.props.updateStore(newState);
        });
    }


    render() {
        if (!this.props.data) {
            return null;
        }

        return (
            <div>
                {this.props.data.map((coin) => {
                    return (
                        <div className={"row-full-width"} id={coin.symbol}>
                            <div className={"inline-row content-padding-small"}>
                                <img src={coin.image ? coin.image : logo} className={isMobile ? "inline-row content-size-mobile":"image-content"} alt="logo" />
                            </div>
                            <div className={"inline-row vertical-align-parent content-padding-small"}>
                                <div className={"vertical-border"}></div>
                            </div>
                            <div className={"inline-row vertical-align-parent content-padding-small"}>
                                <div className={""}>{coin.symbol}</div>
                                <div>{coin.name}</div>
                            </div>
                            <div className={isMobile ? "inline-row content-size-mobile vertical-align-price-float-right" : "inline-row price-content vertical-align-price-float-right"}>
                                <NumberFormat value={this.state.tokens[coin.symbol] ? coin.price_usd * this.state.tokens[coin.symbol].amount : 0} decimalScale={2} displayType={'text'} thousandSeparator={true} prefix={'$'} className={isMobile ? "inline-row content-size-mobile" : ""}/>
                            </div>
                            <div className={"inline-row vertical-align-price-float-right"}>
                                <input type="text" className={isMobile ? "inline-row content-size-mobile ant-input-number amount-input" : "ant-input-number"} onChange={this.handleInput} placeholder=""></input>
                            </div>
                            <div className={isMobile ? "inline-row content-size-mobile vertical-align-price-float-right" : "inline-row price-content vertical-align-price-float-right"}>
                                <NumberFormat value={coin.price_usd} decimalScale={2} displayType={'text'} thousandSeparator={true} prefix={'$'} className={isMobile ? this.state.tokens[coin.symbol] ? (this.state.tokens[coin.symbol].amount > 5000) && coin.price_usd > 1000 ? "price-content-hidden" : "inline-row content-size-mobile" : "inline-row content-size-mobile" : ""}/>
                            </div>
                        </div>
                    )
                    }, this)}
            </div>
        )}
};

const mapStateToProps = (state) => {
    tokens: state.tokens
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(updateStoreForAssetRow(), dispatch),
    updateStore: (newState) => dispatch(updateStoreForAssetRow(newState)),

});

export default connect(mapStateToProps, mapDispatchToProps)(AssetPanel);


//            <div class="App-cryptocurrencies-header">
//<div class="App-cryptocurrencies-label">
    //<div class="App-alt-short-text">Coins </div>
//    <a class="App-cryptocurrencies-label-buy" href="https://www.coinbase.com/join/516a7c8425687c4b93000050">buy</a>
//</div>
//<div class="radio-group">
//    <div class="radio-group-option selected">portfolio</div>
//<div class="radio-group-option ">market cap</div>
//</div>
// 24h_volume_usd
// "6678200000.0"
// available_supply
// "16718100.0"
// id
// "bitcoin"
// last_updated
// "1512345852"
// market_cap_usd
// "189171988740"
// max_supply
// "21000000.0"
// name
// "Bitcoin"
// percent_change_1h
// "0.92"
// percent_change_7d
// "19.23"
// percent_change_24h
// "1.98"
// price_btc
// "1.0"
// price_usd
// "11315.4"
// rank
// "1"
// symbol
// "BTC"
// total_supply
// "16718100.0"
// __proto__