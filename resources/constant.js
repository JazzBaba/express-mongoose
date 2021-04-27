
/**
 * All the response message and its status
 */
exports.CONSTANTS = {
    /** 
     * if an API call with no auth or invalid auth then use UNAUTHORIZED constant
     */
    UNAUTHORIZED: {
        MSG: "Request denied due to unauthorized access",
        STATUS: 401
    },
    /**
     * for successful login
     */
    LOGIN_SUCCESS: {
        MSG: "Login successful",
        STATUS: 200
    },
    /**
     * for listing data successfully
     */
    RECORD_LISTED: {
        MSG: "Data retrived successfully",
        STATUS: 200
    },
    /**
     * for deleted data successfully
     */
     RECORD_DELETED: {
        MSG: "Data deleted successfully",
        STATUS: 200
    },
    RECORD_DOES_NOT_EXIST: {
        MSG: "Record does not exists",
        STATUS: 404
    },
    /**
     * Somthing went wrong
     */
    WRONG: {
        MSG: "Somthing went wrong",
        STATUS: 401
    },
    /**
     * New user added 
     */
    USER_ADDED: {
        MSG: "New user added",
        STATUS: 200
    },
    /**
     * if an api call forgot to pass the required params then pass the REQUIRED constant
     */
    REQUIRED: {
        MSG: "Bellow fields are required",
        STATUS: 401
    }
}

/**
 * Search Attributes list by modules
 */
exports.SEARCH_ATTRIBUTES = {
    /**
     * for user list method
     */
    USER_LIST : ["name", "email"]
}

/**
 * List Attributes list by modules
 */
 exports.LIST_ATTRIBUTES = {
    /**
     * for user list method
     */
    USER_LIST : ["_id", "name", "email"]
}

/**
 * to skip the the number of records by default in listing
 */
exports.DEFAULT_SKIP = 0 

/**
 * to limit the amount of record shown in records by default in listing
 */
exports.DEFAULT_LIMIT = 5