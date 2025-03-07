
<script lang="ts" setup>
import LanguageSwitcher from '../component/LanguageSwitcher.vue';
import AirQuality from '../component/AirQuality.vue';
</script>

<template>
    <LanguageSwitcher/>
    <main class="page-wrap">
      <slot />
    </main>

    <div style="padding-top: 200px">
        <AirQuality/>
    </div>
  </template>