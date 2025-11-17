/**
 * ==============================================================================
 * TYPE DEFINITIONS
 * ==============================================================================
 */

/**
 * Interface representing the structure of the data returned from the mock weather API.
 */
interface WeatherApiResponse {
    city: string;
    temperature: {
        current: number; // Celsius
        high: number;
        low: number;
    };
    condition: string;
    humidity: number; // Percentage
}

/**
 * Interface representing the clean, simplified weather data returned by the main function.
 */
interface WeatherData {
    location: string;
    tempC: number;
    condition: string;
    highC: number;
    lowC: number;
}

/**
 * ==============================================================================
 * API CONFIGURATION (MOCK)
 * ==============================================================================
 */

// Placeholder constants for API interaction
const API_URL = 'https://api.mockweather.com/v1/current';
const API_KEY = 'YOUR_API_KEY_PLACEHOLDER';
const MAX_RETRIES = 3;

/**
 * ==============================================================================
 * HELPER FUNCTIONS
 * ==============================================================================
 */

/**
 * Utility to pause execution for a given number of milliseconds.
 * @param ms - The number of milliseconds to wait.
 */
function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * ==============================================================================
 * CORE FUNCTIONALITY
 * ==============================================================================
 */

/**
 * Fetches current weather data for a specified city, implementing exponential
 * backoff for rate limiting (HTTP 429) errors.
 *
 * @param city - The name of the city to fetch weather data for.
 * @returns A promise that resolves to the clean, typed WeatherData.
 * @throws An error if all fetch attempts fail, including rate limit exhaustion
 * or other permanent HTTP errors.
 */
async function fetchWeatherData(city: string): Promise<WeatherData> {
    const url = `${API_URL}?city=${encodeURIComponent(city)}&apiKey=${API_KEY}`;
    const totalAttempts = MAX_RETRIES + 1;

    console.log(`[Request] Starting fetch for city: ${city}. Total attempts allowed: ${totalAttempts}`);

    for (let attempt = 0; attempt < totalAttempts; attempt++) {
        try {
            console.log(`[Attempt ${attempt + 1}/${totalAttempts}] Fetching data...`);

            // --- 1. Make the GET request ---
            const response = await fetch(url);

            // --- 2. Handle HTTP 429 (Rate Limit) with Backoff ---
            if (response.status === 429) {
                if (attempt < MAX_RETRIES) {
                    // Exponential backoff: 1s, 2s, 4s, ...
                    const waitTimeSeconds = Math.pow(2, attempt);
                    const waitTimeMs = waitTimeSeconds * 1000;

                    console.warn(`[Retry] Rate limit hit (429). Retrying in ${waitTimeSeconds}s...`);
                    await delay(waitTimeMs);
                    continue; // Skip the rest of the loop and try again
                } else {
                    // Max retries exhausted
                    throw new Error(`[Error] Failed to fetch weather data for ${city}: Rate limit exceeded (429) after ${MAX_RETRIES} retries.`);
                }
            }

            // --- 3. Handle other non-2xx HTTP errors ---
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`[Error] HTTP Error ${response.status} for ${city}: ${errorText.substring(0, 100)}...`);
                // Throw error immediately for non-429 permanent failures
                throw new Error(`[Error] Failed to fetch weather data for ${city}. Status: ${response.status}.`);
            }

            // --- 4. Process success response ---
            const data: WeatherApiResponse = await response.json();
            console.log(`[Success] Data received and parsed successfully.`);

            // --- 5. Return typed weather data ---
            const weatherData: WeatherData = {
                location: data.city,
                tempC: data.temperature.current,
                condition: data.condition,
                highC: data.temperature.high,
                lowC: data.temperature.low,
            };
            return weatherData;

        } catch (error) {
            // Log networking or JSON parsing errors
            console.error(`[Error] Attempt ${attempt + 1} failed due to network or parsing issue:`, error);
            // If it's a network error (like CORS or connection), we treat it as a permanent failure here
            // or exit the loop if it was the last attempt.
            if (attempt === totalAttempts - 1) {
                throw new Error(`[Error] Permanently failed to fetch weather data for ${city}. Last error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
            // For network errors before 429 logic (e.g., DNS), we still wait and retry.
            // Wait for a short, constant delay to prevent rapid-fire retries on persistent network issues.
            console.warn(`[Retry] Non-429 failure. Waiting 1s before next attempt.`);
            await delay(1000);
        }
    }

    // Should theoretically be unreachable due to explicit throws inside the loop
    throw new Error(`[Fatal] Exited retry loop without result or throw.`);
}

/**
 * ==============================================================================
 * MOCK DATA AND USAGE DEMONSTRATION
 * ==============================================================================
 */

// Mock the global 'fetch' function for demonstration purposes
// This simulates the real world scenario: 2 rate limits, then success on the 3rd retry (4th attempt)
(globalThis as any).fetch = (url: string) => {
    // Determine current attempt number from a counter (simulating state)
    (globalThis as any).requestCount = (globalThis as any).requestCount || 0;
    const currentAttempt = (globalThis as any).requestCount++;

    return new Promise((resolve) => {
        // Mock data structure
        const mockSuccessData: WeatherApiResponse = {
            city: 'London',
            temperature: {
                current: 12,
                high: 15,
                low: 8,
            },
            condition: 'Cloudy with light drizzle',
            humidity: 75,
        };

        if (currentAttempt < 2) {
            // Simulate 429 Rate Limit on the first two attempts (attempt 1 and 2)
            resolve({
                ok: false,
                status: 429,
                text: async () => 'Too Many Requests',
            });
        } else {
            // Simulate success on the third attempt (attempt 3) and onwards
            resolve({
                ok: true,
                status: 200,
                json: async () => mockSuccessData,
                text: async () => JSON.stringify(mockSuccessData),
            });
        }
    });
};

// Main function to run the demonstration
async function main() {
    console.log("--- Starting Weather Fetch Demo ---");
    const city = "London";

    try {
        const weather = await fetchWeatherData(city);
        console.log("\n--- FINAL SUCCESS RESULT ---");
        console.log(`Weather in ${weather.location}:`);
        console.log(`  Current Temp: ${weather.tempC}°C`);
        console.log(`  High/Low: ${weather.highC}°C / ${weather.lowC}°C`);
        console.log(`  Condition: ${weather.condition}`);
    } catch (error) {
        console.error("\n--- FINAL FAILURE ---");
        console.error(error);
    }
}

// Execute the main function
main();
