import request from '../utils/request';
import {stringify} from 'qs';

export function query() {
  return request('/api/users');
}

export function content() {
  return request('http://chat.guolh.com:3000/api/chatContent');
  // return request('http://127.0.0.1:3000/api/chatContent');
}

export function addContent(body) {
  return request(
    'http://chat.guolh.com:3000/api/saveChatContent',
    // 'http://127.0.0.1:3000/api/saveChatContent',
    {
      method: 'POST',
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded"
      },
      body: stringify(body)
    }
  );
}

export function login(body) {
  return request(
    'http://chat.guolh.com:3000/api/login',
    // 'http://127.0.0.1:3000/api/login',
    {
      method: 'POST',
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded"
      },
      body: stringify(body)
    }
  );
}

export function register(body) {
  return request(
    'http://chat.guolh.com:3000/api/register',
    // 'http://127.0.0.1:3000/api/register',
    {
      method: 'POST',
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded"
      },
      body: stringify(body)
    }
  );
}
