import React from 'react';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native-fs', () => {
  return {
    mkdir: jest.fn(),
    moveFile: jest.fn(),
    copyFile: jest.fn(),
    pathForBundle: jest.fn(),
  };
});

jest.mock('react-native-view-shot', () => {
  return {
    captureRef: jest.fn(),
  };
});

jest.mock('react-native-image-crop-picker', () => {
  return {
    openCamera: jest.fn(),
    openPicker: jest.fn(),
  };
});

class mockViewShot extends React.Component {
  render() {
    return null;
  }
}

jest.mock('react-native-view-shot', () => {
  return mockViewShot;
});
