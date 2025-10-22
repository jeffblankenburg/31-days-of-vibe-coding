type WeatherData = {
  city: string;
  temperature: number;
  conditions: string;
  humidity: number;
};

/**
 * Fetches weather data with rate limit handling.
 * @param city - City name to fetch weather for
 * @returns Weather data for the specified city
 */
async function fetchWeather(city: string): Promise<WeatherData> {
  const url = `https://api.weather.example.com/weather?city=${city}`;
  const maxRetries = 3;

  for (let i = 0; i <= maxRetries; i++) {
    console.log(`Fetching weather for ${city}, attempt ${i + 1}`);

    const response = await fetch(url);

    if (response.status === 429) {
      if (i < maxRetries) {
        const delay = Math.pow(2, i) * 1000;
        console.log(`Rate limited. Waiting ${delay}ms before retry`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      throw new Error(`Rate limit exceeded after ${maxRetries + 1} attempts`);
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Successfully fetched weather for ${city}`);

    return {
      city,
      temperature: data.temp,
      conditions: data.weather,
      humidity: data.humidity
    };
  }

  throw new Error('Failed to fetch weather data');
}

export { fetchWeather, WeatherData };
