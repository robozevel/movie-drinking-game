<template>
  <div class="result" role="button">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ResultWrapper extends Vue {
}
</script>

<style scoped>
.result {
  position: relative;
  padding: 12px;
  text-align: left;
  min-height: 60px;
  background-color: #fff;
  color: #000;
  box-sizing: border-box;
  transition: background-color .15s ease;
  font-size: 18px;
  line-height: 28px;
}

.result:hover {
  background-color: #fafafa;
}

.result:active, .result.active {
  background-color: #f0f0f0;
}
</style>
