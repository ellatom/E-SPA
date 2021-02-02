import React, { Component } from 'react';
import MaterialTable from "material-table";
import utilsData from '../../Utilities/data-util-functions.js';
import utilsOptions from '../../Utilities/table-options-util-function.js';
import '../TemplateTable/TemplateTable.css'
import axios from 'axios';
import * as params from '../../Data/config.js';
import Interval from '../Interval/Interval'

class TradesTable extends Component {

    state = { tableData: [],isFetching: false, showButton:false,rerender:false };

    //set table data from json
    componentDidMount = async () => {
        await this.fetchData();
    }

    //fetch data from specific url defined in config
    fetchData = async () => {
        try {
            this.setState({ ...this.state, isFetching: true, rerender:false });
            const response = await axios.get(params.DATA_SERVICE_URL);

            if (response.data["length"] !== 1) {
                this.setState({ tableData: response.data, isFetching: false });
                utilsData().setDataToLocalStorage(response.data);
                this.setState({tableData: response.data});
            }
            else {
                let db = utilsData().getDataFromLocalStorage();
                this.setState({ tableData: db });
            }
            if(this.state.showButton){ 
                this.setState({ ...this.state,showButton: false,rerender:true });
            }

        } catch (e) {
            console.log(e);
            this.setState({ ...this.state, isFetching: false });
        }
    };

    //check if fetch should be done -api rate limit
    shouldFetch = async (secondsElapsed) => {
        !secondsElapsed && this.setState({showButton:true});
    }
    //set table title
    getTitle = (title) => {
        return title;
    }

    //table headers 
    getHeaders = (key) => {
        if(key)
        {
            let keys = utilsData().getKeys(key);
            let headers = keys.map(key => {
                let titleValue = utilsData().setTitleValue(key);
                let fieldValue = key;
                return { title: titleValue, field: fieldValue };
            })
            return headers;
        }
    }

    //get table rows data
    getRows = (key) => {
        if(key)
        {
            const { tableData } = this.state;
            let filteredData = utilsData().getFilteredDataByKeys(tableData, key);
            return filteredData;
        }
    }

    render() {
        const { title, table_key } = this.props
        return (
            <div>
                <MaterialTable
                    title={this.getTitle(title)}
                    columns={this.getHeaders(table_key)}
                    data={this.getRows(table_key)}
                    options={utilsOptions().setOptions()}
                />
                {!this.state.rerender && <Interval shouldFetch={this.shouldFetch}/>}
                {this.state.showButton && <button onClick={this.fetchData}>Show New Data</button>}
            </div>
        );
    }

}
export default TradesTable;
