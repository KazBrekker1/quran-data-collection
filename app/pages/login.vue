<template>
    <UForm :schema @submit.prevent="signIn" :state
        class="w-full gap-5 bg-gray-50 p-12 rounded-lg shadow-md max-w-4xl mx-auto flex flex-col">
        <h1 class="text-2xl font-bold mb-3">Login</h1>

        <UFormField label="Email" name="email">
            <UInput v-model="state.email" class="w-full" />
        </UFormField>

        <UFormField label="Password" name="password">
            <UInput type="password" v-model="state.password" class="w-full" />
        </UFormField>

        <UButton loading-auto type="submit" class="self-end">Sign In</UButton>
    </UForm>
</template>


<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

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