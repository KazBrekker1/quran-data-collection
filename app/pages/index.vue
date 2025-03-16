<template>
  <div class="flex flex-col gap-4 h-screen">
    <UProgress animation="swing" v-if="session.isPending" />
    <template v-if="session.data">
      <UButton loading-auto @click="signOut">Sign Out</UButton>
    </template>
    <pre>{{ session.data }}</pre>
    <pre>{{ session.error }}</pre>
  </div>
</template>


<script setup lang="ts">
import { authClient } from "~/lib/auth-client";

const session = await authClient.useSession(useFetch)

const signOut = async () => {
  await authClient.signOut();
  await navigateTo("/login");
};
</script>