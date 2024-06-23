import { get } from 'svelte/store';
import { friends } from '$lib/stores/friendsStore';
import { externalUserData } from '$lib/stores/externalUserStore';

export const getJoinableUsers = (): number => {
	const friendsData = get(friends);
	const userData = get(externalUserData);

	let joinableUsersCount = 0;

	friendsData.forEach(friend => {
		const user = userData.get(friend.id);
		if (user?.location !== "private") {
			joinableUsersCount++;
		}
	});

	return joinableUsersCount;
};
