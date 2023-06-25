export function handleDisablePageScroll(flag) {
  if (flag) {
    sessionStorage.setItem("__scrollTop", document.scrollingElement.scrollTop);
    document.body.style.top = `${-document.scrollingElement.scrollTop}px`;
    document.body.style.position = "fixed";
  } else {
    document.body.style.position = "static";
    document.body.style.top = `auto`;
    document.scrollingElement.scrollTop = Number(
      sessionStorage.getItem("__scrollTop")
    );
  }
}

export function handleHideString(
  string = "",
  start = 0,
  count = string.toString().length
) {
  const stringArr = string.toString().split("");
  return `${stringArr.slice(0, start).join("")}${stringArr
    .slice(start, start + count)
    .map(() => "*")
    .join("")}${stringArr.slice(start + count).join("")}`;
}

export function formatPrice(amount = 0) {
  if (amount === null) {
    return "";
  }
  const [integer, decimal] = amount.toString().split(".");
  let [...strArr] = integer;
  let newStrArr = [];
  let i = 0;
  const flag = integer.includes("-");
  strArr
    .filter((item) => {
      return item !== "-";
    })
    .reverse()
    .forEach((item, index) => {
      if (i < 3) {
        i++;
        newStrArr.push(item);
      } else {
        i = 1;
        newStrArr.push(",");
        newStrArr.push(item);
      }
    });
  if (flag) {
    newStrArr.push("-");
  }
  return `${newStrArr.reverse().join("")}.${decimal ? decimal : "00"}`;
}

export function wxAuth() {
  // 是否是企业微信环境
  const env = import.meta.env;
  const isWXWork = navigator.userAgent.includes("wxwork");
  const urlParams = new URLSearchParams(location.search);
  const scope = "snsapi_base",
    appId = env[isWXWork ? "VITE_CORPID" : "VITE_APPID"],
    agentId = env["VITE_AGENTID"],
    oauth2 = env["VITE_WWLOGINURL"],
    state = urlParams.get("state") || "STATE",
    redirectUri = encodeURIComponent(
      env[isWXWork ? "VITE_QYREDIRECTURI" : "VITE_REDIRCTURI"]
    );
  location.replace(
    `${oauth2}?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&agentid=${agentId}&state=${state}#wechat_redirect`
  );
}
