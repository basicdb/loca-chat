
// Basic Project Configuration
// see  the docs for more info: https://docs.basic.tech
export const config = {
	name: "loca-chat",
	project_id: "ffc3d25c-10c1-49d8-a84b-a0a6bf742a66"
};

export const schema = {
		"project_id": "ffc3d25c-10c1-49d8-a84b-a0a6bf742a66",
		"tables": {
			"chats": {
				"fields": {
					"created_at": {
						"type": "string"
					},
					"title": {
						"type": "string"
					}
				},
				"type": "collection"
			},
			"messages": {
				"fields": {
					"chat_id": {
						"type": "string"
					},
					"content": {
						"type": "string"
					},
					"created_at": {
						"type": "string"
					},
					"role": {
						"type": "string"
					}
				},
				"type": "collection"
			},
			"notes": {
				"description": "notes table",
				"fields": {
					"text": {
						"description": "main text value",
						"type": "string"
					}
				},
				"origin": {
					"project_id": "bc1f568d-62f5-437f-af3a-398d90db58e6",
					"table": "notes",
					"type": "reference"
				},
				"type": "collection"
			},
			"tasks": {
				"fields": {
					"completed": {
						"type": "boolean"
					},
					"description": {
						"type": "string"
					},
					"name": {
						"type": "string"
					}
				},
				"name": "tasks",
				"origin": {
					"project_id": "701b11bc-59a8-45b5-8148-7184d7733e5b",
					"table": "tasks",
					"type": "reference"
				},
				"type": "collection"
			}
		},
		"version": 2
	}
	;
