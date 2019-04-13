import * as serverFun from '../services/example';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';
export default {

  namespace: 'auth',

  state: {
    auth: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *fetchLogin({ payload: data }, { call, put }) {
      console.log('sdd');
      console.log(data);
      // serverFun.login(data);
      const result = yield serverFun.login(data);
      console.log(result);
      yield put({
        type: 'save',
        payload: {
          auth: result.data
        }
      });
      if (result.data.ok == 1) {
        Toast.info('登录成功', 1);
        yield put(routerRedux.push('/chat'));
      } else {
        Toast.info(result.data.message, 1);
      }
    },
    *fetchRegister({ payload: data }, { call, put }) {
      console.log('sdd');
      console.log(data);
      Toast.loading('加载中...', 0);
      // serverFun.login(data);
      const result = yield serverFun.register(data);
      console.log(result);
      Toast.hide();
      yield put({
        type: 'save',
        payload: {
          auth: result.data
        }
      });
      if (result.data.ok == 1) {
        Toast.info('注册成功', 1);
        yield put(routerRedux.push('/chat'));
      } else {
        Toast.info(result.data.message, 1);
      }
    },
    *fetchAddContent({ payload : {chatList} }, { call, put }) {
      console.log('sdd');
      console.log(chatList);
      serverFun.addContent({content: chatList})
    },
    *updateUser({ payload: data }, { call, put }) {
      console.log(data);
      yield put({
        type: 'save',
        payload: {
          auth: {data:data}
        }
      });
    }
  },

  reducers: {
    save(state, { payload }) {
      console.log(payload);
      console.log(payload.auth.data);

      window.localStorage.setItem('auth', JSON.stringify(payload.auth.data))

      return {
        ...state,
        ...payload
      };
    },
    addMsg(state, { payload }) {
      console.log(payload)
      return {
        ...state,
        ...payload
      };
    },
  },

};
