export {};

export type Roles = "admin" | "engineer" | "sales";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
