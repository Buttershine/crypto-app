import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from './logo.svg';
import { getRequest } from './utility/httpUtil.js';
import {
    getUpdatedCoinListFromStore,
    sortByPercentage,
    getCheckoutModel,
    updateStoreForAssetRow
} from "./reducers/reducers";
import { sortByDollarAmount } from "./reducers/reducers";
import { sortByBTCRatio } from "./reducers/reducers";
import AssetPanel from "./tickerPanel/assetPanel";
import SearchPanel from "./components/interaction/searchPanel";


class App extends React.Component {

    render() {
        return (
            <div>
                <div className={"App app-container"}>
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">PolyChain</h1>
                    </header>
                </div>
                <div>
                    <div>
                        <SearchPanel handleSearch = {this.handleSearch} coinListTotal = {this.state.coinListTotal}> </SearchPanel>
                    </div>
                    <div>
                        <AssetPanel handleInput = {this.handleInput} coinList = {this.state.coinList} someProp={this.state.coinList}/>
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

        this.handleInput = this.handleInput.bind(this);
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

    handleInput = (event) => {
        const symbol = event.target.parentElement.parentElement.id;
        const amount = event.target.value;
        let fiatValue = '';
        for(let token in this.props.data){
            if(token.symbol === symbol){
                fiatValue = this.props.data.price_usd * amount;
            }
        }
        this.createElement(symbol, amount, fiatValue);
    }

    handleSearch = async (event) => {
        const symbol = event.target.value;
        let response = await getRequest("https://api.coinmarketcap.com/v1/ticker/"+symbol+"/");
        this.updateCoinList(this.state.coinList, response.data[0]);
        //addCoin to list
    }

    createElement = (symbol, amount, fiatValue) => {
        //dynamically created object is concatenated with state
        let token = {
            symbol: symbol,
            amount: amount,
            fiatValue: fiatValue
        }

        let newState = Object.assign({}, this.state);
        newState.coinList = this.updateCoinList(this.state.coinList, this.state.response, token);
        newState.coinListTotal = this.calculateTotal(newState.coinList);
        this.setState({
            coinList: newState.coinList,
            coinListTotal: newState.coinListTotal
        });
        localStorage.setItem('coinList', JSON.stringify(newState.coinList));
        localStorage.setItem('coinListTotal', JSON.stringify(newState.coinListTotal));

    }

    calculateTotal(coinList) {
        let total = 0;
        for(let eachToken in coinList) {
            let currentTokenProduct = coinList[eachToken].amount * coinList[eachToken].price_usd;
            if(!isNaN(currentTokenProduct)) {
                total = total + currentTokenProduct;
            }
        }
        return total;
    }

    updateCoinList = (currentCoinList, response, token) => {
        let coinIsInList = false;
        for(let eachToken in currentCoinList) {
            if(token) {
                if(token.symbol === currentCoinList[eachToken].symbol) {
                    currentCoinList[eachToken].amount = token.amount;
                    currentCoinList[eachToken].price_usd = response.result1.data.find(x => x.symbol === token.symbol).price_usd; //The find method requires a generic function: x => x.name === token.name means search for name in the supplied array and return once found
                }
                coinIsInList = true;
            }else {
                if(currentCoinList[eachToken].symbol === response.symbol) {
                    coinIsInList = true;
                }
            }
        }
        debugger;
        if(!coinIsInList){
            currentCoinList.push(response);
            let newState = Object.assign({}, this.state);
            newState.coinList = currentCoinList;
            newState.coinListTotal = this.calculateTotal(newState.coinList);
            this.setState({
                coinList: newState.coinList,
                coinListTotal: newState.coinListTotal
            });
        }
        return currentCoinList;
    }

    updatePriceInCoinList = (currentCoinList, response) => {
        for(let eachToken in currentCoinList) {
                if(eachToken.symbol === response.symbol) {
                    currentCoinList[eachToken].price_usd = response.result1.data.find(x => x.symbol === currentCoinList[eachToken].symbol).price_usd; //The find method requires a generic function: x => x.name === token.name means search for name in the supplied array and return once found
                }

        }
        return currentCoinList;
    }

    componentDidMount = async () => {
        let _this = this;
        let response = await this.makeRequest();
        response.result1.data.forEach(function(cmCoin) {
            var token = response.result2.data.Data[cmCoin.symbol];
            if(token) {
                if (token.ImageUrl) {
                    cmCoin.image = 'https://www.cryptocompare.com' + token.ImageUrl;
                }
            }
        });

        let list = response.result1.data.slice(0, 10); //assigns the array to the coinList object
        let localStorageCoinList = localStorage.getItem("coinList");

        if(localStorageCoinList && localStorageCoinList !== "undefined") {
            localStorageCoinList = JSON.parse(localStorage.getItem('coinList'));
        } else {
            localStorageCoinList = false;
        }

        if(localStorageCoinList ? localStorageCoinList.length > 0 : false) {
            list = this.updatePriceInCoinList(localStorageCoinList, response);
            _this.setState({
                coinList: list,
                response: response
            });
        } else {
            _this.setState({
                coinList: list,
                response: response
            });
        }

        let localStorageCoinListTotal = localStorage.getItem("coinListTotal");
            if(localStorageCoinListTotal && localStorageCoinListTotal !== "undefined") {
                let coinListTotal = this.calculateTotal(localStorageCoinList);
                _this.setState({
                    coinListTotal: coinListTotal,
                    response: response
                });
            }
        }

}

// These props come from the application's
// state when it is started
const mapStateToProps = (state) => {
    const updatedCoinList = getUpdatedCoinListFromStore(state);
    const order = getCheckoutModel(state);

    return {
        updatedCoinList,
        order
    };
}

const mapDispatchToProps = (dispatch) => ({
    sortByPercentage: () => dispatch(sortByPercentage()),
    sortByDollarAmount: () => dispatch(sortByDollarAmount()),
    sortByBTCRatio: () => dispatch(sortByBTCRatio()),
    updateStore: id => {
        dispatch(updateStoreForAssetRow(id))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

//https://coinlib.io/searchable_items_json?json