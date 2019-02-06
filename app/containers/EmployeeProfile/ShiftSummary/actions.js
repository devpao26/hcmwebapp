/*
 *
 * SHIFTSUMM actions
 *
 */

import {
    GET_SHIFTSUMMLIST,
    SHIFTSUMMLIST_SUCCESS,
    SHIFTSUMMLIST_ERROR
} from './constants';



/**
 * 
 * @param {Object} page Sends the Page Index
 */
export function getSHIFTSUMMList(filter) {
    return {
        type: GET_SHIFTSUMMLIST,
        filter
    }
}

/**
 * 
 * @param {Object} error Error Response
 */
export function retrieveErrorList(error) {
    return {
        type: SHIFTSUMMLIST_ERROR,
        error
    }
}

/**
 * 
 * @param {Object} data Data Response
 */
export function retrieveSuccessList(data, page) {
    return {
        type: SHIFTSUMMLIST_SUCCESS,
        data,
        page
    }
}