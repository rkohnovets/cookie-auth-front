import {useEffect, useState} from "react";
import {api_https} from "../../utils/constants";

const ProtectedPage = () => {
    interface WeatherData {
        date: string,
        temperatureC: number
    }

    const [ weather, setWeather ] = useState(new Array<WeatherData>());

    useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {
            let response = await fetch(api_https + '/WeatherForecast/private_weather', {
                method: 'GET',
                credentials: 'include',
                mode: 'cors'
            });

            if(response.ok) {
                setWeather( await response.json());
            } else {
                let text = await response.text();
                alert("Code " + response.status + ", message: " + text);
            }
        }

        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);;
    }, [])

    return <div>
        <p>Protected page. Secret Weather (works with authenticated users, who have special HttpOnly cookies):</p>
        { weather.map(w => <p> in {w.date} the weather will be {w.temperatureC} in censium degree </p>) }
    </div>;
}

export default ProtectedPage;