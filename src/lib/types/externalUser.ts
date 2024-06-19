export interface Badge {
	badgeDescription: string;
	badgeId: string;
	badgeImageUrl: string;
	badgeName: string;
	showcased: boolean;
}

export interface Language {
	key: string;
	value: string;
}

export interface Location {
	tag: string;
	isOffline: boolean;
	isPrivate: boolean;
	isTraveling: boolean;
	worldId: string;
	instanceId: string;
	instanceName: string;
	accessType: string;
	accessTypeName: string;
	region: string;
	shortName: string;
	userId: string;
	hiddenId: string;
	privateId: string | null;
	friendsId: string | null;
	groupId: string | null;
	groupAccessType: string | null;
	canRequestInvite: boolean;
	strict: boolean;
}

export interface ExternalUserData {
	allowAvatarCopying: boolean;
	bio: string;
	bioLinks: string[];
	currentAvatarImageUrl: string;
	currentAvatarThumbnailImageUrl: string;
	date_joined: string;
	developerType: string;
	displayName: string;
	friendKey: string;
	friendRequestStatus: string;
	id: string;
	instanceId: string;
	isFriend: boolean;
	last_activity: string;
	last_login: string;
	last_mobile: string | null;
	last_platform: string;
	location: string;
	note: string;
	profilePicOverride: string;
	pronouns: string;
	state: string;
	status: string;
	statusDescription: string;
	tags: string[];
	travelingToInstance: string;
	travelingToLocation: string;
	travelingToWorld: string;
	userIcon: string;
	worldId: string;
	fallbackAvatar: string;
	$location: Location;
	$location_at: number;
	$online_for: number;
	$travelingToTime: number;
	$offline_for: string;
	$isVRCPlus: boolean;
	$isModerator: boolean;
	$isTroll: boolean;
	$isProbableTroll: boolean;
	$trustLevel: string;
	$trustClass: string;
	$userColour: string;
	$trustSortNum: number;
	$languages: Language[];
	$joinCount: number;
	$timeSpent: number;
	$lastSeen: string;
	$nickName: string;
	$previousLocation: string;
	$customTag: string;
	$customTagColour: string;
	currentAvatarTags: string[];
	imageUrl: string;
	platform: string;
	profilePicOverrideThumbnail: string;
	badges: Badge[];
}
