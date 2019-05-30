<template>
  <nuxt />
</template>

<style>
html {
  font-family: 'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

body {
  background-color: #f0f0f0;
  font-size: calc(16px + (32 - 16) * ((100vw - 300px) / (1600 - 300)));
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

a:link, a:visited, a:hover, a:active {
  color: currentColor;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
}

[role="button"] {
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

::-webkit-scrollbar {
  display: none;
}
</style>
