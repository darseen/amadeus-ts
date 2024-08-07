export type AmadeusOAuth2TokenSuccessResponse = {
  type: "amadeusOAuth2Token";
  username: string;
  application_name: string;
  client_id: string;
  token_type: "Bearer";
  access_token: string;
  expires_in: number;
  state: string;
  scope: string;
};
