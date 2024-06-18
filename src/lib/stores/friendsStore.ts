import { writable } from 'svelte/store';
import type { Friend } from '$lib/types/friend';

export const friends = writable<Friend[]>([]);
