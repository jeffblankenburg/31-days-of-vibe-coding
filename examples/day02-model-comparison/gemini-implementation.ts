interface WeatherData {
  city: string;
  temperature: number;
  conditions: string;
  humidity: number;
}

interface RetryConfig {
  maxRetries: number;
  baseDelayMs: number;
}

/**
 * Fetches weather data for a city with exponential backoff retry logic.
 *
 * @param city - The city name
 * @param config - Retry configuration (optional)
 * @returns Promise with weather data
 * @throws Error on failure after all retries
 */
async function fetchWeather(
  city: string,
  config: RetryConfig = { maxRetries: 3, baseDelayMs: 1000 }
): Promise<WeatherData> {
  const apiUrl = 'https://api.weather.example.com/weather';

  const makeRequest = async (attempt: number): Promise<WeatherData> => {
    const startTime = Date.now();

    try {
      console.log(JSON.stringify({
        event: 'weather_api_request',
        city,
        attempt: attempt + 1,
        maxAttempts: config.maxRetries + 1,
        timestamp: new Date().toISOString()
      }));

      const response = await fetch(`${apiUrl}?city=${encodeURIComponent(city)}`);
      const duration = Date.now() - startTime;

      if (response.status === 429) {
        console.warn(JSON.stringify({
          event: 'rate_limit_hit',
          city,
          attempt: attempt + 1,
          timestamp: new Date().toISOString()
        }));

        if (attempt < config.maxRetries) {
          const delayMs = config.baseDelayMs * Math.pow(2, attempt);
          console.log(JSON.stringify({
            event: 'retry_scheduled',
            city,
            delayMs,
            nextAttempt: attempt + 2
          }));

          await new Promise(resolve => setTimeout(resolve, delayMs));
          return makeRequest(attempt + 1);
        }

        throw new Error(`Rate limit exceeded for ${city} after ${config.maxRetries + 1} attempts`);
      }

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      console.log(JSON.stringify({
        event: 'weather_api_success',
        city,
        duration,
        attempt: attempt + 1,
        timestamp: new Date().toISOString()
      }));

      return {
        city,
        temperature: data.temp,
        conditions: data.weather,
        humidity: data.humidity
      };

    } catch (error) {
      console.error(JSON.stringify({
        event: 'weather_api_error',
        city,
        attempt: attempt + 1,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration: Date.now() - startTime,
        timestamp: new Date().toISOString()
      }));

      throw error;
    }
  };

  return makeRequest(0);
}

export { fetchWeather, WeatherData, RetryConfig };
