export interface Friend {
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
	status: "join me" | "active" | "ask me" | "busy";  // Add other statuses if there are more
	statusDescription: string;
	tags: string[];
	userIcon: string;
	location: string;
	friendKey: string;
}
