import { useReducer } from "react";
import { apiFetch } from '@/utils/api'
import { format } from "@/utils/string";

const FETCHING_ITEMS = "FETCHING_ITEMS"
const SET_ITEMS = "SET_ITEMS"
const LIMIT_REACH = "LIMIT_REACH"
const SET_ID = "SET_ID"


const initialState = {
    id: "",
    page: 0,
    loading: false,
    limitReach: false,
    items: [],
};

/**
 * reducer du hook useItems
 */
function reducer(state, action) {
    switch (action.type) {
        case FETCHING_ITEMS:
            return { ...state, loading: true }
        case SET_ITEMS:
            return { ...state, items: [...state.items, ...action.payload], loading: false, page: (state.page + 1) }
        case LIMIT_REACH:
            return { ...state, limitReach: true, loading: false }
        case SET_ID:
            return { ...initialState, id: action.payload, page: 0, limitReach: false }
        default:
            throw new Error(`Action inconnue ${action.type}`)
    }
}

/**
 * hook useItems
 * 
 * @returns 
 */
export function useItems() {
    const [state, dispatch] = useReducer(reducer, initialState)

    return {
        id: state.id,
        page: state.page,
        items: state.items,
        loading: state.loading,
        limitReach: state.limitReach,
        fetchItems: async ({ limit, id }) => {
            let idToFetch
            if (id === undefined) id = state.id
            if (id != state.id) {
                console.log(`change id ${state.id} => ${id}`)
                dispatch({ type: SET_ID, payload: id })
                idToFetch = id
            } else idToFetch = state.id

            console.log(`idToFetch: ${idToFetch}`)

            if (!state.limitReach && idToFetch != "") {
                dispatch({ type: FETCHING_ITEMS })
                const itemsResponse = await apiFetch(format(process.env.NEXT_PUBLIC_CHEST_ENDPOINT_ITEMS, idToFetch), {
                    method: 'GET',
                    limit: limit,
                    page: state.page,
                })
                itemsResponse == null ? dispatch({ type: LIMIT_REACH }) : dispatch({ type: SET_ITEMS, payload: itemsResponse })
            }
        }
    }
}