import React from 'react'
import InfoElement from "./InfoElement";

export default function DetailedInfo({serverInfo}) {

    const data = [
        {
            type: 'Температура',
            value: serverInfo.main.temp + ' ˚C'
        },
        {
            type: 'Скорость ветра',
            value: serverInfo.wind.speed + ' м/с'
        },
        {
            type: 'Состояние неба',
            value: serverInfo.weather[0].description
        },
        {
            type: 'Давление',
            value: serverInfo.main.pressure + ' КПа'
        },
        {
            type: 'Влажность',
            value: serverInfo.main.humidity + ' %'
        }
    ];

    const detailedData = data.map(data =>
        <li key={data.type}><InfoElement data={data}/></li>
    );

    return (
        <ul className="weather-list__li">
            {detailedData}
        </ul>
    );
}