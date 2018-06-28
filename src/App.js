import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from './logo.svg';
import { getRequest } from './utility/httpUtil.js';
import { getUIState } from "./selectors/globalSelectors";
import { sortByPercentage } from "./reducers/reducers";
import { sortByDollarAmount } from "./reducers/reducers";
import { sortByBTCRatio } from "./reducers/reducers";
import AssetPanel from "./tickerPanel/assetPanel";
import SearchPanel from "./components/interaction/searchPanel";

class App extends Component {

    render() {
        return (
            <div>
                <div className={"App app-container"}>
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Application</h1>
                    </header>
                </div>
                <div>
                    <div>
                        <SearchPanel></SearchPanel>
                    </div>
                    <div>
                        <AssetPanel data = {this.state.coinList}/>
                    </div>
                </div>
            </div>
        );
    }

    constructor() {
        super();
        this.state = {
            prevState: {},
            coinList: []
        };
    }

    getInitialState() {
        return {
            name: this.props.name
        };
    }

    //Helper Methods
    percentageSelect = (evt) => {
        var temp = {};
        if(evt === 1) {
            temp = this.state.coinList.sort(function(a, b) {
                return parseFloat(b.percent_change_1h) - parseFloat(a.percent_change_1h);
            });
        } else if(evt === 2) {
            temp = this.state.coinList.sort(function(a, b) {
                return parseFloat(b.percent_change_24h) - parseFloat(a.percent_change_24h);
            });
        } else if(evt === 3) {
            temp = this.state.coinList.sort(function(a, b) {
                return parseFloat(b.percent_change_7d) - parseFloat(a.percent_change_7d);
            });
        }
        this.setState({
            coinList: temp //assigns the array to the priceList object
        });
    }

    priceSelect = (evt) => {
        var temp = {};
        if(evt === 1) {
            temp = this.state.coinList.sort(function(a, b) {
                return parseFloat(a.price_usd) - parseFloat(b.price_usd);
            });
        } else if(evt === 2) {
            temp = this.state.coinList.sort(function(a, b) {
                return parseFloat(b.price_usd) - parseFloat(a.price_usd);
            });
        }
        this.setState({
            coinList: temp //assigns the array to the priceList object
        });
    }

    makeRequest = async () => {

        const task1 = getRequest('https://api.coinmarketcap.com/v1/ticker/');
        const task2 = getRequest('https://min-api.cryptocompare.com/data/all/coinlist');
        //const task3 = getRequest('https://coinlib.io/searchable_items_json?json');
        //const task3 = getRequest('https://api.binance.com/api/v3/ticker/price');

        return {
            result1: await task1,
            result2: await task2,
            //result3: await task3,
            //result3: await task3
        }
    }

    fetchData() {

    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('coinList',JSON.stringify(this.state.coinList))
    }

    componentDidMount = async () => {
        var _this = this;

        let response = await this.makeRequest();
        response.result1.data.forEach(function(cmCoin) {
            var token = response.result2.data.Data[cmCoin.symbol];
            if(token) {
                if (token.ImageUrl) {
                    cmCoin.image = 'https://www.cryptocompare.com' + token.ImageUrl;

                }
            }
        });

        _this.setState({
            coinList: response.result1.data.slice(0, 10) //assigns the array to the coinList object
        });
        localStorage.setItem('coinList',JSON.stringify(this.state.coinList))
    }

}

// These props come from the application's
// state when it is started
const mapStateToProps = (state) => {
    const ui = getUIState(state)
    return {
        ui
    };
}


const mapDispatchToProps = (dispatch) => ({
    sortByPercentage: () => dispatch(sortByPercentage()),
    sortByDollarAmount: () => dispatch(sortByDollarAmount()),
    sortByBTCRatio: () => dispatch(sortByBTCRatio())

});

export default connect(mapStateToProps, mapDispatchToProps())(App)

//https://coinlib.io/searchable_items_json?json