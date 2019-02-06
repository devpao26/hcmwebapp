/*
 * Work Flow and Approval Pages Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */
/* eslint no-unused-vars: "off" */
import {
    WFLOW_RESETSTATE,
    WFLOW_PROCSLIST_SUCCESS,
    WFLOW_PROCSLIST_FAILED,
    WFLOW_PROCSLIST,
    WFLOW_PROCS_SELECTEDITEM,
    WFLOW_TEMPLATELIST_SUCCESS,
    WFLOW_TEMPLATELIST_FAILED,
    WFLOW_TEMPLATELIST,
    WFLOW_TEMPLATE_SELECTEDITEM,
    WFLOW_PROCESSTEMPLATE_SUCCESS,
    WFLOW_PROCESSTEMPLATE_FAILED,
    WFLOW_PROCESSTEMPLATE,
    WFLOW_PROCESSRESET,

    WFLOW_EMPWGDP_LIST,
    WFLOW_EMPWGDP_SUCCESS,
    WFLOW_EMPWGDP_FAILED,
    WFLOW_EMPWGDP_SELECTEDITEMS,

    WFLOW_ENTITY,
    WFLOW_ENT_SUCCESS,
    WFLOW_ENT_FAILED,
    WFLOW_ENT_SELECTEDITEM,

    WFLOW_TEMPLATE_STEP,
    WFLOW_TEMPLATE_STEP_SUCCESS,
    WFLOW_TEMPLATE_STEP_FAILED,
    
} from './constants';

/**
 * Reset State
 */
export function resetWFlowState() {
    return {
        type: WFLOW_RESETSTATE,
    };
}



/**
 * Dispatch to update Selected Item from the Processes List
 * @param {Object} procs Contains the Selected Item Dictionary
 * @return {object} An object with a type of WFLOW_PROCS_SELECTEDITEM
 */
export function setProcsSelected(procsitem) {
    return {
        type: WFLOW_PROCS_SELECTEDITEM,
        procsitem
    };
}

/**
 * Dispatch to retrieve the HCM Processes List
 * @param {string} 
 * @return {object} An object with a type of WFLOW_PROCSLIST
 */
export function getProcessesList(pages) {
    return {
        type: WFLOW_PROCSLIST,
        pages
    };
}


/**
 * Dispatch to retrieve the Success Data Listings
 * @param {Object} listdata Array and Dictionary results coming from a successful result query
 * @return {object} An object with a type of WFLOW_PROCSLIST_SUCCESS
 */
export function retrieveDataProcsSuccess(listdata, pages) {
    return {
        type: WFLOW_PROCSLIST_SUCCESS,
        listdata,
        pages,
    };
}

/**
* Dispatch to retrieve the Error Reports
* @param {Object} error Array and Dictionary error results
* @return {object} An object with a type of WFLOW_PROCSLIST_FAILED
*/
export function retrieveDataProcsError(error) {
    return {
        type: WFLOW_PROCSLIST_FAILED,
        error,
    };
}


/**
 * Dispatch to update Selected Item from the Templates Listing
 * @param {Object} procs Contains the Selected Item Dictionary
 * @return {object} An object with a type of WFLOW_TEMPLATE_SELECTEDITEM
 */
export function setTempsSelected(tempsitem) {
    // console.log(tempsitem);
    return {
        type: WFLOW_TEMPLATE_SELECTEDITEM,
        tempsitem
    };
}


/**
 * Dispatch to retrieve the HCM Processes Templates List
 * @param {string} 
 * @return {object} An object with a type of WFLOW_PROCSLIST
 */
export function getTemplatesList(pages) {
    return {
        type: WFLOW_TEMPLATELIST,
        pages
    };
}


/**
 * Dispatch to retrieve the Success Data Listings
 * @param {Object} listdata Array and Dictionary results coming from a successful result query
 * @return {object} An object with a type of WFLOW_PROCSLIST_SUCCESS
 */
export function retrieveDataTempsSuccess(listdata, pages) {
    return {
        type: WFLOW_TEMPLATELIST_SUCCESS,
        listdata,
        pages
    };
}


/**
* Dispatch to retrieve the Error Reports
* @param {Object} error Array and Dictionary error results
* @return {object} An object with a type of WFLOW_PROCSLIST_FAILED
*/
export function retrieveDataTempsError(error) {
    return {
        type: WFLOW_TEMPLATELIST_FAILED,
        error,
    };
}



/**
 * Dispatch to create New Template
 * @param {tempDetail} details needed for the creation / update of Template
 * @param {requestType} Enum integer equivalent for 1:POST 2:PUT 3:DELETE 4:GET
 * @return {object} An object with a type of WFLOW_PROCESSTEMPLATE
 */
export function processTemplate(tempDetail, requestType) {
    return {
        type: WFLOW_PROCESSTEMPLATE,
        tempDetail,
        requestType
    };
}



/**
 * Dispatch to create New Template Success
 * @param {Object} response Array and Dictionary results coming from a successful result query
 * @return {object} An object with a type of WFLOW_PROCESSTEMPLATE_SUCCESS
 */
export function processTemplateSuccess(response) {
    return {
        type: WFLOW_PROCESSTEMPLATE_SUCCESS,
        response,
    };
}


/**
* Dispatch to retrieve the Error in Template Creation
* @param {Object} error Array and Dictionary error results
* @return {object} An object with a type of WFLOW_PROCESSTEMPLATE_FAILED
*/
export function processTemplateError(error) {
    return {
        type: WFLOW_PROCESSTEMPLATE_FAILED,
        error,
    };
}

/**
 * Reset Template Creation State
 */
export function resetTemplateProcess() {
    return {
        type: WFLOW_PROCESSRESET
    };
}

/**
 * Dispatch to Process Template Step Options 
 * @param {stepDetail} stepDetail Details regarding selected Step (API Parameters)
 * @param {requestType} requestType Type of Action needed at request 1 : Update || 2 : Delete
 */
export function processTempStep(details, reqsType, item) {
    return {
        type: WFLOW_TEMPLATE_STEP,
        details,
        reqsType,
        item
    };
}


/**
 * Dispatch to retrieve Success response relative to Step Action taken
 * @param {Object} response 
 */
export function processTempStepSuccess(response) {
    return {
        type: WFLOW_TEMPLATE_STEP_SUCCESS,
        response,
    };
}

/**
 * Dispatch to retrieve Error response relative to Step Action taken
 * @param {Object} error 
 */
export function processTempStepError(error) {
    return {
        type: WFLOW_TEMPLATE_STEP_FAILED,
        error,
    };
}


// export function setSelectedTempStep(item) {
//     return {
//         type: WFLOW_TEMPLATE_STEP_SELECTEDITEM,
//         item,
//     };
// }

/**
 * Dispatch to set Selected Employee Profile from the list
 * @param {Object} items An object that contains all of the Seleted Employee's Info
 * @return {object} An object with a type of WFLOW_EMPWGDP_SELECTEDITEMS
 */
export function setSelectedEmps(items) {
    return {
        type: WFLOW_EMPWGDP_SELECTEDITEMS,
        items
    };
}


/**
 * Dispatch to retrieve the HCM Employee List, WorkGroup and Department
 * @param {Object} details An object that defines the Requests Body Content
 * @param {Object} reqsType 0 : EmpList || 1: WGroup List || 2: DeptList => Request Type Flag
 * @return {object} An object with a type of WFLOW_EMPWGDP_LIST
 */
export function getList(details, reqsType) {

    return {
        type: WFLOW_EMPWGDP_LIST,
        details,
        reqsType
    };
}

/**
 * Dispatch to retrieve Employee List Success
 * @param {Object} response Array and Dictionary results coming from a successful result query
 * @return {Object} response An object with a type of WFLOW_EMPWGDP_SUCCESS
 */
export function getListSuccess(response, pages) {
    return {
        type: WFLOW_EMPWGDP_SUCCESS,
        response,
        pages
    };
}


/**
* Dispatch to retrieve the Error Employee List Request
* @param {Object} error Array and Dictionary error results
* @return {object} An object with a type of WFLOW_EMPWGDP_FAILED
*/
export function getListError(error) {
    return {
        type: WFLOW_EMPWGDP_FAILED,
        error,
    };
}


/**
 * Dispatch to process the WFlow Entities (Assign, Update, Remove)
 * @param {Object} details An object that defines the Requests Body Content
 * @param {Object} reqsType 0 : GET || 1: PUSH || 2: PUT || 3:DELETE => Request Types
 * @param {Object} requestor 0 : EmpList || 1: WGroup List || 2: DeptList => Request Type Flag
 * @return {object} An object with a type of WFLOW_ENTITY
 */
export function processEntity(details, reqsType, requestor) {

    return {
        type: WFLOW_ENTITY,
        details,
        reqsType,
        requestor
    };
}

/**
 * Dispatch to retrieve the Response in process the WFlow Entities Success
 * @param {Object} response Array and Dictionary results coming from a successful result query
 * @return {Object} response An object with a type of WFLOW_ENT_SUCCESS
 */
export function processEntitySuccess(response, pages) {
    return {
        type: WFLOW_ENT_SUCCESS,
        response,
        pages
    };
}


/**
* Dispatch to retrieve the Error in processing the WFlow Entities Request
* @param {Object} error Array and Dictionary error results
* @return {object} An object with a type of WFLOW_ENT_FAILED
*/
export function processEntityError(error) {
    return {
        type: WFLOW_ENT_FAILED,
        error,
    };
}

/**
 * Dispatch to set the Selected Entity Item
 * @param {Object} item Seletec Entity Data
 */
export function setSelectedEntity(item) {
    return {
        type: WFLOW_ENT_SELECTEDITEM,
        item
    };
}

