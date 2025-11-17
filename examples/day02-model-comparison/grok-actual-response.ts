// Define interfaces for type safety
interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    description: string;
    main: string;
  }>;
  name: string;
  dt: number;
}

interface WeatherError {
  message: string;
  code?: number;
}

/**
 * Fetches weather data for a given city with retry logic for rate limiting
 * @param city - The name of the city to fetch weather data for
 * @param apiKey - The API key for OpenWeatherMap
 * @returns Promise resolving to weather data
 * @throws WeatherError if the request fails after retries
 */
async function fetchWeather(city: string, apiKey: string): Promise<WeatherData> {
  // Logger function for consistent logging
  const log = (message: string, level: 'info' | 'error' | 'warn' = 'info') => {
    console.log(`[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}`);
  };

  // Validate input
  if (!city || !apiKey) {
    log('Missing city or API key', 'error');
    throw new Error('City and API key are required');
  }

  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  const url = `${baseUrl}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  // Retry configuration
  const maxRetries = 3;
  const baseDelayMs = 1000;

  /**
   * Attempts to fetch weather data with exponential backoff
   * @param attempt - Current retry attempt (1-based)
   */
  async function attemptFetch(attempt: number = 1): Promise<WeatherData> {
    log(`Fetching weather for ${city}, attempt ${attempt}`);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 429 && attempt <= maxRetries) {
          const delay = baseDelayMs * Math.pow(2, attempt - 1);
          log(`Rate limit hit, retrying after ${delay}ms`, 'warn');
          await new Promise(resolve => setTimeout(resolve, delay));
          return attemptFetch(attempt + 1);
        }

        const errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        log(errorMessage, 'error');
        throw new Error(errorMessage);
      }

      const data: WeatherData = await response.json();
      
      // Validate response structure
      if (!data.main || !data.weather) {
        log('Invalid weather data format', 'error');
        throw new Error('Invalid weather data format');
      }

      log(`Successfully fetched weather for ${city}`);
      return data;

    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Unknown error occurred';
      
      if (attempt <= maxRetries && errorMessage.includes('429')) {
        const delay = baseDelayMs * Math.pow(2, attempt - 1);
        log(`Rate limit error, retrying after ${delay}ms`, 'warn');
        await new Promise(resolve => setTimeout(resolve, delay));
        return attemptFetch(attempt + 1);
      }

      log(`Failed to fetch weather for ${city}: ${errorMessage}`, 'error');
      const weatherError: WeatherError = {
        message: `Failed to fetch weather data: ${errorMessage}`,
        code: error instanceof Error && 'code' in error ? (error as any).code : undefined
      };
      throw weatherError;
    }
  }

  return attemptFetch();
}

// Example usage:
/*
async function example() {
  try {
    const weather = await fetchWeather('London', 'YOUR_API_KEY');
    console.log(`Weather in ${weather.name}: ${weather.main.temp}°C, ${weather.weather[0].description}`);
  } catch (error) {
    console.error('Error:', (error as WeatherError).message);
  }
}
*/