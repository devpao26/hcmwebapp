/*
 *
 * Work Group actions
 *
 */

import {
    GET_WGLIST,
    WGLIST_SUCCESS,
    WGLIST_ERROR
} from './constants';



/**
 * 
 * @param {Object} page Sends the Page Index
 */
export function getWGList(filter) {
    return {
        type: GET_WGLIST,
        filter
    }
}

/**
 * 
 * @param {Object} error Error Response
 */
export function retrieveErrorList(error) {
    return {
        type: WGLIST_ERROR,
        error
    }
}

/**
 * 
 * @param {Object} data Data Response
 */
export function retrieveSuccessList(data, page) {
    return {
        type: WGLIST_SUCCESS,
        data,
        page
    }
}