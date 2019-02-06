/**
 * Toaster Actions
 */
import { SHOW_TOASTER, HIDE_TOASTER } from './constants';

export function showToaster(data) {
  return {
    type: SHOW_TOASTER,
    data,
  };
}
export function hideToaster() {
  return {
    type: HIDE_TOASTER,
  };
}
