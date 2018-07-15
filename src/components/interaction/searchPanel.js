import React from 'react';
import * as NumberFormat from 'react-number-format'

const isMobile = typeof window.orientation !== 'undefined';

const SearchPanel = ({coinListTotal, handleSearch}) => {
    return (<div className={isMobile ? "value-panel" : "value-panel"}>
                <NumberFormat value={coinListTotal} decimalScale={2} displayType={'text'} thousandSeparator={true} prefix={'$'} className={isMobile ? "value-panel-total" : "value-panel-total"}/>
                <div className={"value-panel-title"}>PORTFOLIO VALUE</div>
                <span className={"value-panel-add-token inline-row"}>Add Token</span><input onBlur={handleSearch} defaultValue={""} className={"value-panel-search inline-row ant-input"}/>
            </div>);
};

export default SearchPanel;