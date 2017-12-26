<template>
  <div id="app">
    <h-header></h-header>
    <div class="tab">
      tab
    </div>
    <div class="content">
      content
    </div>
  </div>
</template>

<script>
  import header from 'components/header/header.vue';

  export default {
    name: 'app',
    components: {
      'hHeader': header
    }
  };
</script>

<style>
</style>
