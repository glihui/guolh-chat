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

    console.log(this.props.auth.auth.data);
    if (this.props.auth.auth.data == undefined) {
      console.log(window.localStorage.getItem('auth'));
      this.props.dispatch({
        type: 'auth/updateUser',
        payload : JSON.parse(window.localStorage.getItem('auth')),
      })
    }

    // this.io = new socket("ws://chat.guolh.com:3000");
    this.io = new socket("ws://127.0.0.1:3000");
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
        chatList: {
          user_id: this.props.auth.auth.data.user_id,
          content:this.state.msgValue,
          user: this.props.auth.auth.data
        },
      },
    }).then(() => {
      this.setState({
        msgValue: ""
      });
    })




  }


  render() {
    console.log(this.props.auth.auth.data);
    let authData = this.props.auth.auth.data;
    return (
      <div className={styles.bigChat}>
        <div className={styles.chatBox} id="chatBoxDiv">
          {
            this.state.chatContent.map((item, index) => {
              return (
                <div key={index} className={authData != undefined && authData.user_id == item.user_id ?
                  styles.chatDivRight : styles.chatDiv}>
                  <div className={`${styles.avatar} ${
                    authData != undefined && authData.user_id == item.user_id ?
                      styles.avatarRight : ''
                    }`}>
                    <div className={`${styles.username} ${authData != undefined && authData.user_id == item.user_id ?
                    styles.usernameRight : styles.usernameLeft}`}>
                      {item.user.username}
                    </div>
                    {/*<img src={`http://localhost:3000/${item.user.avatar}`}/>*/}
                    <img src={`http://chat.guolh.com/${item.user.avatar}`}/>
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
    content: state.content,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(IndexPage);
