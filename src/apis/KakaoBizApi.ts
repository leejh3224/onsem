export class KakaoBizApi {
    private readonly baseURL = 'https://center-pf.kakao.com';
    private readonly channelId = '_pbRXb';

    constructor() {}

    async fetchChats(): Promise<FetchChatsResponse> {
        const chats = await fetch(
            `${this.baseURL}/api/profiles/${this.channelId}/chats/search`,
            {
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify({
                    is_blocked: false,
                    status: 'progress',
                    keyword: '',
                    labels: [],
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        return chats.json();
    }
}

export interface FetchChatsResponse {
    has_next: boolean;
    items: Chat[];
}

export interface Chat {
    assignee_id: number;
    chat_label_ids: number[];
    created_at: number;
    encoded_profile_id: string;
    id: string;
    is_blocked: boolean;
    is_done: boolean;
    is_friend: boolean;
    is_replied: boolean;
    is_starred: boolean;
    is_user_left: boolean;
    last_log_id: string;
    last_log_send_at: number;
    last_message: string;
    last_seen_log_id: string;
    name: string;
    profile_id: string;
    talk_user: {
        active: boolean;
        created_at: number;
        deactivated_at: number;
        full_profile_image_url: string;
        id: string;
        nickname: string;
        original_profile_image_url: string;
        profile_image_url: string;
        status_message: string;
        user_type: number;
        uuid: string;
    };
    unread_count: number;
    updated_at: number;
    version: number;
}
