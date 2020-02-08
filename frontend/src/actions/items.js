export function itemsHasErrored(city) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        city
    };
}

export function itemsFetchDataSuccess(items, city) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items: {
            city: city,
            data: items
        }
    };
}

export function itemsAddItem(item) {
    return {
        type: 'ADD_ITEM',
        item
    };
}

export function changeCityInpit(item) {
    return {
        type: 'CHANGE_INPUT',
        item
    };
}

export function deleteItem(city) {
    return {
        type: 'DELETE_ITEM',
        city
    };
}

export function loading(city) {
    return {
        type: 'IS_LOADING',
        city
    };
}

export function updateList(newList) {
    return {
        type: 'CITY_LIST_RENEWED',
        newList
    };
}

export function doDeleteItem(item) {
    return (dispatch) => {
        fetch(`http://localhost:3001/favourites`,
            {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"city": item})
            })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then(() => dispatch(deleteItem(item)))
            .catch(() => dispatch(itemsHasErrored(item)));
    };
}

export function doChangeInput(item) {
    return (dispatch) => {
        dispatch(changeCityInpit(item));
    };
}

export function doAddItem(item) {
    return (dispatch) => {
        fetch(`http://localhost:3001/favourites`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"city": item})
            })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then(() => dispatch(itemsAddItem(item)))
            .catch(() => dispatch(itemsHasErrored(item)));
    };
}

export function doUpdateList() {
    return (dispatch) => {
        fetch(`http://localhost:3001/favourites`)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response;
            })
            .then((response) => response.json())
            .then((response) => dispatch(updateList(response)))
            .catch((e) => {
                console.error(e)
            })
    };
}

export function itemsFetchData(city) {
    return (dispatch) => {
        dispatch(loading(city));
        fetch(`http://localhost:3001/weather?city=${city}`)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response;
            })
            .then((response) => response.json())
            .then((response) => dispatch(itemsFetchDataSuccess(response, city)))
            .catch(() => dispatch(itemsHasErrored(city)));
    };

}