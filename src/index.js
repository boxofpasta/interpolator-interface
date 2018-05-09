import ReactDOM from 'react-dom'
import React from 'react'

import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement
} from 'react-reflex'

// Custom component imports.
import MainTabView from './maintabview.js'
import MenuBar from './menubar.js'

// Theme imports.
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';

// CSS imports.
import './style.css';
import './reflexstyle.css';

// Global theme.
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  }
});

class SplitLayout extends React.Component {
  render () {
    return (
      <div id="main">
        <MuiThemeProvider muiTheme={muiTheme}>
          <MenuBar/>
          <div id="layout">
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
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

ReactDOM.render(<SplitLayout/>,
  document.getElementById('main'))