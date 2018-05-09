import ReactDOM from 'react-dom'
import React from 'react'

import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement
} from 'react-reflex'

import './style.css';
import 'react-reflex/styles.css';

class ReflexBasicSplitterDemo
  extends React.Component {

  render () {
    return (
      <ReflexContainer orientation="horizontal">

        <ReflexElement>
          <ReflexContainer orientation="vertical">
            <ReflexElement>
              <div>
                <label>
                  Asset browser and properties editor.
                </label>
              </div>
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

ReactDOM.render(
    <ReflexBasicSplitterDemo/>
  ,
  document.getElementById('main-layout'))