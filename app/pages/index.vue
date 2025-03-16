<template>
  <div class="flex flex-col gap-4">
    <pre>{{ session.data }}</pre>
    <pre>{{ session.error }}</pre>
  </div>
</template>


<script setup lang="ts">
import { authClient } from "~/lib/auth-client";

const session = await authClient.useSession(useFetch)
</script>