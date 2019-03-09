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

    this.io = new socket("ws://chat.guolh.com:3000");
    // this.io = new socket("ws://127.0.0.1:3000");
    this.io.on('connect', () => {
      this.io.send({'content': 'spl'});
      this.io.on('message', (msg) => {
        console.log(msg);
        this.setState({
          chatContent : [...this.state.chatContent, msg]
        }, () => {
          setTimeout(() =>{
            document.getElementById("chatBoxDiv").scrollTop = document.getElementById("chatBoxDiv").scrollHeight;
          }, 500);
        });
      })
    });

    console.log(this.props)
    this.props.dispatch({
      type: 'content/fetchContent',
      payload : {},
    }).then(() => {
      var chatList = this.props.content.chatList != undefined ? this.props.content.chatList.data : [];
      console.log(chatList)
      this.setState({
        chatContent : chatList
      }, () => {
        setTimeout(() =>{
          document.getElementById("chatBoxDiv").scrollTop = document.getElementById("chatBoxDiv").scrollHeight;
        }, 500);
      });
      }
    );



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
    // this.io.send(this.state.msgValue);
    this.props.dispatch({
      type: 'content/fetchAddContent',
      payload : {
        chatList: this.state.msgValue
      },
    }).then(() => {
      this.setState({
        msgValue: ""
      });
    })


  }


  render() {
    console.log(this.state.chatContent);
    return (
      <div className={styles.bigChat}>
        <div className={styles.chatBox} id="chatBoxDiv">
          {
            this.state.chatContent.map((item, index) => {
              return (
                <div key={index} className={styles.chatDiv}>
                  <div className={styles.avatar}>
                    <img src={require('../assets/qq.jpg')}/>
                  </div>
                  <div className={styles.chatItem}>{item.content}</div>
                </div>
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



function mapStateToProps(state){  //见名知意，把state转换为props
  //可以打印state看看数据结构，然后放到data里
  return {
    content: state.content
  };
};

export default connect(mapStateToProps)(IndexPage);
