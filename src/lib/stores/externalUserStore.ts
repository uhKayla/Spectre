import { writable } from 'svelte/store';
import type { ExternalUserData } from '$lib/types/externalUser';

export const externalUserData = writable<Map<string, ExternalUserData>>(new Map());
