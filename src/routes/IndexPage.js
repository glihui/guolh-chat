import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import socket from 'socket.io-client';


class IndexPage extends React.Component {

  state = {
    msgValue:'',
    chatContent: []
  };

  io = null;
  componentDidMount = () => {

    this.io = new socket("ws://chat.guolh.com");
    this.io.on('connect', () => {
      this.io.send('我来o了');
      this.io.on('message', (msg) => {
        console.log(msg);
        this.setState({
          chatContent : [...this.state.chatContent, msg]
        });
      })
    })

  }

  componentWillMount = () => {
      if (this.io) {
        this.io.close();
      }
  }

  handleChange = (event) => {
    this.setState({
      msgValue: event.target.value
    });
  }

  sendMsg = () => {
    console.log(this.state.msgValue);
    this.io.send(this.state.msgValue);
  }


  render() {
    return (
      <div className={styles.bigChat}>
        <div className={styles.chatBox}>
          {
            this.state.chatContent.map((item, index) => {
              return (
                <div key={index}>{item}</div>
              );
            })
          }
        </div>
        <div className={styles.inputBox}>
          <input value={this.state.msgValue} onChange={this.handleChange}/>
          <div className={styles.sendBtn} onClick={this.sendMsg}>
            发送
          </div>
        </div>
      </div>
    );
  }
}


IndexPage.propTypes = {
};

export default connect()(IndexPage);
