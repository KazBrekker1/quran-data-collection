<template>
    <UForm :schema @submit.prevent="signUp" :state
        class="w-full gap-5 bg-gray-50 p-12 rounded-lg shadow-md max-w-4xl mx-auto flex flex-col">
        <h1 class="text-2xl font-bold mb-3">Register</h1>
        <UFormField label="First Name" name="firstName" required>
            <UInput v-model="state.firstName" class="w-full" />
        </UFormField>

        <UFormField label="Last Name" name="lastName" required>
            <UInput v-model="state.lastName" class="w-full" />
        </UFormField>

        <UFormField label="Email" name="email" required>
            <UInput v-model="state.email" class="w-full" />
        </UFormField>

        <UFormField label="Password" name="password" required>
            <UInput v-model="state.password" class="w-full" />
        </UFormField>

        <UFormField label="Gender" name="gender" required>
            <USelect v-model="state.gender" :items="['male', 'female']" class="w-full" />
        </UFormField>

        <UFormField label="Age" name="age" required>
            <UInput type="number" v-model="state.age" class="w-full" />
        </UFormField>

        <UFormField label="Mother Country" name="motherCountry" required>
            <UInput v-model="state.motherCountry" class="w-full" />
        </UFormField>

        <UFormField label="Spoken Dialect" name="spokenDialect" required>
            <UInput v-model="state.spokenDialect" class="w-full" />
        </UFormField>
        <UButton loading-auto type="submit" class="self-end">Sign Up</UButton>
    </UForm>
</template>

<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const schema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    gender: z.string(),
    age: z.number().min(10).max(100),
    motherCountry: z.string().min(1),
    spokenDialect: z.string().min(1),
})

type Schema = z.output<typeof schema>

const state = ref({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    age: 0,
    motherCountry: "",
    spokenDialect: "",
})

const { client } = useAuth()

const signUp = async (event: FormSubmitEvent<Schema>) => {
    let firstName = event.data.firstName
    let lastName = event.data.lastName
    const name = `${firstName} ${lastName}`

    let email = event.data.email
    let gender = event.data.gender
    let age = event.data.age
    let password = event.data.password

    let motherCountry = event.data.motherCountry.toLowerCase()
    let spokenDialect = event.data.spokenDialect.toLowerCase()

    const response = await client.signUp.email({
        firstName: firstName,
        lastName: lastName,
        name: name,
        age: age,
        email: email,
        gender: gender,
        password: password,
        motherCountry: motherCountry,
        spokenDialect: spokenDialect,
    });

    if (response.error) {
        console.error(response.error)
    }

    await navigateTo("/")
};

</script>