<template>
    <div
      v-editable="blok"
      v-if="blok"
    >
    <p class="text-2xl font-bold pb-2 text-red-500">Below data is from story blok</p>
    <h1 class="text-2xl font-bold">{{ blok.headline }}</h1>
    </div>
  </template>
   
  <script lang="ts" setup>
  defineProps({ blok: Object })
  import { useI18n } from 'vue-i18n';

const { locales, locale } = useI18n();
watch(
  () => locale.value,
  () => {
    console.log('Locale changed to', locale.value);
  })
  </script>