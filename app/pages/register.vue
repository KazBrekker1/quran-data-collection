<template>
    <UForm :schema @submit.prevent="signUp" :state class="w-full space-y-3">
        <UFormField label="First Name" name="firstName">
            <UInput v-model="state.firstName" />
        </UFormField>

        <UFormField label="Last Name" name="lastName">
            <UInput v-model="state.lastName" />
        </UFormField>

        <UFormField label="Email" name="email">
            <UInput v-model="state.email" />
        </UFormField>

        <UFormField label="Password" name="password">
            <UInput v-model="state.password" />
        </UFormField>

        <UFormField label="Gender" name="gender">
            <USelect v-model="state.gender" :items="['male', 'female']" />
        </UFormField>

        <UFormField label="Age" name="age">
            <UInput type="number" v-model="state.age" />
        </UFormField>

        <UFormField label="Mother Country" name="motherCountry">
            <UInput v-model="state.motherCountry" />
        </UFormField>

        <UFormField label="Spoken Dialect" name="spokenDialect">
            <UInput v-model="state.spokenDialect" />
        </UFormField>
        <UButton loading-auto type="submit">Sign Up</UButton>
    </UForm>
</template>

<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const schema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    password: z.string(),
    gender: z.string(),
    age: z.number(),
    motherCountry: z.string(),
    spokenDialect: z.string(),
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

    await client.signUp.email({
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

    await navigateTo("/")
};

</script>