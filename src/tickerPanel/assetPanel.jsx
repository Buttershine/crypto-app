import React from 'react';
import * as NumberFormat from 'react-number-format'
import logo from '../logo.svg';

const isMobile = typeof window.orientation !== 'undefined';

const AssetPanel = ({handleInput, coinList}) => {

    return (
        <div>
            {coinList.map((coin) => {
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
                            <div className={isMobile ? "token-name-mobile" : ""}>{coin.name}</div>
                        </div>
                        <div className={isMobile ? "inline-row content-size-mobile vertical-align-price-float-right" : "inline-row price-content vertical-align-price-float-right"}>
                            <NumberFormat value={coin.amount ? coin.price_usd * coin.amount : 0} decimalScale={2} displayType={'text'} thousandSeparator={true} prefix={'$'} className={isMobile ? "inline-row content-size-mobile" : ""}/>
                        </div>
                        <div className={"inline-row vertical-align-price-float-right"}>
                            <input value={coin.amount} type="text" className={isMobile ? "inline-row content-size-mobile ant-input-number amount-input" : "ant-input-number"} onChange={handleInput} placeholder=""></input>
                        </div>
                        <div className={isMobile ? "inline-row content-size-mobile vertical-align-price-float-right" : "inline-row price-content vertical-align-price-float-right"}>
                            <NumberFormat value={coin.price_usd} decimalScale={2} displayType={'text'} thousandSeparator={true} prefix={'$'} className={isMobile ? this.state.tokens[coin.symbol] ? (this.state.tokens[coin.symbol].amount > 5000) && coin.price_usd > 1000 ? "price-content-hidden" : "inline-row content-size-mobile" : "inline-row content-size-mobile" : ""}/>
                        </div>
                    </div>
                )
                }, this)}
        </div>
    )
};

export default AssetPanel;