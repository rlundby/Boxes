import { GET_BOXES } from '../Actions';

//Currently the only reducer is to update the state with new list of boxes
export default function boxesReducer(state = {}, action){
    switch (action.type){
        case GET_BOXES:
            const newState = {...state};
            newState.boxes = action.boxes;
            return newState;
        default:
            return state;
    }
}