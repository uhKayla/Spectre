import { writable } from 'svelte/store';
import type { InstanceData } from '$lib/types/instance';

export const instanceDataStore = writable<Map<string, InstanceData>>(new Map());
