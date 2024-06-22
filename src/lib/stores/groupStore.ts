import { writable } from 'svelte/store';
import type { GroupData } from '$lib/types/group';

export const groupDataStore = writable<Map<string, GroupData>>(new Map());
