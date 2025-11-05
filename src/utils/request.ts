import { CeloraError } from '../errors';

export async function request<T>(
    url: string,
    method: 'GET' | 'POST',
    headers: Record<string, string>,
    body?: object
): Promise<T> {
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    };

    if (body) options.body = JSON.stringify(body);

    const response = await fetch(url, options);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new CeloraError(data.message || 'API request failed', response.status);
    }

    return data as T;
}
