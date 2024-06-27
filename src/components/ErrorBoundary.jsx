
import React, { Component } from 'react';
import { Box, Button } from '@chakra-ui/react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught in Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box p={5}>
          <h1>Something went wrong.</h1>
          <Button onClick={() => this.setState({ hasError: false })}>Try again</Button>
        </Box>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
