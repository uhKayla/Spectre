import { user } from '$lib/stores/user'
import { get } from 'svelte/store';

export const checkUserStatus = async () : Promise<boolean> => {
	const userData = get(user);
	if (userData){
		const state = userData.state;
		const status = userData.status;

		console.log("State: " + state);
		console.log("Status: " + status);

		if (state !== "offline"){
			return true;
		}
		else return false;
	}
	else return false;
}