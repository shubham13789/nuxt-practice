<script setup lang="ts">
import type { LocaleObject } from '@nuxtjs/i18n';
import { useI18n} from 'vue-i18n';

const { locales, locale } = useI18n();
const languages = ref(locales.value as LocaleObject[]);
const switchLocalePath = useSwitchLocalePath();
</script>

<template>
  <div>
    <span
      v-for="(localeOption, index) in languages"
      :key="localeOption.code"
      :class="[
        locale === localeOption.code ? 'pointer-events-none font-bold' : 'cursor-pointer']"
    >
      <NuxtLink :to="switchLocalePath(localeOption.code)">
        {{ localeOption.code.toUpperCase() }}
      </NuxtLink>
      <span v-if="index < languages.length - 1" class="text-neutral-variant4"> /</span>
    </span>
  </div>
</template>

