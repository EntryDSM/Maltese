export interface AccessToken {
  accessToken: string;
}

export interface ReceiptCode {
  receiptCode: number;
}

export interface PagenationPayload {
  offset: number;
}

export interface Authentication {
  token: string;
  type: "admin" | "student";
}

export interface SendContent {
  content: string;
}

export interface SocketError {
  status: number;
  code: string;
}

export interface User {
  qna_id: number;
  admin_email: string;
  user_email: string;
  to: "admin" | "student";
  content: string;
  created_at: string;
}
