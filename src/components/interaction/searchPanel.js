import React from 'react';
import * as NumberFormat from 'react-number-format'

const isMobile = typeof window.orientation !== 'undefined';

const SearchPanel = ({coinListTotal}) => {
    return (<div>Total:
                <NumberFormat value={coinListTotal} decimalScale={2} displayType={'text'} thousandSeparator={true} prefix={'$'} className={isMobile ? "inline-row content-size-mobile" : ""}/>
            </div>);
};

export default SearchPanel;