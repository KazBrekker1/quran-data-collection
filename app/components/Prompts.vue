<template>
    <main class="flex flex-col w-full max-w-5xl gap-4 mx-auto mt-20">
        <UAlert v-if="viable_prompts.length === 0" title="No more prompts"
            description="You have submitted all the available prompts" color="success" variant="subtle" />
        <PromptInput v-else :prompt="current_prompt" :key="current_prompt.id"
            @handle-done-recording="handle_done_recording" @skip-prompt="skip_prompt" />
    </main>
</template>

<script setup lang="ts">
import prompts from "~~/public/quran_prompts.json"

const recorded_prompts: { id: string, blob: Blob, prompt: Prompt, audio_url: string }[] = []

const viable_prompts = computed(() => {
    return prompts.filter((prompt) => !recorded_prompts.some((p) => p.id === prompt.id))
})
const current_prompt = ref<Prompt>(viable_prompts.value[0] as Prompt)

const skip_prompt = () => {
    current_prompt.value = viable_prompts.value[Math.floor(Math.random() * viable_prompts.value.length)] as Prompt
}

const handle_done_recording = (id: string, blob: Blob) => {
    recorded_prompts.push({ id, blob, prompt: current_prompt.value, audio_url: URL.createObjectURL(blob) })
    skip_prompt()
}
</script>