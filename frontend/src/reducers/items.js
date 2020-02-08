export function items(state = [], action) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS': {
            return state.map((current) => {
                return current.city === action.items.city ?
                    {
                        ...action.items,
                        isLoaded: true,
                        isErrored: false
                    }
                    : current;
            });
        }

        case 'ADD_ITEM': {
            let copy = state.slice();
            copy.push({city: action.item, data: {}, isLoaded: false, isErrored: false});
            return copy;
        }

        case 'DELETE_ITEM': {
            let index = state.findIndex(current => current.city === action.city);
            let copy = state.slice();
            copy.splice(index, 1);
            return copy;
        }

        case 'IS_LOADING': {
            return state.map((current) => {
                return current.city === action.city ?
                    {
                        ...current,
                        isLoaded: false,
                        isErrored: false
                    }
                    : current;
            });
        }

        case 'ITEMS_HAS_ERRORED': {
            return state.map((current) => {
                return current.city === action.city ?
                    {
                        ...current,
                        isErrored: true
                    }
                    : current;
            });
        }

        case 'CITY_LIST_RENEWED': {
            return action.newList.map((current) => {
                return {
                    city: current.name, data: {}, isLoaded: false, isErrored: false
                }
            });
        }

        default:
            return state;
    }
}

export function newCityValue(state = '', action) {
    switch (action.type) {
        case 'ADD_ITEM': {
            return '';
        }
        case 'CHANGE_INPUT': {
            return action.item
        }
        default:
            return state;
    }
}

export function errorHandler(state = false, action) {
    switch (action.type) {
        case 'CANNOT_ADD': {
            return true;
        }
        case 'CHANGE_INPUT': {
            return false;
        }
        default:
            return state;
    }
}