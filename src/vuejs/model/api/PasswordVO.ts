import type {ServerVO} from "@/model/api/ServerVO";

export type PasswordVO = {
    host: string;
    password: string;
    validity: Date;
    server?: ServerVO;
};