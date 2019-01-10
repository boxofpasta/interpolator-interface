import React from 'react';
import ReactDOM from 'react-dom';

// Button imports.
import Button from '@material-ui/core/Button';

// Menu imports.
import Popover from '@material-ui/core/Popover';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

// Paper imports.
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
          <Button onClick={this.handleFileClick}>
            File
          </Button>
          <Popover
            open={this.state.openFileMenu}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onClose={this.handleRequestClose}>
            <MenuList>
              <MenuItem>Open</MenuItem>
              <MenuItem>Save</MenuItem>
              <MenuItem>Save as</MenuItem>
              <MenuItem>Export</MenuItem>
            </MenuList>
          </Popover>
          <Button onClick={this.handleEditClick}>
            Edit
          </Button>
          <Popover
            open={this.state.openEditMenu}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onClose={this.handleRequestClose}>
            <MenuList>
              <MenuItem>Cut</MenuItem>
              <MenuItem>Copy</MenuItem>
              <MenuItem>Paste</MenuItem>
            </MenuList>
          </Popover>
          <Button onClick={this.handleViewClick}>
            View
          </Button>
          <Popover
            open={this.state.openViewMenu}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onClose={this.handleRequestClose}>
            <MenuList>
              <MenuItem>Zoom in</MenuItem>
              <MenuItem>Zoom out</MenuItem>
              <MenuItem>Commandline</MenuItem>
              <MenuItem onClick={this.handleChangeView.bind(this, 'main')}>Main Window</MenuItem>
              <MenuItem onClick={this.handleChangeView.bind(this, 'hint')}>Hint Window</MenuItem>
            </MenuList>
          </Popover>
          <Button onClick={this.handleHelpClick}>
            Help
          </Button>
          <Popover
            open={this.state.openHelpMenu}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onClose={this.handleRequestClose}>
            <MenuList>
              <MenuItem>Version</MenuItem>
              <MenuItem>About</MenuItem>
            </MenuList>
          </Popover>
        </Paper>
      </div>
    );
  }
}
