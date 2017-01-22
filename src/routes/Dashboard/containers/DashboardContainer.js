import { connect } from 'react-redux'
import React from 'react'
import { dashboardVisitIncrement, dashboardAddItem, dashboardEditItem, dashboardReorderItem } from '../modules/dashboard'

/*  This is a container component. Notice it does not contain any JSX,
 nor does it import React. This component is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 component - in this case, the counter:   */

import Dashboard from 'components/Dashboard'

/*  Object of action creators (can also be function that returns object).
 Keys will be passed as props to presentational components. Here we are
 implementing our wrapper around increment; the component doesn't care   */


const mapActionCreators =  {
  dashboardVisitIncrement: () => dashboardVisitIncrement(1),
  onAddClick: (text) => dashboardAddItem(text),
  onEditClick: (key, text) => dashboardEditItem(key, text),
  dashboardReoderItem: (start, end) => dashboardReorderItem(start, end)
}

const mapStateToProps = (state) => ({
  dashboard: state.dashboard
})



/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

 import { createSelector } from 'reselect'
 const counter = (state) => state.counter
 const tripleCount = createSelector(counter, (count) => count * 3)
 const mapStateToProps = (state) => ({
 counter: tripleCount(state)
 })

 Selectors can compute derived data, allowing Redux to store the minimal possible state.
 Selectors are efficient. A selector is not recomputed unless one of its arguments change.
 Selectors are composable. They can be used as input to other selectors.
 https://github.com/reactjs/reselect    */

class DashboardContainer extends React.Component {

  constructor() {
    super()

    this.state = {
      isEditing: false,
      editingItemKey: null,
      draggedItemIndex: null
    }
    this.onItemClick = this.onItemClick.bind(this)
    this.clearEditState = this.clearEditState.bind(this)
    this.onDragStart = this.onDragStart.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  onItemClick(item) {
    this.setState({
      isEditing: true,
      editingItemKey: item.key
    })
  }

  clearEditState() {
    this.setState({
      isEditing: false,
      editingItemKey: null
    })
  }

  onDragStart(e) {
    this.setState({
      draggedItemIndex: e.target.id
    })
  }

  onDragOver(e) {
    e.preventDefault()
    e.dataTransfer.dragEffect = 'move'
  }

  onDrop(e) {
    const droppedItemIndex = e.currentTarget.id
    let reorderObj = {
      start: parseInt(this.state.draggedItemIndex),
      end: parseInt(droppedItemIndex)
    }
    console.log(reorderObj.start, reorderObj.end);

    const validateReorderObj = !isNaN(reorderObj.start) && !isNaN(reorderObj.end) && (reorderObj.start !== reorderObj.end)

    if (validateReorderObj) {
      this.props.dashboardReoderItem(reorderObj.start, reorderObj.end)
    }

    this.setState({
      draggedItemIndex: null
    })
  }

  componentDidMount() {
    this.props.dashboardVisitIncrement();
  }

  render () {

    return (
      <Dashboard
        {...this.props}
        {...this.state}
        onItemClick={this.onItemClick}
        clearEditState={this.clearEditState}
        onDragStart={this.onDragStart}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
      />
    )
  }
}

export default connect(mapStateToProps, mapActionCreators)(DashboardContainer)
