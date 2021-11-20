import { useReducer } from "react";
import { apiFetch } from '@/utils/api'
import { format } from "@/utils/string";

const FETCHING_USERS = "FETCHING_USERS"
const SET_USERS = "SET_USERS"
const LIMIT_REACH = "LIMIT_REACH"
const SET_ID = "SET_ID"


const initialState = {
    id: "",
    page: 0,
    loading: false,
    limitReach: false,
    users: [],
};

/**
 * reducer du hook useUsers
 */
function reducer(state, action) {
    switch (action.type) {
        case FETCHING_USERS:
            return { ...state, loading: true }
        case SET_USERS:
            return { ...state, users: [...state.users, ...action.payload], loading: false, page: (state.page + 1) }
        case SET_ID:
            return { ...initialState, id: action.payload, page: 0 }
        default:
            throw new Error(`Action inconnue ${action.type}`)
    }
}

/**
 * hook useUsers
 * 
 * @returns 
 */
export function useUsers() {
    const [state, dispatch] = useReducer(reducer, initialState)

    return {
        id: state.id,
        page: state.page,
        users: state.users,
        loading: state.loading,
        fetchUsers: async ({ limit }) => {
            dispatch({ type: FETCHING_USERS })
            const usersResponse = await apiFetch(process.env.NEXT_PUBLIC_CHEST_ENDPOINT_USERS, {
                method: 'GET',
                limit: limit,
                page: state.page,
            })
            usersResponse == dispatch({ type: SET_USERS, payload: usersResponse })
        }
    }
}