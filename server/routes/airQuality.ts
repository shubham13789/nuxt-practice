export default defineEventHandler(async (event) => {
  // Ensure query params are properly typed
  const query = getQuery<{ city?: string; country?: string }>(event);
  const city = query.city;
  const country = query.country;

  if (!city || !country) {
    throw createError({ statusCode: 400, message: "City and country are required." });
  }

  const geocodeApiKey = process.env.API_TOKEN;
  const airQualityApiKey = process.env.API_TOKEN;

  if (!geocodeApiKey || !airQualityApiKey) {
    throw createError({ statusCode: 500, message: "API keys are missing in environment variables." });
  }

  try {
    const geoResponse: { lat: number; lon: number }[] = await $fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${geocodeApiKey}`
    );
    console.log('response',geoResponse);

    if (!geoResponse.length) {
      throw createError({ statusCode: 404, message: "Location not found." });
    }

    const { lat, lon } = geoResponse[0];

    const airQualityResponse: { list: { main: { aqi: number }; components: Record<string, number> }[] } =
      await $fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${airQualityApiKey}`
      );

    return { success: true, data: airQualityResponse };
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw createError({ statusCode: 500, message: "Failed to fetch data." });
  }
});
