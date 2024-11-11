interface AuthHeaderType {
    "X-Requested-With": string;
    "Content-Language": string;
    "Authorization"?: string;
}

export function guestHeader(): AuthHeaderType {
    let language = localStorage.getItem("Language");
    return {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Language": language ?? "en",
    };
  }