export class TokenDetails {
  constructor(
    public access_token: string,
    public scope: string,
    public id_token: string,
    public token_type: string,
    public expires_in: number
  ) {}
}
