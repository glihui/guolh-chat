import * as serverFun from '../services/example';
export default {

  namespace: 'content',

  state: {
    chatList: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *fetchContent({ payload }, { call, put }) {
      console.log('sdd');
      const result = yield call(serverFun.content);
      console.log(result);
      yield put({
        type: 'save',
        payload: {
          chatList: result.data
        }
      });
    },
    *fetchAddContent({ payload : {chatList} }, { call, put }) {
      console.log('sdd');
      console.log(chatList);
      serverFun.addContent(chatList)
      // const result = yield call();
      // console.log(result);
      // yield put({
      //   type: 'save',
      //   payload: {
      //     chatList: result.data
      //   }
      // });
    },
  },

  reducers: {
    save(state, { payload }) {
      console.log(payload)
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
