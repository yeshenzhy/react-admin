import * as actionTypes from '../actionTypes';
const defaultValue = {
	name: "zhy",
	age: 18,
}
const userInfo = (state = defaultValue, action) => {
	switch (action.type) {
		case actionTypes.ADD_COUNT:
			let data = action.data
			return {...state, ...data};
		default:
			return state;
	}
};

export default userInfo;