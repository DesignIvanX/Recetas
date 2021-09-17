import React from "react";

export default class IfOffline extends React.Component {
  state = { offline: navigator ? navigator.onLine : true };
  constructor(props) {
    super(props);
    this.state = { offline: navigator ? navigator.onLine : true };
  }
  componentDidMount() {
    if (!window) return;
    window.addEventListener("online", this.goOnline);
    window.addEventListener("offline", this.goOffline);
  }
  componentWillUnmount() {
    window.removeEventListener("online", this.goOnline);
    window.removeEventListener("offline", this.goOffline);
  }

  goOnline = () => this.setState({ offline: true });

  goOffline = () => this.setState({ offline: false });

  render() {
    const { children } = this.props;
    const { offline } = this.state;
    console.log(offline);
    if (offline) return null;
    return <span>{children}</span>;
  }
}
