import { LoginResult, RsultVerify } from "@/types/api";
import request from "@/utils/request";

export function login(data: object) {
  return request.post<LoginResult>("/login", data, { showLoading: false });
}

export function getCodeImg() {
  return request.get<RsultVerify>("/captchaImage", {
    headers: {
      isToken: false,
    },
  });
}
