
// Basic Project Configuration
// see  the docs for more info: https://docs.basic.tech
export const config = {
	name: "loca-chat",
	project_id: "ffc3d25c-10c1-49d8-a84b-a0a6bf742a66"
};

export const schema = {
	"project_id": "ffc3d25c-10c1-49d8-a84b-a0a6bf742a66",
	"version": 1,
	"tables": {
		"messages": {
			"type": "collection",
			"fields": {
				"role": {
					"type": "string"
				},
				"content": {
					"type": "string"
				},
				"chat_id": {
					"type": "string"
				},
				"created_at": {
					"type": "string"
				}
			}
		},
		"chats": {
			"type": "collection",
			"fields": {
				"title": {
					"type": "string"
				},
				"created_at": {
					"type": "string"
				}
			}
		}
	}
}
	;
