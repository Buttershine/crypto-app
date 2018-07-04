import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from './logo.svg';
import { getRequest } from './utility/httpUtil.js';
import { getUpdatedCoinListFromStore, sortByPercentage, getCheckoutModel} from "./reducers/reducers";
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
                        <AssetPanel coinList = {this.state.coinList}/>
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

    updateCoinList = (localStorageCoinList, response, userCoinList) => {
        for(let each in localStorageCoinList) {
            let token = localStorageCoinList[each];
            if(userCoinList) {
                if(userCoinList[localStorageCoinList[each].symbol]) {
                    localStorageCoinList[each].amount = userCoinList[localStorageCoinList[each].symbol].amount;
                }
            }//TODO: make it work on user input
            localStorageCoinList[each].price_usd = response.result1.data.find(x => x.name === token.name).price_usd; //The find method requires a generic function: x => x.name === token.name means search for name in the supplied array and return once found
        }
        return localStorageCoinList;
    }

    componentWillUpdate(nextProps, nextState) {
        let _this = this;
        const currentCoinList = this.state.coinList;
        if(this.state.coinList.length > 0 && nextProps.updatedCoinList) {
            for(let each in nextState.coinList) {
                if(nextProps.updatedCoinList) {
                    if(nextProps.updatedCoinList[nextState.coinList[each].symbol]) {
                        nextState.coinList[each].amount = nextProps.updatedCoinList[nextState.coinList[each].symbol].amount;
                    }
                }
            }
            if(nextState.coinList !== currentCoinList) {
                localStorage.setItem('coinList', JSON.stringify(nextProps.coinList))
                _this.setState({
                    coinList: nextState.coinList
                });
            }
        }
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

            list = this.updateCoinList(localStorageCoinList, response);
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
    sortByBTCRatio: () => dispatch(sortByBTCRatio())

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

//https://coinlib.io/searchable_items_json?json