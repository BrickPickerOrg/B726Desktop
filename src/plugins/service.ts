import axios from 'axios';
import fileDownload from 'js-file-download';
import JsFileDownloader from 'js-file-downloader';

interface AxiosConfig {
  baseUrl: string;
  timeout: number;
}

interface RequestParams {
  url: string;
  data?: object;
  method?: string;
  contentType?: string;
}

export default class Service {
  axios: any;
  constructor(config: AxiosConfig) {
    const { baseUrl, timeout } = config;
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    };

    this.axios = axios.create({
      baseURL: baseUrl,
      timeout: timeout,
      headers,
      responseType: 'json'
    });

    this.axios.interceptors.request.use(
      (config: any) => config,
      (error: any) => {
        Promise.reject(error);
      }
    );

    this.axios.interceptors.response.use(
      (response: any) => {
        return Promise.resolve(response.data);
      },
      (error: any) => {
        if (error.response) {
          // if (error.response.status >= 500) {
          // }
          return Promise.reject(error);
        }
      }
    );
  }

  async download(url: string, filename: string) {
    // const res = this.axios.get(url, { responseType: 'blob' })
    // fileDownload(res.data, filename);

    new JsFileDownloader({ url: url })
  }

  async req(params: RequestParams) {
    const { url, data, method = 'GET', contentType = 'application/json' } = params;

    const reg = /get/i;
    const parameter = reg.test(method) ? { params: data } : { data };
    const options = {
      url: `${url}`,
      contentType,
      ...parameter,
      method
    };
    try {
      const res = await this.axios(options);
      return Promise.resolve(res);
    } catch (err) {
      if (err.message === 'Network Error') {
        throw err;
      } else {
        const error = err.response.data;
        return Promise.reject(error);
      }
    }
  }
}
