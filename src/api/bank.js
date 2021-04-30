import axios from 'axios'
import {Message} from 'element-ui';

export const deleteRequest=(url,params)=>{
  return axios({
    method:'delete',
    url:`${url}`,
    data:params
  })
}

export const putRequest=(url,params)=>{
  return axios({
    method:'put',
    url:`${url}`,
    data:params
  })
}
