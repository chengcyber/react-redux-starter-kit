import React from 'react'
import Header from '../../components/Header'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'
import { connect } from 'react-redux'
import { loginAsync } from 'modules/session'

// export const CoreLayout = ({ children }) => (
//   <div className='container text-center'>
//     <Header />
//     <div className={classes.mainContainer}>
//       {children}
//     </div>
//   </div>
// )
//
// CoreLayout.propTypes = {
//   children: React.PropTypes.element.isRequired
// }

const mapStateToProps = (state) => {
  return {
    session: state.session
  }
}

const mapActionCreators = {
  loginAsync
}

class CoreLayout extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }

  static propTypes = {
    children : React.PropTypes.object.isRequired
  }

  handleLogin(loginObj) {
    this.props.loginAsync(loginObj)
  }

  render() {
      return (
      <div className='container text-center'>
        <Header
          handleLogin={this.handleLogin}
          session={this.props.session}/>
        <div className={classes.mainContainer}>
          {this.props.children}
        </div>
      </div>
      )
  }
}

export default connect(mapStateToProps, mapActionCreators)(CoreLayout)
