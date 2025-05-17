<template>
    <UForm :schema @submit.prevent="signIn" :state
        class="w-full gap-5 bg-primary-900/10 p-12 rounded-lg shadow-md max-w-4xl mx-auto flex flex-col">
        <h1 class="text-2xl font-bold mb-3">Login</h1>

        <UFormField label="Email" name="email" required>
            <UInput v-model="state.email" class="w-full" />
        </UFormField>

        <UFormField label="Password" name="password" required>
            <div class="flex items-center gap-2 w-full">
                <UInput v-model="state.password" class="w-full" :type="passwordType" />
                <UButton @click="passwordType = passwordType === 'password' ? 'text' : 'password'" color="neutral"
                    variant="ghost" :icon="passwordType === 'password' ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'" />
            </div>
        </UFormField>

        <USeparator orientation="horizontal" />
        <div class="flex justify-between items-center">
            <NuxtLink to="/register" class="text-sm text-primary-500 hover:underline">
                Don't have an account? Sign up
            </NuxtLink>
            <UButton loading-auto type="submit">Sign In</UButton>
        </div>
    </UForm>
</template>


<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const passwordType = ref<"password" | "text">("password")

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

type Schema = z.output<typeof schema>

const state = ref({
    email: "",
    password: "",
})

const { client } = useAuth()

const signIn = async (event: FormSubmitEvent<Schema>) => {
    let { email, password } = event.data

    const response = await client.signIn.email({
        email: email,
        password: password,
    })

    if (response.error) {
        console.error(response.error)
    }

    await navigateTo("/")
};
</script>