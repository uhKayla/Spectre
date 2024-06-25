import { writable } from 'svelte/store';
import type { WorldSearchData } from '$lib/types/worldSearch';

export const worldSearchStore = writable<Map<string, WorldSearchData>>(new Map());