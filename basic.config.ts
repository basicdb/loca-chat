export const schema = {
	"tables": {
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
		},
		"todos": {
			"type": "collection",
			"fields": {
				"title": {
					"type": "string",
					"indexed": true
				},
				"dueDate": {
					"type": "string",
					"indexed": true
				},
				"priority": {
					"type": "string",
					"indexed": true
				},
				"completed": {
					"type": "boolean",
					"indexed": true
				},
				"description": {
					"type": "string",
					"indexed": true
				}
			},
			"origin": {
				"type": "reference",
				"table": "todos",
				"project_id": "9412a48d-ea6d-4ed0-b8d4-924364324d4f"
			}
		},
		"messages": {
			"type": "collection",
			"fields": {
				"role": {
					"type": "string"
				},
				"chat_id": {
					"type": "string"
				},
				"content": {
					"type": "string"
				},
				"created_at": {
					"type": "string"
				}
			}
		}
	},
	"version": 3,
	"project_id": "444f64d1-a385-44c1-8bad-d7298ec465d2"
}