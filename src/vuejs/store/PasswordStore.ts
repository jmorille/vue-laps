import {defineStore} from "pinia";
import {  inject, ref } from 'vue';


// Type
import type { Ref} from "vue";
import type {Logger, RootLogger} from "loglevel";
import type {DisplayError} from "@/model/DisplayError";
import type {ServerVO} from "@/model/api/ServerVO";
import type {PasswordVO} from "@/model/api/PasswordVO";
import axios from "axios";

export const usePasswordStore = defineStore('password', () => {
    const logger: Logger = (inject('logger') as RootLogger).getLogger('PasswordStore');
    const serverList:Ref<ServerVO[]> =  ref([]);

    const error: Ref<Error | DisplayError | undefined> = ref();



  /**
   * Fetches the list of servers from the server password endpoint.
   * @returns {Promise<ServerVO[]>} A promise that resolves to an array of ServerVO objects.
   */
    function fetchServerList(): Promise<ServerVO[]> {
        logger.info(`GET Server List for password`);
        return axios.get(`/api/server-password.json`,  { withCredentials: true } )
          .then( (res) => res.data)
          .then( (data:ServerVO[]) => {
              serverList.value = data;
              return data;
          }).catch(err => {
            error.value = err;
            serverList.value =[];
            logger.error(`Error fetch /api/server-password.json : ${err.message}`, err);
            return err;
          });
    }

    async function getPassword(host: string|undefined): Promise<PasswordVO> {
        if (!host) {
            return Promise.reject("No Host");
        }
        // Check Password in List
        if (serverList.value.length==0) {
          await fetchServerList();
        }
        const serverMaths =  serverList.value.filter( server => server.host === host);
        const server = serverMaths.length == 1 ? serverMaths[0] : undefined;
        if ( !server ) {
           return Promise.reject(`No Server for Host ${host}`);
       }
        //
        logger.info(`GET password for host=${host}`);
        return axios.get(`/cgi-bin/password.ps1?${host}`,  { withCredentials: true } ) // TODO { params: { host}}
            .then( (res) => res.data)
            .then( (data:PasswordVO) => {
                return {server, ...data};
            }).catch( (err) => {
            error.value = err;
            logger.error(`Error fetch /bfflaps/password.sh?${host} : ${err.message}`, err);
            return err;
          });
    }

    return {
        serverList, fetchServerList,
        error, getPassword,
        //host, password
    };


});
