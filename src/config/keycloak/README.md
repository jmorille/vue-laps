
## Reason
Prior to Keycloak version 18, we could include a Javascript piece of code to execute scripts during runtime. Due to security enhancements, this feature was first deprecated and then removed in version 18.

If you search the string “js” in the realm file, you can see one or more nodes with JS resource type. They contain the JavaScript code that has to be executed at runtime, and because it is an unsupported feature, we get the error.

For example, in the following snippet, the first policy type is “js“, and it contains the javascript code in the config/code field.

```json
"authorizationSettings" : {
"allowRemoteResourceManagement" : true,
"policyEnforcementMode" : "ENFORCING",
"resources" : [ {
...
} ],
"policies" : [ {
"id" : "96f8aba1-7d27-4951-8ee7-990def866a10",
"name" : "Default Policy",
"description" : "A policy that grants access only for users within this realm",
"type" : "js",
"logic" : "POSITIVE",
"decisionStrategy" : "AFFIRMATIVE",
"config" : {
"code" : "// by default, grants any permission associated with this policy\n$evaluation.grant();\n"
}
}, {
...
} ],
"scopes" : [ ],
"decisionStrategy" : "UNANIMOUS"
}

```

## Solution
   
So, to solve the “Script upload is disabled” error **clean the realm JSON file by removing** the ‘authorizationSettings‘ node altogether. 

After cleaning the realm file, the import will run successfully and the server will start.
Also, if you are actually using this feature, please check the official migration instructions.