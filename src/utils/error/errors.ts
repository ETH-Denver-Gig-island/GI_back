enum ERRORS {
    UNKNOWN_ERROR = -1,

    // client error
    INVALID_PARAMETER_ERROR = 1001,
    TOKEN_EMPTY_ERROR = 1002,
    INVALID_TOKEN_ERROR = 1003,
    DUPLICATED_ADDRESS_ERROR = 1004,
    NOT_EXIST_USER = 1005,
    INVALID_SIGN = 1006,

    // server error
    MYSQL_ERROR = 2001,
    TOKEN_EXPIRED = 2002,
}

export default ERRORS;