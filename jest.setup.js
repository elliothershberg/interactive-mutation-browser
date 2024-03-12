import '@testing-library/jest-dom';
import 'resize-observer-polyfill';

// Mock ResizeObserver
class ResizeObserver {
  constructor(callback) {
    this.callback = callback;
  }

  observe() {
    // Do nothing
  }

  unobserve() {
    // Do nothing
  }

  disconnect() {
    // Do nothing
  }
}

// Define it on the global object
global.ResizeObserver = ResizeObserver;
