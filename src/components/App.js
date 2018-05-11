import ReactDOM from 'react-dom';
import React from 'react';

import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement
} from 'react-reflex';

// Custom component imports.
import MainTabView from './MainTabView';
import MenuBar from './MenuBar';

// Theme imports.
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';

// CSS imports.
import './reflexstyle.css';

// Global theme.
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  }
});

const styles = {
  layout : {
    height: '100%',
    width: '100%',
    position: 'relative'
  }
};

export default class App extends React.Component {
  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <MenuBar/>
        <div id="layout" style={styles.layout}>
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
    )
  }
}