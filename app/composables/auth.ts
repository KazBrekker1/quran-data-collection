import { defu } from 'defu'
import type { RouteLocationRaw } from 'vue-router'
import { createAuthClient } from 'better-auth/client'
import { passkeyClient } from 'better-auth/client/plugins'
import { inferAdditionalFields } from 'better-auth/client/plugins'

interface RuntimeAuthConfig {
    redirectUserTo: RouteLocationRaw | string
    redirectGuestTo: RouteLocationRaw | string
}

export function useAuth() {
    const url = useRequestURL()
    const headers = import.meta.server ? useRequestHeaders() : undefined

    const client = createAuthClient({
        baseURL: url.origin,
        fetchOptions: {
            headers,
        },
        plugins: [
            passkeyClient(),
            inferAdditionalFields({
                user: {
                    ...AuthAdditionalFields
                }
            })
        ],
    })

    const options = defu(useRuntimeConfig().public.auth as Partial<RuntimeAuthConfig>, {
        redirectUserTo: '/',
        redirectGuestTo: '/',
    })
    const user = useState<typeof client.$Infer.Session.user | null>('auth:user', () => null)
    const session = useState<typeof client.$Infer.Session.session | null>('auth:session', () => null)
    const sessionFetching = import.meta.server ? ref(false) : useState('auth:sessionFetching', () => false)

    const fetchSession = async () => {
        if (sessionFetching.value) {
            console.log('already fetching session')
            return
        }
        sessionFetching.value = true
        const { data } = await client.getSession({
            fetchOptions: {
                headers,
            },
        })
        session.value = data?.session || null
        user.value = data?.user || null
        sessionFetching.value = false
        return data
    }

    if (import.meta.client) {
        client.$store.listen('$sessionSignal', async (signal) => {
            if (!signal) return
            await fetchSession()
        })
    }

    return {
        session,
        user,
        loggedIn: computed(() => !!session.value),
        options,
        fetchSession,
        client,
        loading: sessionFetching,
    }
}