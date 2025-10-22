interface WeatherData {
  city: string;
  temperature: number;
  conditions: string;
  humidity: number;
}

/**
 * Fetches weather data for a given city with rate limit handling.
 */
async function fetchWeather(city: string): Promise<WeatherData> {
  const url = `https://api.weather.example.com/weather?city=${city}`;
  let retries = 0;

  while (retries <= 3) {
    const response = await fetch(url);

    if (response.status === 429) {
      const delay = Math.pow(2, retries) * 1000;
      console.log(`Rate limited, retrying in ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
      retries++;
      continue;
    }

    if (response.ok) {
      const data = await response.json();
      console.log(`Fetched weather for ${city}`);
      return {
        city,
        temperature: data.temp,
        conditions: data.weather,
        humidity: data.humidity
      };
    }

    throw new Error(`Failed to fetch weather: ${response.status}`);
  }

  throw new Error('Max retries exceeded');
}

export { fetchWeather, WeatherData };
