import { writable } from 'svelte/store';
import type { World } from '$lib/types/world';

export const locations = writable<{ [locationId: string]: World }>({});
