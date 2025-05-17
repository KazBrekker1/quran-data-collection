<template>
    <UForm :schema @submit.prevent="signUp" :state
        class="w-full gap-5 bg-primary-900/10 p-12 rounded-lg shadow-md max-w-4xl mx-auto flex flex-col">
        <h1 class="text-2xl font-bold mb-3">Register</h1>

        <div class="flex gap-4">
            <UFormField label="First Name" name="firstName" required class="flex-1">
                <UInput v-model="state.firstName" class="w-full" />
            </UFormField>

            <UFormField label="Last Name" name="lastName" required class="flex-1">
                <UInput v-model="state.lastName" class="w-full" />
            </UFormField>
        </div>

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

        <div class="flex gap-4">
            <UFormField label="Gender" name="gender" required class="flex-1">
                <USelect v-model="state.gender" :items="['male', 'female']" class="w-full" />
            </UFormField>

            <UFormField label="Age" name="age" required class="flex-1">
                <UInput type="number" v-model="state.age" class="w-full" />
            </UFormField>
        </div>

        <UFormField label="Spoken Language" name="spokenLanguage" required>
            <USelectMenu label-key="label" v-model="state.spokenLanguage" :items="dialectOptions" class="w-full" />
        </UFormField>

        <UFormField name="consent" required>
            <div class="flex items-start gap-2">
                <UCheckbox v-model="state.consent" />
                <label class="text-sm text-gray-600">
                    I agree to the
                    <NuxtLink to="/quran_challange_consent_form.pdf" class="text-primary-500 hover:underline"
                        target="_blank">
                        consent form
                    </NuxtLink>
                    of the Quran Challenge
                </label>
            </div>
        </UFormField>
        <USeparator orientation="horizontal" />
        <div class="flex justify-between items-center">
            <NuxtLink to="/login" class="text-sm text-primary-500 hover:underline">
                Already have an account? Sign in
            </NuxtLink>
            <UButton loading-auto type="submit">Sign Up</UButton>
        </div>
    </UForm>
</template>

<script setup lang="ts">
import { z } from "zod";
import locales from '~~/public/locales.json'

import type { FormSubmitEvent } from "@nuxt/ui";

const toast = useToast()
const passwordType = ref<"password" | "text">("password")

const dialectOptions = Object.entries(locales).map(([code, [name]]) => ({
    label: name,
    value: code
})).sort((a, b) => a.label!.localeCompare(b.label!))

const schema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    gender: z.string(),
    age: z.number().min(10).max(100),
    spokenLanguage: z.object({
        label: z.string(),
        value: z.string(),
    }),
    consent: z.boolean(),
})

type Schema = z.output<typeof schema>

const state = ref({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    age: 0,
    spokenLanguage: {
        label: "",
        value: "",
    },
    consent: false,
})

const { client } = useAuth()

const signUp = async (event: FormSubmitEvent<Schema>) => {
    if (!event.data.consent) {
        toast.add({
            title: "Consent is required",
            description: "You must agree to the consent form to register",
            color: "error",
        })
        return
    }

    let firstName = event.data.firstName
    let lastName = event.data.lastName
    const name = `${firstName} ${lastName}`

    let email = event.data.email
    let gender = event.data.gender
    let age = event.data.age
    let password = event.data.password
    let spokenLanguage = event.data.spokenLanguage.label
    let spokenLanguageCode = event.data.spokenLanguage.value

    const response = await client.signUp.email({
        firstName: firstName,
        lastName: lastName,
        name: name,
        age: age,
        email: email,
        gender: gender,
        password: password,
        spokenLanguage: spokenLanguage,
        spokenLanguageCode: spokenLanguageCode,
    });

    if (response.error) {
        console.error(response.error)
    }

    await navigateTo("/")
};

</script>