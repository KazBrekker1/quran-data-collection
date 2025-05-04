import * as Minio from "minio";
import { auth } from "../lib/auth";

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT!,
    accessKey: process.env.MINIO_WO_USER!,
    secretKey: process.env.MINIO_WO_USER_PASSWORD!,
});

export default defineEventHandler(async (event) => {
    const form = await readFormData(event);
    const audio = form.get("audio") as File;
    const user_email = form.get("user_email") as string;
    const prompt_id = form.get("prompt_id") as string;

    const session = await auth.api.getSession({
        headers: event.headers
    });

    if (!session?.session) {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        })
    }

    const bucket = "quran-crowdsourcing"
    const stream = await minioClient.putObject(bucket, `${user_email}/${prompt_id}.wav`, Buffer.from(await audio.arrayBuffer()), audio.size)
    return stream
});
