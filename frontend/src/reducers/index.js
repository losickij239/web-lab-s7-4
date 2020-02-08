import { combineReducers } from 'redux';
import { items, newCityValue, errorHandler } from './items';

export default combineReducers({
    items,
    newCityValue,
    errorHandler
});