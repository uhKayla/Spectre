export interface InviteResponse {
	id: string;
	receiverUserId: string;
	senderUserId: string;
	type: string;
	message: string;
	details: Record<string, any>;
	created_at: string;
}
