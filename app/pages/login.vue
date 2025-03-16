<template>
    <UForm :schema @submit.prevent="signIn" :state class="w-full space-y-3">
        <UFormField label="Email" name="email">
            <UInput v-model="state.email" />
        </UFormField>

        <UFormField label="Password" name="password">
            <UInput v-model="state.password" />
        </UFormField>

        <UButton loading-auto type="submit">Sign In</UButton>
    </UForm>
</template>


<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import { authClient } from "~/lib/auth-client";

const schema = z.object({
    email: z.string(),
    password: z.string(),
})

type Schema = z.output<typeof schema>

const state = ref({
    email: "",
    password: "",
})

const signIn = async (event: FormSubmitEvent<Schema>) => {
    let { email, password } = event.data

    await authClient.signIn.email({
        email: email,
        password: password,
    })

    navigateTo("/")
};
</script>