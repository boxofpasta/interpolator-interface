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
        <MuiThemeProvider muiTheme={muiTheme}>
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
