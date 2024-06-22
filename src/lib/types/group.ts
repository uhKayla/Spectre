export interface Gallery {
	id: string;
	name: string;
	description: string;
	membersOnly: boolean;
	roleIdsToView: string[];
	roleIdsToSubmit: string[];
	roleIdsToAutoApprove: string[];
	roleIdsToManage: string[];
	createdAt: string;
	updatedAt: string;
}

export interface MyMember {
	id: string;
	groupId: string;
	userId: string;
	roleIds: string[];
	managerNotes: string;
	membershipStatus: string;
	isSubscribedToAnnouncements: boolean;
	visibility: string;
	isRepresenting: boolean;
	joinedAt: string;
	bannedAt: string;
	has2FA: boolean;
	permissions: string[];
}

export interface Role {
	id: string;
	groupId: string;
	name: string;
	description: string;
	isSelfAssignable: boolean;
	permissions: string[];
	isManagementRole: boolean;
	requiresTwoFactor: boolean;
	requiresPurchase: boolean;
	order: number;
	createdAt: string;
	updatedAt: string;
}

export interface GroupData {
	id: string;
	name: string;
	shortCode: string;
	discriminator: string;
	description: string;
	iconUrl: string;
	bannerUrl: string;
	privacy: string;
	ownerId: string;
	rules: string;
	links: string[];
	languages: string[];
	iconId: string;
	bannerId: string;
	memberCount: number;
	memberCountSyncedAt: string;
	isVerified: boolean;
	joinState: string;
	tags: string[];
	galleries: Gallery[];
	createdAt: string;
	onlineMemberCount: number;
	membershipStatus: string;
	myMember: MyMember;
	roles: Role[];
}
