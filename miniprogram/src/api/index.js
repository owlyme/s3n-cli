import {post, get} from '../utils/request';

export const Path = {
  indexInfo: '/indexInfo',
  indexGoodList: '/indexGoodList',
};

export const getIndexInfo = async (data) => {
  return get(Path.indexInfo, data);
};

export const getIndexGoodList = async (data) => {
  return get(Path.indexGoodList, data);
};




