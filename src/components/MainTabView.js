import React from 'react';
import ReactDOM from 'react-dom';

// Tab imports.
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views.
import SwipeableViews from 'react-swipeable-views';

import styles from './MainTabView.css';
export default class MainTabView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  }

  render() {
    return (
      <div>
        <Tabs onChange={this.handleChange} value={this.state.slideIndex}>
          <Tab label="Asset browser" value={0} />
          <Tab label="Properties" value={1} />
        </Tabs>
        <SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChange}>
          <div>
            <h2 className={styles.headline}>Asset browser goes here.</h2>
          </div>
          <div>
            <h2 className={styles.headline}>Properties go here.</h2>
          </div>
        </SwipeableViews>
      </div>
    );
  }
}