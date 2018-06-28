import { createSelector } from 'reselect'

const getUI = (state, props) => state.ui.find( b => b.id === props.id )

export const getUIState = () => createSelector(
    getUI
)
