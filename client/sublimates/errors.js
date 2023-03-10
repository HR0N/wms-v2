export default class ErrorsClass {
    constructor() {
        this.errors = {
            400: {title: '400 Bad Request', message: 'invalid request'},
            401: {title: '401 Unauthorized', message: 'not authorized (did not introduce himself)'},
            402: {title: '402 Payment Required', message: 'payment required'},
            403: {title: '403 Forbidden', message: 'prohibited (not authorized)'},
            404: {title: '404 Not Found', message: 'not found'},
            405: {title: '405 Method Not Allowed', message: 'method not supported'},
            406: {title: '406 Not Acceptable', message: 'unacceptably'},
            407: {title: '407 Proxy Authentication Required', message: 'proxy authentication required'},
            408: {title: '408 Request Timeout', message: 'timed out'},
            409: {title: '409 Conflict', message: 'conflict'},
            410: {title: '410 Gone', message: 'removed'},
            411: {title: '411 Length Required', message: 'length needed'},
            412: {title: '411 Length Required', message: 'length needed'},
            413: {title: '413 Payload Too Large', message: 'payload too large'},
            414: {title: '414 URI Too Long', message: 'URI is too long'},
            415: {title: '415 Unsupported Media Type', message: 'unsupported data type'},
            416: {title: '416 Range Not Satisfiable', message: 'range not reachable'},
            417: {title: '417 Expectation Failed', message: 'wait failed'},
            418: {title: '418 I’m a teapot', message: 'i am teapot'},
            419: {title: '419 Authentication Timeout', message: 'usually CSRF validation error'},
            421: {title: '421 Misdirected Request', message: false},
            422: {title: '422 Unprocessable Entity', message: 'raw instance'},
            423: {title: '423 Locked', message: 'blocked'},
            424: {title: '424 Failed Dependency', message: 'unfulfilled dependency'},
            425: {title: '425 Too Early', message: 'too early'},
            426: {title: '426 Upgrade Required', message: 'update needed'},
            428: {title: '428 Precondition Required', message: 'necessary precondition'},
            429: {title: '429 Too Many Requests', message: 'too many requests'},
            431: {title: '431 Request Header Fields Too Large', message: 'request header fields are too large'},
            449: {title: '449 Retry With', message: 'повторить с'},
            451: {title: '451 Unavailable For Legal Reasons', message: 'not available for legal reasons'},
            499: {title: '499 Client Closed Request', message: 'the client closed the connection'},
        }
    }
}