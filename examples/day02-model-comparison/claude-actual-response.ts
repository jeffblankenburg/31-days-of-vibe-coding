// Claude's actual response to the weather API challenge
// Generated: 2025-01-23

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

  if (!city || city.trim().length === 0) {
    throw new Error('City name is required');
  }

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[fetchWeather] Requesting weather for ${city} (attempt ${attempt + 1}/${maxRetries + 1})`);

      const response = await fetch(
        `${baseUrl}/weather?city=${encodeURIComponent(city)}&key=${apiKey}`
      );

      // Handle rate limiting with exponential backoff
      if (response.status === 429) {
        if (attempt < maxRetries) {
          const backoffMs = Math.pow(2, attempt) * 1000;
          console.warn(
            `[fetchWeather] Rate limited for ${city}. Retrying in ${backoffMs}ms (attempt ${attempt + 1}/${maxRetries + 1})`
          );
          await new Promise(resolve => setTimeout(resolve, backoffMs));
          continue;
        } else {
          const error = new Error(`Rate limit exceeded for ${city} after ${maxRetries + 1} attempts`);
          console.error(`[fetchWeather] ${error.message}`);
          throw error;
        }
      }

      // Handle other HTTP errors
      if (!response.ok) {
        const error = new Error(
          `Weather API returned ${response.status}: ${response.statusText}`
        );
        console.error(`[fetchWeather] HTTP error for ${city}:`, error.message);
        throw error;
      }

      const data: WeatherAPIResponse = await response.json();

      console.log(`[fetchWeather] Successfully fetched weather for ${city}`, {
        temp: data.temp,
        conditions: data.weather
      });

      return {
        city,
        temperature: data.temp,
        conditions: data.weather,
        humidity: data.humidity,
        timestamp: new Date()
      };

    } catch (error) {
      // If we've exhausted retries, throw the error
      if (attempt === maxRetries) {
        console.error(`[fetchWeather] Failed to fetch weather for ${city} after ${maxRetries + 1} attempts:`, error);
        throw error;
      }

      // Don't retry on non-retryable HTTP errors (4xx except 429)
      if (error instanceof Error && error.message.includes('Weather API returned')) {
        const statusMatch = error.message.match(/returned (\d+)/);
        if (statusMatch) {
          const status = parseInt(statusMatch[1]);
          // Only retry on 429, 5xx, or network errors
          if (status >= 400 && status < 500 && status !== 429) {
            console.error(`[fetchWeather] Non-retryable client error for ${city}:`, error.message);
            throw error;
          }
        }
      }

      // Retry on network errors and 5xx errors
      const backoffMs = Math.pow(2, attempt) * 1000;
      console.warn(
        `[fetchWeather] Error for ${city}. Retrying in ${backoffMs}ms (attempt ${attempt + 1}/${maxRetries + 1}):`,
        error instanceof Error ? error.message : 'Unknown error'
      );
      await new Promise(resolve => setTimeout(resolve, backoffMs));
    }
  }

  // This should never be reached, but TypeScript requires it
  throw new Error(`Unexpected failure fetching weather for ${city}`);
}

export { fetchWeather, WeatherData };

// Example usage:
// const weather = await fetchWeather('Seattle');
// console.log(`Temperature in ${weather.city}: ${weather.temperature}°F`);
