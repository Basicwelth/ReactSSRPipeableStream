export const APP_START = 'reactSsr/startActions/APP_START';
export const APP_FINISH = 'reactSsr/startActions/APP_FINISH';
export const APP_ERROR = 'reactSsr/startActions/APP_ERROR';

export const appStart = () => ({ type: APP_START });
export const appFinish = (value) => ({ type: APP_FINISH, value });
export const appError = (error) => ({ type: APP_ERROR, error });