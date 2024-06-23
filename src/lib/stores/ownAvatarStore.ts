import { writable } from 'svelte/store';
import type { OwnAvatarData } from '$lib/types/ownAvatar';

export const ownAvatar = writable<OwnAvatarData | null>(null);
