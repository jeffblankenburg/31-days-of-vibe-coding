import axios, { AxiosError } from 'axios';
import { setTimeout } from 'timers';

/**
 * Weather API client configuration.
 */
interface WeatherApiConfig {
  apiKey: string;
  baseUrl: string;
}

/**
 * Weather data returned by the API.
 */
interface WeatherData {
  city: string;
  temperature: number;
  description: string;
}

/**
 * Fetches weather data for a given city.
 *
 * @param city - The city name.
 * @param config - Weather API client configuration.
 * @returns Weather data for the city.
 */
async function fetchWeatherData(city: string, config: WeatherApiConfig): Promise<WeatherData> {
  const maxRetries = 3;
  const retryDelays = [1000, 2000, 4000]; // in milliseconds
  const url = `${config.baseUrl}?q=${city}&appid=${config.apiKey}`;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Requesting weather data for ${city}...`);
      const response = await axios.get(url);

      if (response.status === 200) {
        const weatherData: WeatherData = {
          city: response.data.name,
          temperature: response.data.main.temp,
          description: response.data.weather[0].description,
        };

        console.log(`Received weather data for ${city}.`);
        return weatherData;
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 429) {
          if (attempt < maxRetries) {
            const delay = retryDelays[attempt];
            console.log(`Rate limit exceeded. Retrying in ${delay}ms...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
          } else {
            throw new Error('Rate limit exceeded. Maximum retries reached.');
          }
        } else {
          throw new Error(`Request failed with status ${error.response.status}`);
        }
      } else if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  // This line should be unreachable, but TypeScript requires a return statement.
  throw new Error('Failed to fetch weather data');
}

// Example usage:
const config: WeatherApiConfig = {
  apiKey: 'YOUR_API_KEY',
  baseUrl: 'https://api.openweathermap.org/data/2.5/weather',
};

fetchWeatherData('London', config)
  .then((weatherData) => console.log(weatherData))
  .catch((error) => console.error(error));