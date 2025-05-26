<template>
    <div class="grid grid-rows-[auto_1fr] h-screen">
        <nav class="flex items-center justify-between p-2 m-3 shadow-sm">
            <UButton size="lg" to="/" icon="lucide:home" variant="ghost" label="Qur'an Crowdsourcing" />
            <p class="text-center text-lg font-bold">بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ</p>
            <div class="flex items-center gap-2">
                <ColorToggle />
                <template v-if="loggedIn">
                    <UButton to="/profile" color="info" icon="lucide:user" variant="outline" label="Profile" />
                    <UButton color="error" icon="lucide:log-out" variant="outline" loading-auto @click="signOut">
                        Sign Out
                    </UButton>
                </template>
                <template v-else>
                    <UButton variant="outline" @click="navigateTo('/login')">Login</UButton>
                    <UButton variant="outline" @click="navigateTo('/register')">Register</UButton>
                </template>
            </div>
        </nav>
        <main class="p-4">
            <slot />
        </main>
    </div>
</template>

<script setup lang="ts">
const { loggedIn, client } = useAuth()

const signOut = async () => {
    await client.signOut();
    await navigateTo("/login");
};
</script>