import React from 'react';
import ReactDOM from 'react-dom';

import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement
} from 'react-reflex'

export default class MainHintWindow extends React.Component {
  constructor(props) {
    super(props);

    // Set initial state.
    this.state = {
      flowMode: 'drag'
    };
  }

  render() {
    return (
      <ReflexContainer orientation="horizontal">
        <ReflexElement>
          <ReflexContainer orientation="vertical">
            <ReflexElement>
              <div><label>Image Viewer</label></div>
            </ReflexElement>

            <ReflexSplitter/>

            <ReflexElement>
              <div><label>Toolbar</label></div>
            </ReflexElement>
          </ReflexContainer>
        </ReflexElement>

        <ReflexSplitter/>

        <ReflexElement>
          <div><label>Not sure yet</label></div>
        </ReflexElement>
      </ReflexContainer>
    );
  }
}
