<template>
  <UApp>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>


<style>
@font-face {
  font-family: "STC";
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url("/STC.ttf") format("truetype");
}

@font-face {
  font-family: "Outfit";
  font-style: normal;
  font-display: swap;
  src: url("/Outfit.ttf") format("truetype");
}

* {
  font-family: "STC", sans-serif;
}

audio::-webkit-media-controls-enclosure {
  border-radius: 0;
  padding: 0;
  margin: 0;
}
</style>
