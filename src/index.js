import ReactDOM from 'react-dom'
import React from 'react'

import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement
} from 'react-reflex'

import MainTabView from './maintabview.js'

import './style.css';
import './reflexstyle.css';

class SplitLayout extends React.Component {
  render () {
    return (
      <ReflexContainer orientation="horizontal">

        <ReflexElement>
          <ReflexContainer orientation="vertical">
            <ReflexElement>
              <MainTabView/>
            </ReflexElement>

            <ReflexSplitter/>

            <ReflexElement size="700">
              <div>
                <label>
                  Video preview.
                </label>
              </div>
            </ReflexElement>
          </ReflexContainer>
        </ReflexElement>

        <ReflexSplitter/>

        <ReflexElement size="300">
          <div>
            <label>
              Timeline.
            </label>
          </div>
        </ReflexElement>

      </ReflexContainer>
    )
  }
}

ReactDOM.render(<SplitLayout/>,
  document.getElementById('main-layout'))