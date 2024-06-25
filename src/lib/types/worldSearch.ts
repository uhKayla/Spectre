export interface UnityPackage {
	platform: string;
	unityVersion: string;
}

export interface WorldSearchData {
	authorId: string;
	authorName: string;
	capacity: number;
	recommendedCapacity: number;
	created_at: string;
	favorites: number;
	visits: number;
	heat: number;
	id: string;
	imageUrl: string;
	labsPublicationDate: string;
	name: string;
	occupants: number;
	organization: string;
	popularity: number;
	previewYoutubeId: string;
	publicationDate: string;
	releaseStatus: string;
	tags: string[];
	thumbnailImageUrl: string;
	unityPackages: UnityPackage[];
	updated_at: string;
	udonProducts: string[];
}