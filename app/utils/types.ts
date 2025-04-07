export type SubmissionData = {
    id: string
    promptId: string
    userId: string
    createdAt: string
    audioUrl: string
}

export type Prompt = {
    id: string
    before: string
    target_letter: string
    after: string
    instruction: string
}