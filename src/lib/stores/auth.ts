import { writable } from 'svelte/store';

export const isLoggedIn = writable(false);
export const username = writable('');
export const responseMessage = writable('');
export const requiresTwoFactorAuth = writable(false);
export const twoFactorCode = writable('');
export const authCookie = writable('');
export const twoFactorType = writable(''); // Add this to track the type of 2FA
