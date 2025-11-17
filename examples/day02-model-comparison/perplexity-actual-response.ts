/**
 * Fetches weather data for a given city from an external API.
 * Implements retry logic with exponential backoff for rate limiting (HTTP 429).
 * 
 * @param city - The name of the city to fetch weather data for
 * @returns WeatherData object containing temperature, humidity, etc.
 * @throws Error if the request fails or the API returns an unexpected response
 */

type WeatherData = {
  city: string;
  temperatureC: number;
  humidity: number;
  description: string;
};

const API_BASE_URL = "https://api.open-meteo.com/v1/forecast";

/**
 * Performs a fetch with retry and exponential backoff on HTTP 429 responses.
 * Retries at 1s, 2s, and 4s intervals (max 3 retries).
 */
export async function fetchWeather(city: string): Promise<WeatherData> {
  const MAX_RETRIES = 3;
  const BACKOFF_DELAYS = [1000, 2000, 4000]; // in milliseconds
  let attempt = 0;

  while (attempt <= MAX_RETRIES) {
    try {
      console.log(`[INFO] Fetching weather for "${city}" (Attempt ${attempt + 1})`);

      const url = `${API_BASE_URL}?city=${encodeURIComponent(city)}&current_weather=true`;
      const response = await fetch(url);

      if (response.status === 429) {
        if (attempt === MAX_RETRIES) {
          throw new Error(`Rate limit reached for city "${city}" after ${MAX_RETRIES} retries.`);
        }
        const delay = BACKOFF_DELAYS[attempt];
        console.warn(`[WARN] Rate limited. Retrying after ${delay / 1000}s.`);
        await new Promise(resolve => setTimeout(resolve, delay));
        attempt++;
        continue;
      }

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: Unable to fetch weather for ${city}.`);
      }

      const data = await response.json();

      // Assuming API structure is known. Map to our WeatherData type.
      const weather: WeatherData = {
        city,
        temperatureC: data.current_weather?.temperature ?? NaN,
        humidity: data.current_weather?.humidity ?? NaN,
        description: data.current_weather?.weathercode ?? "Unknown"
      };

      console.log(`[INFO] Successfully fetched weather for "${city}".`);
      return weather;

    } catch (error: any) {
      console.error(`[ERROR] Attempt ${attempt + 1} failed: ${error.message}`);
      if (attempt === MAX_RETRIES) {
        throw new Error(`Failed to fetch weather for "${city}" after ${MAX_RETRIES + 1} attempts.`);
      }
      const delay = BACKOFF_DELAYS[attempt];
      await new Promise(resolve => setTimeout(resolve, delay));
      attempt++;
    }
  }

  throw new Error(`Unexpected error fetching weather for "${city}".`);
}
