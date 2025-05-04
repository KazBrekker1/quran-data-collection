export type SubmissionData = {
    id: string
    promptId: string
    userId: string
    createdAt: string
    audioUrl: string
}

export type Prompt = {
    id: number
    sentence: string
    before: string
    target_letter: string
    after: string
    instruction: string
}
