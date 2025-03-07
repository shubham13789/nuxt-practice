<script setup>
useHead({
  link: [
    {
      rel: 'manifest',
      href: '/manifest.webmanifest',
    },
  ],
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>