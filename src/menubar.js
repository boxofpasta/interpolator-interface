import React from 'react';
import ReactDOM from 'react-dom';

// Button imports.
import FlatButton from 'material-ui/FlatButton';

// Menu imports.
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

// Paper imports.
import Paper from 'material-ui/Paper';

import './style.css';

const paperStyle = {
  textAlign: 'left',
  display: 'inline-block',
  width: '100%',
  backgroundColor: '#eeeeee',
};

export default class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openFileMenu: false,
      openEditMenu: false,
      openViewMenu: false,
      openHelpMenu: false,
    };
  }

  handleFileClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      openFileMenu: true,
      anchorEl: event.currentTarget
    });
  }

  handleEditClick = (event) => {
    event.preventDefault();
    this.setState({
      openEditMenu: true,
      anchorEl: event.currentTarget
    });
  }

  handleViewClick = (event) => {
    event.preventDefault();
    this.setState({
      openViewMenu: true,
      anchorEl: event.currentTarget
    });
  }

  handleChangeView = (view) => {
    this.handleRequestClose();
    this.props.cbChangeMainView(view);
  }

  handleHelpClick = (event) => {
    event.preventDefault();
    this.setState({
      openHelpMenu: true,
      anchorEl: event.currentTarget
    });
  }

  handleRequestClose = () => {
    this.setState({
      openFileMenu: false,
      openEditMenu: false,
      openViewMenu: false,
      openHelpMenu: false,
    });
  };

  render() {
    return (
      <div id="menu-bar">
        <Paper style={paperStyle} zDepth={2}>
          <FlatButton label="File" onClick={this.handleFileClick} />
          <Popover
            open={this.state.openFileMenu}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
            animation={PopoverAnimationVertical}>
            <Menu>
              <MenuItem primaryText="Open" />
              <MenuItem primaryText="Save" />
              <MenuItem primaryText="Save as" />
              <MenuItem primaryText="Export" />
            </Menu>
          </Popover>
          <FlatButton label="Edit" onClick={this.handleEditClick} />
          <Popover
            open={this.state.openEditMenu}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
            animation={PopoverAnimationVertical}>
            <Menu>
              <MenuItem primaryText="Cut" />
              <MenuItem primaryText="Copy" />
              <MenuItem primaryText="Paste" />
            </Menu>
          </Popover>
          <FlatButton label="View" onClick={this.handleViewClick} />
          <Popover
            open={this.state.openViewMenu}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
            animation={PopoverAnimationVertical}>
            <Menu>
              <MenuItem primaryText="Zoom in" />
              <MenuItem primaryText="Zoom out" />
              <MenuItem primaryText="Commandline" />
              <MenuItem onClick={this.handleChangeView.bind(this, 'main')} primaryText="Main Window" />
              <MenuItem onClick={this.handleChangeView.bind(this, 'hint')} primaryText="Hint Window" />
            </Menu>
          </Popover>
          <FlatButton label="Help" onClick={this.handleHelpClick} />
          <Popover
            open={this.state.openHelpMenu}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
            animation={PopoverAnimationVertical}>
            <Menu>
              <MenuItem primaryText="Version" />
              <MenuItem primaryText="About" />
            </Menu>
          </Popover>
        </Paper>
      </div>
    );
  }
}
