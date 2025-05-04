import * as Minio from "minio";
import { auth } from "../lib/auth";

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT!,
    accessKey: process.env.MINIO_RO_USER!,
    secretKey: process.env.MINIO_RO_USER_PASSWORD!,
});

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const user_email = query.user_email as string

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
    const stream = minioClient.listObjectsV2(bucket, `${user_email}/`, true, "")
    const objects: Minio.BucketItem[] = []

    stream.on("data", (obj) => {
        objects.push(obj)
    })

    await new Promise((resolve) => {
        stream.on("close", () => {
            resolve(objects)
        })
    })

    return objects
});
