import { useReducer } from "react";
import { apiFetch } from '../utils/api'

const initialState = {
    loading: false,
    items: [],
};

/**
 * reducer du hook useItems
 */
function reducer(state, action) {
    switch (action.type) {
        case 'FETCHING_ITEMS':
            return { ...state, loading: true }
        case 'SET_ITEMS':
            return { ...state, items: action.payload, loading: false }
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
        items: state.items,
        fetchItems: async (userId) => {
            dispatch({ type: 'FETCHING_ITEMS' })
            const itemsResponse = await apiFetch(`/user/${userId}/items`, {
                method: 'GET',
            })
            dispatch({ type: 'SET_ITEMS', payload: itemsResponse })
        }
    }
}