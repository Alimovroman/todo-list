import {AppActionsType, setErrorAC, setStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType, error:  string) => {
    dispatch(setStatusAC('failed'))
    dispatch(setErrorAC(error))
}
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length > 0) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some Error'))
    }
    dispatch(setStatusAC('idle'))
}
type ErrorUtilsDispatchType = Dispatch<AppActionsType>