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
import MainHintWindow from './mainhintwindow.js'

// Theme imports.
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';

// CSS imports.
import './style.css';
import './reflexstyle.css';

// Global theme.
const theme = createMuiTheme({
  palette: {
    accent1Color: orange,
  }
});

class SplitLayout extends React.Component {
  constructor(props) {
    super(props);

    // Set initial state.
    this.state = {
        currentView: 'hint'
    };
  }

  cbChangeMainView = (view) => {
    this.setState({currentView: view});
  }

  getMainComponent() {
    let mainComponent;
    var mainView = this.state.currentView;
    switch (mainView) {
      case 'hint':
        mainComponent = <MainHintWindow id="hint-window"/>;
        break;
      case 'main':
        mainComponent = (
          <ReflexContainer oritentation="horizontal">
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
        );
        break;
      default:
        alert("Invalid view: " + this.state.currentView);
        break;
    }
    return mainComponent;
  }

  render () {
    return (
      <div id="main">
        <MuiThemeProvider theme={theme}>
          <MenuBar cbChangeMainView={this.cbChangeMainView}/>
          <div id="layout">
            {this.getMainComponent()}
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

ReactDOM.render(<SplitLayout/>,
  document.getElementById('main'))
