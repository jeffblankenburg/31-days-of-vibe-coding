/**
 * Fetch weather data for a given city, handling rate limits with exponential backoff.
 *
 * @param city - The name of the city to fetch weather data for.
 * @returns A promise resolving to typed weather data.
 * @throws {Error} If the request fails or rate limit retries are exhausted.
 */

type WeatherData = {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
};

const API_KEY = process.env.WEATHER_API_KEY; // store securely in environment variables
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

async function fetchWeatherData(city: string): Promise<WeatherData> {
  const maxRetries = 3;
  const baseDelay = 1000; // 1 second
  let attempt = 0;

  while (attempt <= maxRetries) {
    const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    console.log(`[fetchWeatherData] Attempt ${attempt + 1}: Fetching weather for "${city}"`);

    try {
      const response = await fetch(url);

      if (response.status === 429) {
        if (attempt < maxRetries) {
          const delay = baseDelay * Math.pow(2, attempt); // exponential backoff: 1s, 2s, 4s
          console.warn(`[fetchWeatherData] Rate limited (HTTP 429). Retrying in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          attempt++;
          continue;
        } else {
          throw new Error(`Rate limit exceeded for "${city}" after ${maxRetries} retries.`);
        }
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      // Map API data to our typed structure
      const weatherData: WeatherData = {
        city: data.name,
        temperature: data.main.temp,
        description: data.weather?.[0]?.description || "No description",
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      };

      console.log(`[fetchWeatherData] Successfully fetched weather for "${city}".`);
      return weatherData;
    } catch (error) {
      console.error(`[fetchWeatherData] Error on attempt ${attempt + 1}:`, error);
      if (attempt >= maxRetries) {
        throw new Error(`Failed to fetch weather data for "${city}": ${String(error)}`);
      }
      // retry after exponential delay
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
      attempt++;
    }
  }

  // This should be unreachable, but TypeScript requires a return
  throw new Error(`Unexpected failure fetching weather for "${city}".`);
}
