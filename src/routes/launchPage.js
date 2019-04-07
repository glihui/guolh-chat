import React from 'react';
import { connect } from 'dva';
import styles from './launchPage.css';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';



class launchPage extends React.Component {

  state = {
    avatarData: require('../assets/uploadAvatar.png'),
    username: '',
    password: '',
  };

  componentDidMount = () => {

  }

  componentWillMount = () => {

  }

  avatarUpload= (e) => {
    let fileDom = document.getElementById('avatarInput');
    let file = fileDom.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.setState({
        avatarData:reader.result
      })
    }
  }

  //登录
  goLogin = () => {
    let sendData = this.props.form.getFieldsValue();

    if (sendData.username == '' || sendData.username == undefined ||
      sendData.password == '' || sendData.password == undefined) {
      Toast.info('完善表格', 1);
    } else {

      sendData['avatar'] = this.state.avatarData;

      this.props.dispatch({
        type: 'auth/fetchLogin',
        payload : sendData,
      }).then(() => {

      })
    }
  }

  //注册
  goRegister = () => {
    let sendData = this.props.form.getFieldsValue();
    if (sendData.username == '' || sendData.password == '') {
      Toast.info('完善表格', 1);
    } else {

      sendData['avatar'] = this.state.avatarData;

      this.props.dispatch({
        type: 'auth/fetchRegister',
        payload : sendData,
      }).then(() => {

      })
    }
  }


  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className={styles.bg}>
        <div className={styles.avatarDiv}>
          <div className={styles.avatarText}>
            <img src={this.state.avatarData}/>
          </div>
          <input id="avatarInput" type="file" onChange={this.avatarUpload} />
        </div>
        <List className={styles.listInput}>
          <InputItem
            {...getFieldProps('username')}
            placeholder="给自己起个靓名呗"
          >
            <div className={styles.usernameIcon}>
              <img src={require('../assets/username.png')}/>
            </div>
          </InputItem>
          <InputItem
            {...getFieldProps('password')}
            placeholder="给靓名设个密码呗"
            type={"password"}
          >
            <div className={styles.usernameIcon}>
              <img src={require('../assets/password.png')}/>
            </div>
          </InputItem>
        </List>
        <div className={`${styles.btnDiv} ${styles.loginBtn}`}>
          <Button type="primary" onClick={this.goLogin}>登录</Button>
        </div>
        <div className={styles.btnDiv}>
          <Button type="primary" onClick={this.goRegister}>注册</Button>
        </div>
      </div>
    );
  }
}



function mapStateToProps(state){  //见名知意，把state转换为props
  //可以打印state看看数据结构，然后放到data里
  return {
    auth: state.auth
  };
};

const launchPageFlag = createForm()(launchPage);

export default connect(mapStateToProps)(launchPageFlag);
