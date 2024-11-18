import { LoginResult, RsultVerify } from "@/types/api";
import request from "@/utils/request";

export function login(data: object) {
  return request.post<LoginResult>("/login", data, { showLoading: false });
}

export function getCodeImg(params?: object) {
  return request.get<RsultVerify>("/captchaImage", params, {
    headers: {
      isToken: false,
      noLoading: true,
    },
  });
}
