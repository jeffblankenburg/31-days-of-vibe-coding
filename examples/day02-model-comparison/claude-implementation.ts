interface WeatherData {
  city: string;
  temperature: number;
  conditions: string;
  humidity: number;
  timestamp: Date;
}

interface WeatherAPIResponse {
  temp: number;
  weather: string;
  humidity: number;
}

/**
 * Fetches weather data for a given city with automatic retry and rate limit handling.
 *
 * @param city - The name of the city to fetch weather for
 * @returns Promise resolving to weather data
 * @throws Error if all retries are exhausted or an unrecoverable error occurs
 */
async function fetchWeather(city: string): Promise<WeatherData> {
  const maxRetries = 3;
  const baseUrl = process.env.WEATHER_API_URL || 'https://api.weather.example.com';
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    throw new Error('WEATHER_API_KEY environment variable is required');
  }

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[fetchWeather] Requesting weather for ${city} (attempt ${attempt + 1}/${maxRetries + 1})`);

      const response = await fetch(
        `${baseUrl}/weather?city=${encodeURIComponent(city)}&key=${apiKey}`
      );

      if (response.status === 429) {
        if (attempt < maxRetries) {
          const backoffMs = Math.pow(2, attempt) * 1000;
          console.warn(
            `[fetchWeather] Rate limited for ${city}. Retrying in ${backoffMs}ms (attempt ${attempt + 1}/${maxRetries + 1})`
          );
          await new Promise(resolve => setTimeout(resolve, backoffMs));
          continue;
        } else {
          throw new Error(`Rate limit exceeded for ${city} after ${maxRetries + 1} attempts`);
        }
      }

      if (!response.ok) {
        throw new Error(
          `Weather API returned ${response.status}: ${response.statusText}`
        );
      }

      const data: WeatherAPIResponse = await response.json();

      console.log(`[fetchWeather] Successfully fetched weather for ${city}`);

      return {
        city,
        temperature: data.temp,
        conditions: data.weather,
        humidity: data.humidity,
        timestamp: new Date()
      };

    } catch (error) {
      if (attempt === maxRetries) {
        console.error(`[fetchWeather] Failed to fetch weather for ${city}:`, error);
        throw error;
      }

      // Don't retry on non-429 HTTP errors
      if (error instanceof Error && error.message.includes('Weather API returned')) {
        console.error(`[fetchWeather] Non-retryable error for ${city}:`, error);
        throw error;
      }

      // Network errors get retried
      const backoffMs = Math.pow(2, attempt) * 1000;
      console.warn(
        `[fetchWeather] Network error for ${city}. Retrying in ${backoffMs}ms:`,
        error
      );
      await new Promise(resolve => setTimeout(resolve, backoffMs));
    }
  }

  throw new Error(`Unexpected failure fetching weather for ${city}`);
}

export { fetchWeather, WeatherData };
