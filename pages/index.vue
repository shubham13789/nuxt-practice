<script lang="ts" setup>
const { locale } = useI18n();

const story = ref<Object|null>(null);
const fetchStory = async () => {
  story.value = await useAsyncStoryblok('home', { version: 'draft',language: locale.value })
};

await fetchStory();
console.log(story.value);
watch(locale, fetchStory);
</script>
 
<template>
  <StoryblokComponent v-if="story.value.content " :blok="story.value.content" />
</template>