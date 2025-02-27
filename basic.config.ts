
// Basic Project Configuration
// see  the docs for more info: https://docs.basic.tech
export const config = {
	name: "loca-chat",
	project_id: "ffc3d25c-10c1-49d8-a84b-a0a6bf742a66"
};

export const schema = {
	"project_id": "ffc3d25c-10c1-49d8-a84b-a0a6bf742a66",
	"version": 2,
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
		}, 
		"notes": {
			"type": "collection",
			"fields": {
			  "text": {
				"type": "string",
				"description": "main text value"
			  }
			},
			"origin": {
			  "type": "reference",
			  "table": "notes",
			  "project_id": "bc1f568d-62f5-437f-af3a-398d90db58e6"
			},
			"description": "notes table"
		  },
		  "tasks": {
			"name": "tasks",
			"type": "collection",
			"fields": {
			  "name": {
				"type": "string"
			  },
			  "completed": {
				"type": "boolean"
			  },
			  "description": {
				"type": "string"
			  }
			},
			"origin": {
			  "type": "reference",
			  "table": "tasks",
			  "project_id": "701b11bc-59a8-45b5-8148-7184d7733e5b"
			}
		  },
	  
	}
}
	;
