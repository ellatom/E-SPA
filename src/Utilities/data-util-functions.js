import * as params from '../Data/config.js';

//get keys/columns to display as columns in table
const getKeys = (key) => {
    return params[key];
}

//convert epoch to date
const getTradeDate = (trade_date) => {
    let utcSeconds = trade_date;
    let date = new Date(0);
    date.setMilliseconds(utcSeconds);
    return date;
}

//capitalize only first letter
const capitalizeFirstLetter = (key) => {
    return key.charAt(0).toUpperCase() + key.slice(1);
}
//capitalize first letter and remove underscore
const setTitleValue = (key) => {
    return capitalizeFirstLetter(key).replace("_", " ");
}

//set date
const setTradeDate = (obj, key, value) => {

    let date = getTradeDate(Number(value));
    obj[key] = date.toLocaleDateString();
    return obj;
}
//get data to display in table accordingly to required key
const getFilteredDataByKeys = (tableData, key) => {
    let keys = getKeys(key);

    let result =
        tableData.map(item => {
            let obj = {};

            keys.forEach(key => {

                if (key === "timestamp") {
                    obj = setTradeDate(obj, key, item[key]);
                    return;
                }
                if (item.hasOwnProperty(key))
                    obj[key] = item[key];
            })
            return obj;
        });

    return result;
}
const setDataToLocalStorage = (data) => {
    localStorage.setItem("MarketTableDatabase", JSON.stringify(data));
}
const getDataFromLocalStorage = () => {
    let db = JSON.parse(localStorage.getItem("MarketTableDatabase") || "[]");
    return db;
}
export default function utils() {
    return {
        getKeys,
        getTradeDate,
        setTradeDate,
        capitalizeFirstLetter,
        setTitleValue,
        getFilteredDataByKeys,
        setDataToLocalStorage,
        getDataFromLocalStorage
    };
}