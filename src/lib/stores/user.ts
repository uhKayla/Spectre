import { writable } from 'svelte/store';
import type { UserData } from '$lib/types/user';

export const user = writable<UserData | null>(null);
