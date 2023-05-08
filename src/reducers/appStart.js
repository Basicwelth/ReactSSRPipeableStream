import { APP_ERROR, APP_FINISH, APP_START } from '../actions/StartActions';

const initialState = { loading: false, error: null, value: null };

export function appStart(state = initialState, action) {
  switch (action.type) {
	case APP_START:
	  return { ...state, loading: true, error: null, value: null };
	case APP_FINISH:
	  return { ...state, loading: false, value: action.value };
	case APP_ERROR:
	  return { ...state, loading: false, error: action.error || 'Внутренняя ошибка приложения' };
	default:
	  return state;
  }
}
