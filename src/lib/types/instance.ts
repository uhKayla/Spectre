export interface PlatformData {
	android: number;
	standalonewindows: number;
}

export interface Tag {
	tag: string;
}

export interface Language {
	key: string;
	value: string;
}

export interface Badge {
	badgeDescription: string;
	badgeId: string;
	badgeImageUrl: string;
	badgeName: string;
	showcased: boolean;
}

export interface UnityPackage {
	assetUrl: string;
	assetUrlObject: object;
	assetVersion: number;
	created_at: string;
	id: string;
	platform: string;
	pluginUrl: string;
	pluginUrlObject: object;
	unitySortNumber: number;
	unityVersion: string;
}

export interface World {
	authorId: string;
	authorName: string;
	capacity: number;
	recommendedCapacity: number;
	created_at: string;
	description: string;
	favorites: number;
	featured: boolean;
	heat: number;
	id: string;
	imageUrl: string;
	instances: Array<Array<null>>;
	labsPublicationDate: string;
	name: string;
	namespace: string;
	occupants: number;
	organization: string;
	popularity: number;
	previewYoutubeId: string;
	privateOccupants: number;
	publicOccupants: number;
	publicationDate: string;
	releaseStatus: string;
	tags: string[];
	thumbnailImageUrl: string;
	unityPackages: UnityPackage[];
	updated_at: string;
	version: number;
	visits: number;
	udonProducts: string[];
}

export interface User {
	bio: string;
	bioLinks: string[];
	currentAvatarImageUrl: string;
	currentAvatarThumbnailImageUrl: string;
	currentAvatarTags: string[];
	developerType: string;
	displayName: string;
	fallbackAvatar: string;
	id: string;
	isFriend: boolean;
	last_platform: string;
	profilePicOverride: string;
	pronouns: string;
	status: string;
	statusDescription: string;
	tags: string[];
	userIcon: string;
	location: string;
	friendKey: string;
}

export interface InstanceData {
	active: boolean;
	canRequestInvite: boolean;
	capacity: number;
	full: boolean;
	id: string;
	instanceId: string;
	location: string;
	n_users: number;
	name: string;
	ownerId: string;
	permanent: boolean;
	photonRegion: string;
	platforms: PlatformData;
	region: string;
	secureName: string;
	shortName: string;
	tags: string[];
	type: string;
	worldId: string;
	hidden: string;
	friends: string;
	private: string;
	queueEnabled: boolean;
	queueSize: number;
	recommendedCapacity: number;
	roleRestricted: boolean;
	strict: boolean;
	userCount: number;
	world: World;
	users: User[];
	groupAccessType: string;
	hasCapacityForYou: boolean;
	nonce: string;
	closedAt: string;
	hardClose: boolean;
}
