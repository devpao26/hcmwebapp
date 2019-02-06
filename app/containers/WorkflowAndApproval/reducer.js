/*
 * Workflow and Approvals Reducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

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

    WFLOW_TEMPLATE_STEP,
    WFLOW_TEMPLATE_STEP_SUCCESS,
    WFLOW_TEMPLATE_STEP_FAILED,
    

    WFLOW_EMPWGDP_LIST,
    WFLOW_EMPWGDP_SUCCESS,
    WFLOW_EMPWGDP_FAILED,
    WFLOW_EMPWGDP_SELECTEDITEMS,

    WFLOW_ENTITY,
    WFLOW_ENT_SUCCESS,
    WFLOW_ENT_FAILED,
    WFLOW_ENT_SELECTEDITEM,
} from './constants';


// The initial state of the App
const initialState = fromJS({
    wflowProcesses: {
        procsloading: false,
        procserror: false,
        procsdata: false,
        procsSelItem: false,
        pages: false,
        pageIndex: 1,
    },
    wflowTemplates: {
        wflowtempsloading: false,
        wflowtempserror: false,
        wflowtempsdata: false,
        tempsSelItem: false,
        pages: false,
        pageIndex: 1,
    },
    wflowTemplateAct: {
        loading: false,
        error: false,
        response: false,
        detail: false,
        requestType: false,
    },
    /**
        * @param loadToAdd This flag is intended to handle the difference between loading the list to add item or just to view
        * if True : means that the listings to add should not affect the same list to view
        */
    wflowEmpWGDeptReqs: {
        requestor: false, // Value for 1: Workgroup 2: Department 0: Employee
        pages: false,
        loading: false,
        error: false,
        response: false,
        detailreqs: false,
        items: false,
        requestType: false,
        selectedItem: false,
    },
    wflowProcessEntity: {
        requestor: false, // Value for 1: Workgroup 2: Department 0: Employee
        pages: false,
        loading: false,
        error: false,
        response: false,
        detailreqs: false,
        items: false,
        requestType: false,
        selectedItem: false,
    },
    wflowTempStep: {
        pages: false,
        loading: false,
        error: false,
        response: false,
        detailreqs: false,
        items: false,
        requestType: false,
        selectedItem: false,
    }
});

function wflowReducer(state = initialState, action) {
    switch (action.type) {
        case WFLOW_RESETSTATE:
            return initialState;
        case WFLOW_PROCS_SELECTEDITEM:
            return state
                .setIn(['wflowProcesses', 'procsSelItem'], action.procsitem);
        case WFLOW_PROCSLIST:
            return state
                .setIn(['wflowProcesses', 'procsloading'], true)
                .setIn(['wflowProcesses', 'procserror'], false)
                .setIn(['wflowProcesses', 'pages'], action.pages)
                .setIn(['wflowProcesses', 'procsdata'], false);
        case WFLOW_PROCSLIST_SUCCESS:
            return state
                .setIn(['wflowProcesses', 'procsloading'], false)
                .setIn(['wflowProcesses', 'procserror'], false)
                .setIn(['wflowProcesses', 'pages'], action.pages)
                .setIn(['wflowProcesses', 'procsdata'], action.listdata);
        case WFLOW_PROCSLIST_FAILED:
            return state
                .setIn(['wflowProcesses', 'procsloading'], false)
                .setIn(['wflowProcesses', 'procserror'], action.error)
                .setIn(['wflowProcesses', 'procsdata'], false);

        /**
         * Template List Reducers
         */

        case WFLOW_TEMPLATE_SELECTEDITEM:
            return state
                .setIn(['wflowEmpWGDeptReqs', 'items'], false) // Clear all selected Employee first
                .setIn(['wflowTemplates', 'tempsSelItem'], action.tempsitem)
                .setIn(['wflowTemplateAct', 'loading'], false)
                .setIn(['wflowTemplateAct', 'error'], false)
                .setIn(['wflowTemplateAct', 'detail'], false)
                .setIn(['wflowTemplateAct', 'requestType'], false)
                .setIn(['wflowTemplateAct', 'response'], false);
        case WFLOW_TEMPLATELIST:
            return state
                .setIn(['wflowTemplates', 'tempsSelItem'], false)
                .setIn(['wflowTemplates', 'tempsloading'], true)
                .setIn(['wflowTemplates', 'tempserror'], false)
                .setIn(['wflowTemplates', 'pages'], action.pages)
                .setIn(['wflowTemplates', 'tempsdata'], false);
        case WFLOW_TEMPLATELIST_SUCCESS:
            return state
                .setIn(['wflowTemplates', 'tempsloading'], false)
                .setIn(['wflowTemplates', 'tempserror'], false)
                .setIn(['wflowTemplates', 'pages'], action.pages)
                .setIn(['wflowTemplates', 'tempsdata'], action.listdata);
        case WFLOW_TEMPLATELIST_FAILED:
            return state
                .setIn(['wflowTemplates', 'pages'], false)
                .setIn(['wflowTemplates', 'tempsloading'], false)
                .setIn(['wflowTemplates', 'tempserror'], action.error)
                .setIn(['wflowTemplates', 'tempsdata'], false);

        /**
         * Processing of Template Reducers
         */
        case WFLOW_PROCESSTEMPLATE:
            return state
                .setIn(['wflowTemplateAct', 'loading'], true)
                .setIn(['wflowTemplateAct', 'error'], false)
                .setIn(['wflowTemplateAct', 'detail'], action.tempDetail)
                .setIn(['wflowTemplateAct', 'requestType'], action.requestType);
        case WFLOW_PROCESSTEMPLATE_SUCCESS:
            return state
                .setIn(['wflowTemplateAct', 'loading'], false)
                .setIn(['wflowTemplateAct', 'error'], false)
                .setIn(['wflowTemplateAct', 'response'], action.response);
        case WFLOW_PROCESSTEMPLATE_FAILED:
            return state
                .setIn(['wflowTemplateAct', 'loading'], false)
                .setIn(['wflowTemplateAct', 'error'], action.error)
                .setIn(['wflowTemplateAct', 'response'], false);
        case WFLOW_PROCESSRESET:
            return state
                .setIn(['wflowTemplateAct', 'loading'], false)
                .setIn(['wflowTemplateAct', 'error'], false)
                .setIn(['wflowTemplateAct', 'detail'], false)
                .setIn(['wflowTemplateAct', 'requestType'], false)
                .setIn(['wflowTemplateAct', 'response'], false)
                .setIn(['wflowTempStep', 'loading'], false)
                .setIn(['wflowTempStep', 'error'], false)
                .setIn(['wflowTempStep', 'selectedItem'], false)
                .setIn(['wflowTempStep', 'requestType'], false)
                .setIn(['wflowTempStep', 'response'], false)
                .setIn(['wflowTempStep', 'detailreqs'], false);

        case WFLOW_TEMPLATE_STEP:
            return state
                .setIn(['wflowTempStep', 'loading'], false)
                .setIn(['wflowTempStep', 'error'], false)
                .setIn(['wflowTempStep', 'selectedItem'], action.item)
                .setIn(['wflowTempStep', 'requestType'], action.reqsType)
                .setIn(['wflowTempStep', 'detailreqs'], action.details);
        case WFLOW_TEMPLATE_STEP_SUCCESS:
            return state
                .setIn(['wflowTempStep', 'loading'], false)
                .setIn(['wflowTempStep', 'error'], false)
                .setIn(['wflowTempStep', 'response'], action.response);
        case WFLOW_TEMPLATE_STEP_FAILED:
            return state
                .setIn(['wflowTempStep', 'loading'], false)
                .setIn(['wflowTempStep', 'error'], action.error)
                .setIn(['wflowTempStep', 'response'], false);

        /**
         * Employee List Reducers
         */
        case WFLOW_EMPWGDP_LIST:
            return state
                .setIn(['wflowEmpWGDeptReqs', 'requestType'], action.reqsType)
                .setIn(['wflowEmpWGDeptReqs', 'response'], false)
                .setIn(['wflowEmpWGDeptReqs', 'error'], false)
                .setIn(['wflowEmpWGDeptReqs', 'loading'], true)
                .setIn(['wflowEmpWGDeptReqs', 'detailreqs'], action.details);

        case WFLOW_EMPWGDP_SUCCESS:
            return state
                .setIn(['wflowEmpWGDeptReqs', 'pages'], action.pages)
                .setIn(['wflowEmpWGDeptReqs', 'response'], action.response)
                .setIn(['wflowEmpWGDeptReqs', 'error'], false)
                .setIn(['wflowEmpWGDeptReqs', 'loading'], false);
        case WFLOW_EMPWGDP_FAILED:
            return state
                .setIn(['wflowEmpWGDeptReqs', 'pages'], false)
                .setIn(['wflowEmpWGDeptReqs', 'response'], false)
                .setIn(['wflowEmpWGDeptReqs', 'error'], action.error)
                .setIn(['wflowEmpWGDeptReqs', 'loading'], false);
        case WFLOW_EMPWGDP_SELECTEDITEMS:
            return state
                .setIn(['wflowEmpWGDeptReqs', 'items'], action.items);
        /**
         * Processing of Work Flow Entities
         */

        case WFLOW_ENTITY:
            return state
                .setIn(['wflowProcessEntity', 'requestor'], action.requestor)
                .setIn(['wflowProcessEntity', 'requestType'], action.reqsType)
                .setIn(['wflowProcessEntity', 'response'], false)
                .setIn(['wflowProcessEntity', 'error'], false)
                .setIn(['wflowProcessEntity', 'loading'], true)
                .setIn(['wflowProcessEntity', 'detailreqs'], action.details);
        case WFLOW_ENT_SUCCESS:
            return state
                .setIn(['wflowProcessEntity', 'requestor'], false)
                .setIn(['wflowProcessEntity', 'pages'], action.pages)
                .setIn(['wflowProcessEntity', 'response'], action.response)
                .setIn(['wflowProcessEntity', 'error'], false)
                .setIn(['wflowProcessEntity', 'loading'], false);
        case WFLOW_ENT_FAILED:
            return state
                .setIn(['wflowProcessEntity', 'requestor'], false)
                .setIn(['wflowProcessEntity', 'pages'], false)
                .setIn(['wflowProcessEntity', 'response'], false)
                .setIn(['wflowProcessEntity', 'error'], action.error)
                .setIn(['wflowProcessEntity', 'loading'], false);
        case WFLOW_ENT_SELECTEDITEM:
            return state
                .setIn(['wflowProcessEntity', 'selectedItem'], action.item);

        default:
            return state;
    }
}

export default wflowReducer;
