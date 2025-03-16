<template>
    <div class="grid grid-rows-[auto_1fr] h-screen">
        <nav class="flex p-2 shadow-sm justify-between items-center">
            <h1 class="text-xl">
                Qur'an crowdsourcing
            </h1>
            <div class="flex items-center gap-2">
                <ColorToggle />
                <UProgress animation="swing" v-if="session.isPending" />
                <template v-if="session.data.value">
                    <UButton color="error" variant="subtle" loading-auto @click="signOut">Sign Out</UButton>
                </template>
                <template v-else>
                    <UButton variant="subtle" @click="navigateTo('/login')">Login</UButton>
                    <UButton variant="subtle" @click="navigateTo('/register')">Register</UButton>
                </template>
            </div>
        </nav>
        <main class="p-4">
            <slot />
        </main>
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

<style scoped></style>