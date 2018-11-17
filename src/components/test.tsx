import React, {Component} from 'react';
import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';
import {RootState} from '../reducers';

type OwnProps = {};
type StateProps = {};
type DispatchProps = {};
type Props = StateProps & DispatchProps & OwnProps;
type State = {};

class Test extends Component<Props, State> {
  public static defaultProps = {};

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>Component</div>
    );
  }
}

function mapStateToProps(state: RootState): StateProps {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return bindActionCreators({}, dispatch);
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Test);
