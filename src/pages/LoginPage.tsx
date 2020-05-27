import { connect } from 'react-redux';
import Login from '../components/LoginComponent';
import { fetchCharts } from '../actions'

const mapDispatchToProps = (dispatch: any) => {
    return {
      fetchCharts: (username: string) => dispatch(fetchCharts(username))
    }
}

export default connect(null, mapDispatchToProps)(Login)