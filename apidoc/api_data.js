define({ "api": [
  {
    "type": "post",
    "url": "/api/auth",
    "title": "Authenticate the user",
    "name": "AuthUser",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users email address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Users password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "JWT",
            "description": "<p>JSON Web Token that identicates a user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\neyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2IwOThlODMwZWMxNTQ4NDRiNjFlNjMiLCJpYXQiOjE1NTUyMzk0NzN9.nlWHRXCbZZn7JdwyHmDvBtEQSvCPENRVxlw9TQdmzXA",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidParams",
            "description": "<p>Invalid params sent.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The user with passed email address was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidPassword",
            "description": "<p>Invalid user password passed.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/tasks/",
    "title": "Add new task to database",
    "name": "AddTask",
    "group": "Tasks",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-auth-token",
            "description": "<p>Previously generated JWT.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>New task title.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>New task description.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "Task",
            "description": "<p>Task that was saved.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n     \"_id\": \"3ab30d7f1b26580016067995\",\n     \"title\": \"New task title\",\n     \"description\": \"New task description\",\n     \"userId\": \"4bc30d7f1b26580016067995\",\n     \"isFinished\": true,\n     \"createDate\": \"2019-04-14T12:44:36.963Z\",\n     \"__v\": 0\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidParams",
            "description": "<p>Invalid params sent.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied. No token provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Invalid token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TaskNotFound",
            "description": "<p>The task with the given ID was not found!</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidUser",
            "description": "<p>The task does not belong to this user!</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/tasks.js",
    "groupTitle": "Tasks"
  },
  {
    "type": "delete",
    "url": "/api/tasks/:id",
    "title": "Delete task from database",
    "name": "DeleteTask",
    "group": "Tasks",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-auth-token",
            "description": "<p>Previously generated JWT.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":id",
            "description": "<p>Task id that the user wants to delete.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "Task",
            "description": "<p>Task that has been deleted.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n     \"_id\": \"3ab30d7f1b26580016067995\",\n     \"title\": \"Task title\",\n     \"description\": \"Task description\",\n     \"userId\": \"4bc30d7f1b26580016067995\",\n     \"isFinished\": false,\n     \"createDate\": \"2019-04-14T12:44:36.963Z\",\n     \"__v\": 0\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied. No token provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Invalid token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TaskNotFound",
            "description": "<p>The task with the given ID was not found!</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidUser",
            "description": "<p>The task does not belong to this user!</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/tasks.js",
    "groupTitle": "Tasks"
  },
  {
    "type": "get",
    "url": "/api/tasks/:id",
    "title": "Get task from database",
    "name": "GetTask",
    "group": "Tasks",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-auth-token",
            "description": "<p>Previously generated JWT.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":id",
            "description": "<p>Task id that the user wants to get.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "Task",
            "description": "<p>Task that the user want.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n     \"_id\": \"3ab30d7f1b26580016067995\",\n     \"title\": \"Task title\",\n     \"description\": \"Task description\",\n     \"userId\": \"4bc30d7f1b26580016067995\",\n     \"isFinished\": false,\n     \"createDate\": \"2019-04-14T12:44:36.963Z\",\n     \"__v\": 0\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied. No token provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Invalid token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TaskNotFound",
            "description": "<p>The task with the given ID was not found!</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidUser",
            "description": "<p>The task does not belong to this user!</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/tasks.js",
    "groupTitle": "Tasks"
  },
  {
    "type": "get",
    "url": "/api/tasks/",
    "title": "Get all user tasks from database",
    "name": "GetTasks",
    "group": "Tasks",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-auth-token",
            "description": "<p>Previously generated JWT.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "Tasks",
            "description": "<p>Array of tasks.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n     {\n         \"_id\": \"3ab30d7f1b26580016067995\",\n         \"title\": \"Task title\",\n         \"description\": \"Task description\",\n         \"userId\": \"4bc30d7f1b26580016067995\",\n         \"isFinished\": false,\n         \"createDate\": \"2019-04-14T12:44:36.963Z\",\n         \"__v\": 0\n     }\n ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied. No token provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Invalid token.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/tasks.js",
    "groupTitle": "Tasks"
  },
  {
    "type": "put",
    "url": "/api/tasks/:id",
    "title": "Update task in database",
    "name": "UpdateTask",
    "group": "Tasks",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-auth-token",
            "description": "<p>Previously generated JWT.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":id",
            "description": "<p>Task id that the user wants to update.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>New task title.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>New task description.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isFinished",
            "description": "<p>New ifFinished value.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "Task",
            "description": "<p>Task that is updated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n     \"_id\": \"3ab30d7f1b26580016067995\",\n     \"title\": \"Task title\",\n     \"description\": \"Task description\",\n     \"userId\": \"4bc30d7f1b26580016067995\",\n     \"isFinished\": false,\n     \"createDate\": \"2019-04-14T12:44:36.963Z\",\n     \"__v\": 0\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidParams",
            "description": "<p>Invalid params sent.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied. No token provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Invalid token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TaskNotFound",
            "description": "<p>The task with the given ID was not found!</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidUser",
            "description": "<p>The task does not belong to this user!</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/tasks.js",
    "groupTitle": "Tasks"
  },
  {
    "type": "get",
    "url": "/api/users/me",
    "title": "Get currently logged user",
    "name": "GetUser",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-auth-token",
            "description": "<p>Previously generated JWT.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "User",
            "description": "<p>User JSON object that contains information about user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n     \"_id\": \"3ab30d7f1b26580016067995\",\n     \"login\": \"userLogin\",\n     \"email\": \"user@gmail.com\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied. No token provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Invalid token.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/api/users",
    "title": "Register new user",
    "name": "RegisterUser",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "login",
            "description": "<p>Users login.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users email address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Users password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "User",
            "description": "<p>JSON object that contains information about user. There is also a JWT in the response header (x-auth-token).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n     \"_id\": \"3ab30d7f1b26580016067995\",\n     \"login\": \"userLogin\",\n     \"email\": \"user@gmail.com\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidParams",
            "description": "<p>Invalid params sent.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserRegistered",
            "description": "<p>The user is already registered.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users"
  }
] });
