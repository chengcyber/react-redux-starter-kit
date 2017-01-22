import React from 'react'
import classes from './Dashboard.scss'

export const Dashboard = ({
  dashboard,
  onAddClick,
  onEditClick,
  onItemClick,
  isEditing,
  editingItemKey,
  clearEditState,
  onDragStart,
  onDragOver,
  onDrop
}) => {

  let addInput
  let editInput

  const listJSX = dashboard.dashboardItems.map( (item, i) => {
    return (
      <h4 key={i}
          id={i}
         onClick={()=> {
           !isEditing?
           onItemClick(item):clearEditState()
         }}
          draggable="true"
          onDragStart={(e) => {onDragStart(e)}}
          onDragOver={(e) => {onDragOver(e)}}
          onDrop={(e) => {onDrop(e)}}
      >
        {item.key === editingItemKey?<b><u>{item.label}</u></b> : item.label}
      </h4>
    )
  })

  const renderForm = () => {
    if(isEditing) {
      return (
        <form onSubmit={(e) => {
          e.preventDefault()
          onEditClick(editingItemKey, editInput.value)
          editInput.value = ''
          clearEditState()
        }}>
          <input type="text" ref={node => editInput = node} placeholder="Edit this item"/>
          <button type="submit">Edit</button>
        </form>
      )
    }

    return (
        <form onSubmit={(e) => {
          e.preventDefault();
          onAddClick(addInput.value)
          addInput.value = ''
        }}>
          <input type="text" ref={node => addInput = node} placeholder="Input new item"/>
          <button type="submit">Add</button>
        </form>
    )
  }

  return (
    <div>
      <h2 className={classes.dashboardContainer}>
        Dashboard visits:
        {' '}
        <span className={classes['dashboard--green']}>
        {dashboard.visitCount}
      </span>
      </h2>

      {renderForm()}

      {listJSX}
    </div>
  )
}

Dashboard.propTypes = {
  dashboard: React.PropTypes.object.isRequired
}

export default Dashboard
