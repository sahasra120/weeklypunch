import React, { Component } from 'react';
import { Empty } from 'antd';

interface Props {
  children: React.ReactNode;
  style?: {};
}

type StateProps = {
  hasError: boolean;
};

class ErrorBoundry extends Component<Props> {
  state: StateProps = {
    hasError: false,
  };
  constructor(props: Props) {
    super(props);
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      hasError: true,
    });
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <Empty
          description={
            <>
              <p>Something break...</p>
            </>
          }
          style={this.props.style}
        />
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundry;
