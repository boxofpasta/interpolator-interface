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
import styles from './App.css';
import './reflexstyle.css?raw';

// // To deal with mui overriding our own styles.
// // Copied from: https://material-ui-next.com/customization/css-in-js/#css-injection-order.
// import JssProvider from 'react-jss/lib/JssProvider';
// import { create } from 'jss';
// import { createGenerateClassName, jssPreset } from 'material-ui/styles';

// const styleNode = document.createComment("jss-insertion-point");
// document.head.insertBefore(styleNode, document.head.firstChild);

// const generateClassName = createGenerateClassName();
// const jss = create(jssPreset());

// // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
// jss.options.insertionPoint = 'jss-insertion-point';

// Global theme.
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  }
});

export default class App extends React.Component {
  render () {
    return (
      // <JssProvider jss={jss} generateClassName={generateClassName}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <MenuBar/>
          <div id="layout" className={styles['layout']}>
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
      //  </JssProvider>
    )
  }
}