/**
 * Represents the weather data structure returned by the API
 */
interface WeatherData {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    wind_dir: string;
    pressure_mb: number;
    feelslike_c: number;
    feelslike_f: number;
  };
}

/**
 * Custom error class for weather API errors
 */
class WeatherAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public retryCount?: number
  ) {
    super(message);
    this.name = 'WeatherAPIError';
  }
}

/**
 * Configuration for the weather API client
 */
interface WeatherAPIConfig {
  baseURL: string;
  apiKey: string;
  maxRetries: number;
  retryDelays: number[];
}

/**
 * Fetches weather data for a given city from a weather API
 * @param cityName - The name of the city to get weather data for
 * @param config - Configuration object for API settings
 * @returns Promise resolving to WeatherData
 * @throws {WeatherAPIError} When the request fails after all retries or for non-retryable errors
 * 
 * @example
 * ```typescript
 * const config = {
 *   baseURL: 'https://api.weatherapi.com/v1',
 *   apiKey: 'your-api-key',
 *   maxRetries: 3,
 *   retryDelays: [1000, 2000, 4000]
 * };
 * 
 * try {
 *   const weather = await fetchWeatherData('London', config);
 *   console.log(`Temperature: ${weather.current.temp_c}°C`);
 * } catch (error) {
 *   console.error('Failed to fetch weather:', error.message);
 * }
 * ```
 */
async function fetchWeatherData(
  cityName: string,
  config: WeatherAPIConfig
): Promise<WeatherData> {
  const { baseURL, apiKey, maxRetries, retryDelays } = config;
  
  // Validate input
  if (!cityName?.trim()) {
    throw new WeatherAPIError('City name is required and cannot be empty');
  }
  
  if (!apiKey) {
    throw new WeatherAPIError('API key is required');
  }

  const endpoint = `${baseURL}/current.json`;
  const params = new URLSearchParams({
    key: apiKey,
    q: cityName.trim(),
  });

  const url = `${endpoint}?${params.toString()}`;

  console.log(`[WEATHER_API] Fetching weather data for city: "${cityName}"`);

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'WeatherApp/1.0',
        },
      });

      console.log(`[WEATHER_API] Request completed - Status: ${response.status}, Attempt: ${attempt + 1}/${maxRetries + 1}`);

      if (response.ok) {
        const data = await response.json() as WeatherData;
        console.log(`[WEATHER_API] Successfully fetched weather data for "${cityName}"`);
        return data;
      }

      // Handle rate limiting (HTTP 429)
      if (response.status === 429) {
        if (attempt < maxRetries) {
          const delayMs = retryDelays[attempt];
          console.warn(`[WEATHER_API] Rate limited. Retrying in ${delayMs}ms (Attempt ${attempt + 1}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, delayMs));
          continue;
        } else {
          throw new WeatherAPIError(
            `Rate limit exceeded after ${maxRetries} retries. Please try again later.`,
            429,
            attempt
          );
        }
      }

      // Handle other HTTP errors
      if (response.status >= 400 && response.status < 500) {
        const errorData = await response.text();
        let errorMessage = `API request failed with status ${response.status}`;
        
        try {
          const jsonError = JSON.parse(errorData);
          errorMessage = jsonError.error?.message || errorMessage;
        } catch {
          // If we can't parse JSON, use the raw text or default message
          errorMessage = errorData || errorMessage;
        }

        throw new WeatherAPIError(
          `Client error: ${errorMessage}`,
          response.status,
          attempt
        );
      }

      // Handle server errors (retryable)
      if (response.status >= 500) {
        if (attempt < maxRetries) {
          const delayMs = retryDelays[attempt];
          console.warn(`[WEATHER_API] Server error ${response.status}. Retrying in ${delayMs}ms (Attempt ${attempt + 1}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, delayMs));
          continue;
        } else {
          throw new WeatherAPIError(
            `Server error ${response.status} after ${maxRetries} retries`,
            response.status,
            attempt
          );
        }
      }

      // For other status codes, throw generic error
      throw new WeatherAPIError(
        `Unexpected response status: ${response.status}`,
        response.status,
        attempt
      );

    } catch (error) {
      lastError = error as Error;

      // If it's our custom error, re-throw it
      if (error instanceof WeatherAPIError) {
        throw error;
      }

      // Handle network errors (retryable)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        if (attempt < maxRetries) {
          const delayMs = retryDelays[attempt];
          console.warn(`[WEATHER_API] Network error: ${error.message}. Retrying in ${delayMs}ms (Attempt ${attempt + 1}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, delayMs));
          continue;
        } else {
          throw new WeatherAPIError(
            `Network error after ${maxRetries} retries: ${error.message}`,
            undefined,
            attempt
          );
        }
      }

      // For other unexpected errors, re-throw immediately
      throw new WeatherAPIError(
        `Unexpected error: ${error instanceof Error ? error.message : String(error)}`,
        undefined,
        attempt
      );
    }
  }

  // This should only be reached if all retries failed for retryable errors
  throw lastError || new WeatherAPIError(`Failed to fetch weather data after ${maxRetries} retries`);
}

// Example usage and default configuration
/**
 * Default configuration for WeatherAPI.com
 * You'll need to sign up for an API key at https://www.weatherapi.com/
 */
const DEFAULT_CONFIG: WeatherAPIConfig = {
  baseURL: 'https://api.weatherapi.com/v1',
  apiKey: process.env.WEATHER_API_KEY || 'your-api-key-here',
  maxRetries: 3,
  retryDelays: [1000, 2000, 4000], // 1s, 2s, 4s
};

/**
 * Convenience function using default configuration
 * @param cityName - The name of the city to get weather data for
 * @returns Promise resolving to WeatherData
 */
async function getWeather(cityName: string): Promise<WeatherData> {
  return fetchWeatherData(cityName, DEFAULT_CONFIG);
}

// Export types and functions
export {
  fetchWeatherData,
  getWeather,
  WeatherAPIError,
  type WeatherData,
  type WeatherAPIConfig,
};