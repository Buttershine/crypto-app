import React, { Component } from 'react';
import * as NumberFormat from 'react-number-format';
//https://www.npmjs.com/package/react-number-format
class TickerPanel extends React.Component {

    getInitialState() {
        return {
           data: {
              stuff: [] 
           }
        };
    }

    render() {
    if (!this.props.data) {
        return null;
    }

    return (
      <div className="TickerPanel">
        {
          this.props.data.map(function(coin) {
            return <div class="col-lg-3" key={coin.id}>
                <div class="currency-tablet">
                    <div class="tablet-title">{coin.name}</div>
                    <img className={"panel-icon"} src={coin.imageUrl}/>
                        <div class="tablet-panel-interior">
                            <div class="row">
                                <span class="col-lg-4 bold">Price: </span>
                                <span class="col-lg-4 bold">MarketCap: </span>
                                <span class="col-lg-4 bold">Rank: </span>
                            </div>
                            <div class="row">
                                <span class="col-lg-4"><NumberFormat value={coin.price_usd} displayType={'text'} thousandSeparator={true} prefix={'$'}/></span>
                                <span class="col-lg-4"><NumberFormat value={coin.market_cap_usd} displayType={'text'} thousandSeparator={true} prefix={'$'}/></span>
                                <span class="col-lg-4">{coin.rank} </span>
                            </div>
                        </div>
                    <div class="tablet-panel-interior">
                        <div class="row tablet-panel-interior-title">
                            Percent Change
                        </div>
                        <div class="row">
                            <span className={"col-lg-4 " + (coin.percent_change_1h > 0 ? 'text-success' : 'text-danger')}>1h:{coin.percent_change_1h}% </span>
                            <span className={"col-lg-4 " + (coin.percent_change_24h > 0 ? 'text-success' : 'text-danger')}>24h:{coin.percent_change_24h}% </span>
                            <span className={"col-lg-4 " + (coin.percent_change_7d > 0 ? 'text-success' : 'text-danger')}>1w:{coin.percent_change_7d}% </span>
                        </div>
                    </div>
                </div>
            </div>
          })
        }
      </div>
    )}
};

export default TickerPanel;

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