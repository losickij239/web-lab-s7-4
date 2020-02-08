import React, {Component} from 'react';
import DetailedInfo from "./DetailedInfo";

class BigInfo extends Component {
    state = {
        isLoaded: false,
        connectionProblems: false
    };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(this.setPosition, this.setFail);
    }

    setPosition = (position) => {
        this.setState({isLoaded: false});
        this.getWeather(position.coords.latitude, position.coords.longitude);
    };

    setFail = () => {
        this.setState({isLoaded: false});
        this.setState({connectionProblems: true});

        this.getWeather(59.937500, 30.308611);
    };

    getWeather = async (lat, lon) => {
        await this.setState({isLoaded: false, connectProblems: false});

        fetch('http://localhost:3001/weather/coordinates/?lat=' + lat + '&lon=' + lon)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((response) => {
                this.setState(
                    {
                        serverInfo: response,
                        isLoaded: true,
                        connectionProblems: false
                    })
            })
            .catch(() => {
                    this.setState(
                        {
                            connectionProblems: true
                        })
                }
            );
    };

    render() {
        const loadMsg = (
            <div>
                <h2>Происходит загрузка, подождите</h2>
            </div>
        );

        const errMsg = (
            <div>
                <h2>Ошибка, перезагрузите страницу</h2>
            </div>
        );

        if (this.state.connectProblems) {
            return (
                <div className="alert alert-danger">Произошла ошибка при попытке получить данные
                    <button onClick={() => navigator.geolocation.getCurrentPosition(this.setPosition, this.setFail)}
                            className="btn ml-auto">Повторить попытку получить данные
                    </button>
                </div>
            )
        }

        if (this.state.isLoaded) {
            const icon = this.state.serverInfo.weather[0].icon;
            const temp = this.state.serverInfo.main.temp;
            return (
                <div className="row">
                    <div className="col">
                        {this.state.problems ? errMsg : ''}
                        <h2>{this.state.serverInfo.name}</h2>
                        <div className="row">
                            <div className="col">
                                <img alt="icon" src={'https://openweathermap.org/img/wn/' + icon + '@2x.png'}/>
                            </div>
                            <div className="col">
                                <p style={{'fontSize': '3.9vw'}}>{temp}˚C </p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <DetailedInfo serverInfo={this.state.serverInfo}/>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    {loadMsg}
                </div>
            )
        }
    };

}

export default BigInfo