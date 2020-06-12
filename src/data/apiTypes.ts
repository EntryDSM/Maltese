export interface AccessToken {
  accessToken: string;
}

export interface User {
  qna_id: number;
  admin_email: string;
  user_email: string;
  to: "admin" | "student";
  content: string;
  created_at: string;
}
