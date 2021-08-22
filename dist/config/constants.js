"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HTTP_STATUS_MAP = exports.HTTP_CODE = void 0;

var _HTTP_STATUS_MAP;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HTTP_CODE = {
  CONTINUE: 100,
  SWITCHING_PROTOCOLS: 101,
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITATIVE_INFORMATION: 203,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  PARTIAL_CONTENT: 206,
  MULTI_STATUS: 207,
  ALREADY_REPORTED: 208,
  IM_USED: 226,
  MULTIPLE_CHOICES: 300,
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  SEE_OTHER: 303,
  NOT_MODIFIED: 304,
  USE_PROXY: 305,
  SWITCH_PROXY: 306,
  TEMPORARY_REDIRECT: 307,
  PERMANENT_REDIRECT: 308,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  REQUEST_ENTITY_TOO_LARGE: 413,
  REQUEST_URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  REQUESTED_RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  IM_A_TEAPOT: 418,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_ENTITY: 422,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NOT_EXTENDED: 510,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
exports.HTTP_CODE = HTTP_CODE;
var HTTP_STATUS_MAP = (_HTTP_STATUS_MAP = {}, _defineProperty(_HTTP_STATUS_MAP, CONTINUE, 'Continue'), _defineProperty(_HTTP_STATUS_MAP, SWITCHING_PROTOCOLS, 'Switching Protocols'), _defineProperty(_HTTP_STATUS_MAP, OK, 'OK'), _defineProperty(_HTTP_STATUS_MAP, CREATED, 'Created'), _defineProperty(_HTTP_STATUS_MAP, ACCEPTED, 'Accepted'), _defineProperty(_HTTP_STATUS_MAP, NON_AUTHORITATIVE_INFORMATION, 'Non-Authoritative Information'), _defineProperty(_HTTP_STATUS_MAP, NO_CONTENT, 'No Content'), _defineProperty(_HTTP_STATUS_MAP, RESET_CONTENT, 'Reset Content'), _defineProperty(_HTTP_STATUS_MAP, PARTIAL_CONTENT, 'Partial Content'), _defineProperty(_HTTP_STATUS_MAP, MULTI_STATUS, 'Multi Status'), _defineProperty(_HTTP_STATUS_MAP, ALREADY_REPORTED, 'Already Reported'), _defineProperty(_HTTP_STATUS_MAP, IM_USED, 'IM Used'), _defineProperty(_HTTP_STATUS_MAP, MULTIPLE_CHOICES, 'Multiple Choices'), _defineProperty(_HTTP_STATUS_MAP, MOVED_PERMANENTLY, 'Moved Permanently'), _defineProperty(_HTTP_STATUS_MAP, FOUND, 'Found'), _defineProperty(_HTTP_STATUS_MAP, SEE_OTHER, 'See Other'), _defineProperty(_HTTP_STATUS_MAP, NOT_MODIFIED, 'Not Modified'), _defineProperty(_HTTP_STATUS_MAP, USE_PROXY, 'Use Proxy'), _defineProperty(_HTTP_STATUS_MAP, SWITCH_PROXY, 'Switch Proxy'), _defineProperty(_HTTP_STATUS_MAP, TEMPORARY_REDIRECT, 'Temporary Redirect'), _defineProperty(_HTTP_STATUS_MAP, PERMANENT_REDIRECT, 'Permanent Redirect'), _defineProperty(_HTTP_STATUS_MAP, BAD_REQUEST, 'Bad Request'), _defineProperty(_HTTP_STATUS_MAP, UNAUTHORIZED, 'Unauthorized'), _defineProperty(_HTTP_STATUS_MAP, PAYMENT_REQUIRED, 'Payment Required'), _defineProperty(_HTTP_STATUS_MAP, FORBIDDEN, 'Forbidden'), _defineProperty(_HTTP_STATUS_MAP, NOT_FOUND, 'Not Found'), _defineProperty(_HTTP_STATUS_MAP, METHOD_NOT_ALLOWED, 'Method Not Allowed'), _defineProperty(_HTTP_STATUS_MAP, NOT_ACCEPTABLE, 'Not Acceptable'), _defineProperty(_HTTP_STATUS_MAP, PROXY_AUTHENTICATION_REQUIRED, 'Proxy Authentication Required'), _defineProperty(_HTTP_STATUS_MAP, REQUEST_TIMEOUT, 'Request Time-out'), _defineProperty(_HTTP_STATUS_MAP, CONFLICT, 'Conflict'), _defineProperty(_HTTP_STATUS_MAP, GONE, 'Gone'), _defineProperty(_HTTP_STATUS_MAP, LENGTH_REQUIRED, 'Length Required'), _defineProperty(_HTTP_STATUS_MAP, PRECONDITION_FAILED, 'Precondition Failed'), _defineProperty(_HTTP_STATUS_MAP, REQUEST_ENTITY_TOO_LARGE, 'Request Entity Too Large'), _defineProperty(_HTTP_STATUS_MAP, REQUEST_URI_TOO_LONG, 'Request-URI Too Large'), _defineProperty(_HTTP_STATUS_MAP, UNSUPPORTED_MEDIA_TYPE, 'Unsupported Media Type'), _defineProperty(_HTTP_STATUS_MAP, REQUESTED_RANGE_NOT_SATISFIABLE, 'Requested Range not Satisfiable'), _defineProperty(_HTTP_STATUS_MAP, EXPECTATION_FAILED, 'Expectation Failed'), _defineProperty(_HTTP_STATUS_MAP, IM_A_TEAPOT, "I'm a teapot"), _defineProperty(_HTTP_STATUS_MAP, MISDIRECTED_REQUEST, 'Misdirected Request'), _defineProperty(_HTTP_STATUS_MAP, UNPROCESSABLE_ENTITY, 'Unprocessable Entity'), _defineProperty(_HTTP_STATUS_MAP, UPGRADE_REQUIRED, 'Locked'), _defineProperty(_HTTP_STATUS_MAP, PRECONDITION_REQUIRED, 'Failed Dependency'), _defineProperty(_HTTP_STATUS_MAP, LOCKED, 'Upgrade Required'), _defineProperty(_HTTP_STATUS_MAP, FAILED_DEPENDENCY, 'Precondition Required'), _defineProperty(_HTTP_STATUS_MAP, TOO_MANY_REQUESTS, 'Too Many Requests'), _defineProperty(_HTTP_STATUS_MAP, REQUEST_HEADER_FIELDS_TOO_LARGE, 'Request Header Fields Too Large'), _defineProperty(_HTTP_STATUS_MAP, UNAVAILABLE_FOR_LEGAL_REASONS, 'Unavailable For Legal Reasons'), _defineProperty(_HTTP_STATUS_MAP, INTERNAL_SERVER_ERROR, 'Internal Server Error'), _defineProperty(_HTTP_STATUS_MAP, NOT_IMPLEMENTED, 'Not Implemented'), _defineProperty(_HTTP_STATUS_MAP, BAD_GATEWAY, 'Bad Gateway'), _defineProperty(_HTTP_STATUS_MAP, SERVICE_UNAVAILABLE, 'Service Unavailable'), _defineProperty(_HTTP_STATUS_MAP, GATEWAY_TIMEOUT, 'Gateway Time-out'), _defineProperty(_HTTP_STATUS_MAP, HTTP_VERSION_NOT_SUPPORTED, 'HTTP Version not Supported'), _defineProperty(_HTTP_STATUS_MAP, VARIANT_ALSO_NEGOTIATES, 'Variant Also Negotiates'), _defineProperty(_HTTP_STATUS_MAP, INSUFFICIENT_STORAGE, 'Insufficient Storage'), _defineProperty(_HTTP_STATUS_MAP, LOOP_DETECTED, 'Loop Detected'), _defineProperty(_HTTP_STATUS_MAP, NOT_EXTENDED, 'Not Extended'), _defineProperty(_HTTP_STATUS_MAP, NETWORK_AUTHENTICATION_REQUIRED, 'Network Authentication Required'), _HTTP_STATUS_MAP);
exports.HTTP_STATUS_MAP = HTTP_STATUS_MAP;