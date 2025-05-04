<template>
    <main class="flex flex-col w-full max-w-5xl gap-4 mx-auto mt-20">
        <UAlert v-if="viable_prompts.length === 0" title="No more prompts"
            description="You have submitted all the available prompts" color="success" variant="subtle" />
        <PromptInput v-else v-if="status === 'success'" :prompt="current_prompt" :key="current_prompt.id"
            @skip-prompt="skip_prompt" />
        <UProgress v-if="status === 'pending'" animation="swing" />
    </main>
</template>

<script setup lang="ts">
import prompts from "~~/public/quran_prompts.json"

const { user } = useAuth()

const { data: previous_records, status } = useAsyncData(
    "previous_records",
    () => $fetch("/api/submissions", {
        query: {
            user_email: user.value?.email
        }
    }), {
    transform: (prompts) => {
        return prompts.map((prompt) => {
            if (!('name' in prompt)) return null;
            const stringId = prompt.name.split("/").pop()?.split(".")[0]
            if (!stringId) return null;
            return {
                id: parseInt(stringId),
            }
        })
    },
})

const current_prompt_index = ref<number>(0)

const viable_prompts = computed(() => {
    return prompts.filter((prompt) => !previous_records.value?.some((p) => p?.id === prompt.id))
})

const current_prompt = computed(() => {
    return viable_prompts.value[current_prompt_index.value] as Prompt
})

const skip_prompt = () => {
    current_prompt_index.value = Math.floor(Math.random() * viable_prompts.value.length)
}
</script>