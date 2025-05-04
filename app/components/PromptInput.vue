<template>
    <section class="flex flex-col w-full gap-4">
        <div dir="rtl" class="text-4xl">
            <template v-if="prompt.before">
                <span class="text-gray-400">النص: </span>
                <span>{{ prompt.before }}</span>
                <span class="text-red-500">{{ prompt.target_letter }}</span>
                <span>{{ prompt.after }}</span>
            </template>
            <template v-else>
                <span class="text-gray-400">النص: </span>
                <span>{{ prompt.sentence }}</span>
            </template>
        </div>
        <h1 class="text-lg" dir="rtl">
            <span class="text-gray-400">التعليمات: </span>
            {{ prompt.instruction || "سجل صوتك لهذا النص" }}
        </h1>

        <UButton @click="skip_prompt" label="Skip" color="secondary" icon="lucide:rotate-cw" variant="ghost"
            class="ml-auto" />

        <Recorder v-model="is_recording" @done-recording="handleDoneRecording" />

        <USeparator label="Recordings" />

        <div v-for="(recording, index) in previous_recordings" :key="recording.id"
            class="flex justify-between w-full max-w-4xl gap-3 p-5 mx-auto shadow-md bg-gray-50 outline outline-gray-200 dark:outline-gray-700 dark:bg-gray-800">
            <audio :src="recording.audio_url" controls class="w-full" />
            <div class="flex gap-1">
                <UButton size="xs" @click="delete_recording(index)" label="Delete" color="error" variant="subtle"
                    icon="lucide:trash" />
                <UButton size="xs" loading-auto @click="handle_done_recording(recording.blob)" label="Submit"
                    color="primary" icon="lucide:check" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const props = defineProps<{
    prompt: Prompt
}>()

const emit = defineEmits<{
    "skip-prompt": [];
}>();

const { user } = useAuth()

const is_recording = ref(false)
const previous_recordings = ref<{ id: number, blob: Blob, prompt: Prompt, audio_url: string }[]>([])

const handleDoneRecording = (blob: Blob) => {
    let audio_url = URL.createObjectURL(blob)
    previous_recordings.value.push({ id: props.prompt.id, blob, prompt: props.prompt, audio_url })
}

const delete_recording = (index: number) => {
    const flag = confirm("Are you sure you want to delete this recording?")
    if (flag) {
        previous_recordings.value.splice(index, 1)
    }
}

const handle_done_recording = async (blob: Blob) => {
    const user_email = user.value?.email
    const prompt_id = props.prompt.id
    const form = new FormData()

    form.append("audio", blob)
    form.append("user_email", user_email as string)
    form.append("prompt_id", prompt_id.toString())

    await $fetch("/api/submission", {
        method: "POST",
        body: form
    })

    await refreshNuxtData("previous_records")
    skip_prompt()
}

const skip_prompt = () => {
    emit("skip-prompt")
}

</script>