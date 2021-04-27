const { DEFAULT_SKIP, DEFAULT_LIMIT } = require("../resources/constant");

/**
 * 
 * @param {model} model | the table MQL model from the data you want
 * @param {JSON} query | the JSON object of query with search, order , page and limit attribute
 * @param {Array} listAttributes | list if attributes you want to return to UI
 * @param {Array} searchAttributes | list of attributes you want to search throught 
 * 
 * @returns 
 */
exports.getListData =   async ({ model, query, listAttributes, searchAttributes }) => {
    var where = {};
    var sort = {};
    var returnAttribute = {};
    var skip = DEFAULT_SKIP;
    var limit = DEFAULT_LIMIT; 

    listAttributes.map(attribute => {
        returnAttribute[attribute] = 1;
    });

    if (isExists("search",query)) {
        var search = [];
        searchAttributes.map(attribute => {
            search.push({ [attribute]: { $regex: query.search } });
        });
        where.$or = search;
    }

    if (isExists("order",query)) {
        var order = query["order"].split('_');
        sort = { [order[0]]: [order[1].toLowerCase()] };
    }

    if (isExists("page",query) && isExists("limit",query)) {
        skip = (query["page"] - 1) * query["limit"];
        limit = parseInt(query["limit"]);
    }

    var responseList = await model
                                .find(where, returnAttribute)
                                .sort(sort)
                                .skip(skip)
                                .limit(limit);
    return responseList;
}

/**
 * 
 * @param {string} attribute | the attribute to check 
 * @param {JSON} query | json object to check if the attribute exists
 * @returns 
 */
function isExists(attribute, query){
    return attribute in query && query[attribute] != '';
}