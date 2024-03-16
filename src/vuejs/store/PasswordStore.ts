import {defineStore} from "pinia";
import {inject, ref} from "vue";
import dayjs from "dayjs";

// Type
import type { Ref} from "vue";
import type {Logger, RootLogger} from "loglevel";
import type {DisplayError} from "@/model/DisplayError";
import type {ServerVO} from "@/model/api/ServerVO";
import type {PasswordVO} from "@/model/api/PasswordVO";
import axios from "axios";

export const usePasswordStore = defineStore('PasswordStore', () => {
    const logger: Logger = (inject('logger') as RootLogger).getLogger('PasswordStore');
    const serverList:Ref<ServerVO[]> = ref([
        { host : "server-01", name: "Name of server-01", description: `Une super description de server-01`},
        { host : "server-02", name: "Name of server-02", description: `Une super description de server-02`},
        { host : "server-03", name: "Name of server-03", description: `Une super description de server-03`},
        { host : "server-04", name: "Name of server-04", description: `Une super description de server-04`}
    ]);

    const error: Ref<Error | DisplayError | undefined> = ref();


    function fetchServerList(): Promise<ServerVO[]> {
        logger.info(`GET Server List for password`);
        return Promise.resolve().then(() => { 
            return serverList.value;
        }).then(servers => {
            serverList.value = servers;
            return servers;
        });
    }

    function getPassword(host: string|undefined): Promise<PasswordVO> {
        if (!host) {
            return Promise.reject("No Host");
        }
        // Check Password in List
        const serverMaths =  serverList.value.filter( server => server.host === host);
        const server = serverMaths.length == 1 ? serverMaths[0] : undefined;
        if ( !server ) {
           return Promise.reject(`No Server for Host ${host}`);
       }
        //
        logger.info(`GET password for host=${host}`);
        // TODO   axios.defaults.withCredentials = true
        return axios.get(`/bfflaps/password.sh?${host}`,  { withCredentials: true } ) // TODO { params: { host}}
            .then( (res) => res.data)
            .then( (data:PasswordVO) => {
                return {server, ...data};
            });
        // return Promise.resolve().then(()=> {
        //     const validityDuration = dayjs.duration({ minutes: 12 });
        //     const validity = dayjs().add(validityDuration);
        //     const pass: PasswordVO = {
        //         host,server,
        //         password: `Password de ${host}`,
        //         validity: validity.toDate()
        //     }
        //     return pass;
        // });
    }

    return {
        serverList, fetchServerList,
        error, getPassword
    };


});
