import React from 'react';
import ReactDOM from 'react-dom';

export default class HintCanvas extends React.Component {
  constructor(props) {
    super(props);

    // Set initial state.
    this.state = {
        worldLeft: 0,
        worldTop: 0,
        worldRight: 100,
        worldBottom: 100,
        opacity: 0.4 // Hardcoded for now
    };
  }

  publicChangeOpacity = (value) => {
    setState({opacity: value});
  }

  publicZoomIn = () => {
    setState({
        worldRight: this.state.worldRight * 1.1,
        worldBottom: this.state.worldBottom * 1.1
    });
  }

  publicZoomOut = () => {
    setState({
        worldRight: this.state.worldRight / 1.1,
        worldBottom: this.state.worldBottom / 1.1
    });
  }

  // On initial load.
  componentDidMount() {
    this.redrawCanvas()
  }

  redrawCanvas() {
    const canvas = this.refs.canvas;
    const width = canvas.getBoundingClientRect().width;
    const height = canvas.getBoundingClientRect().height;

    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.moveTo(10, 10);
      ctx.lineTo(40, 40);
      ctx.stroke();
      ctx.closePath();

      ctx.fillRect(25, 25, 100, 100);

      ctx.fillText('temp ' + this.state.worldRight, 0, 0);
    }
  }

  render() {
    return (
      <div>
        <canvas ref="canvas" />
      </div>
    );
  }
}
