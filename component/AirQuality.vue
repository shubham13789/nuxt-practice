<script lang="ts" setup>
import { ref } from "vue";

interface AirQualityData {
  list: {
    main: { aqi: number };
    components: {
      pm2_5: number;
      pm10: number;
    };
  }[];
}

const city = ref<string>("");
const displayCity = ref<string>("");
const country = ref<string>("");
const airQuality = ref<AirQualityData | null>(null);
const error = ref<string | null>(null);

const fetchAirQuality = async () => {
  if (!city.value || !country.value) {
    alert("Please enter both city and country.");
    return;
  }

  error.value = null;
  airQuality.value = null;

  try {
    const {data: response} = await $fetch<{data:AirQualityData}>("/airQuality", {
      params: { city: city.value, country: country.value },
    });
    airQuality.value = response;
    displayCity.value = city.value;
  } catch (err) {
    error.value = (err as Error).message || "Failed to fetch air quality data.";
  }
};
</script>

<template>
  <div class="flex flex-col items-center p-4">
    <h1 class="text-2xl font-bold mb-4 text-red-500">{{ $t("air_quality_title") }}</h1>

    <div class="mb-4">
      <input v-model="city" type="text" placeholder="City" class="border p-2 mr-2" />
      <input v-model="country" type="text" placeholder="Country" class="border p-2" />
      <button @click="fetchAirQuality" class="bg-blue-500 text-white p-2 ml-2 rounded">Check</button>
    </div>

    <div v-if="error" class="text-red-500">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="airQuality" class="flex justify-center">
      <div class="bg-white shadow-md rounded-2xl p-6 max-w-sm w-full flex flex-col items-center border border-gray-200">
        <h2 class="text-lg font-semibold mb-2">{{ displayCity }} Air Quality</h2>
        <div
          class="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full w-24 h-24 flex items-center justify-center text-2xl font-bold mb-4"
        >
          {{ airQuality.list[0].main.aqi }}
        </div>
        <p class="text-gray-600">Air Quality Index (AQI)</p>
        <div class="mt-4">
          <p class="text-sm">PM2.5: <span class="font-medium">{{ airQuality.list[0].components.pm2_5 }} µg/m³</span></p>
          <p class="text-sm">PM10: <span class="font-medium">{{ airQuality.list[0].components.pm10 }} µg/m³</span></p>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Enter city and country to get air quality data.</p>
    </div>
  </div>
</template>

