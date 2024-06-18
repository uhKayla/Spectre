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
	instances: (null | string | number)[][];
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

export interface UnityPackage {
	assetUrl: string;
	assetUrlObject: Record<string, unknown>;
	assetVersion: number;
	created_at: string;
	id: string;
	platform: string;
	pluginUrl: string;
	pluginUrlObject: Record<string, unknown>;
	unitySortNumber: number;
	unityVersion: string;
}
