import "next-auth";

declare module "next-auth" {
  interface User {
    role: "ADMIN" | "EDITOR" | "VOLUNTEER";
    status: "ACTIVE" | "DISABLED";
  }

  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
      role: "ADMIN" | "EDITOR" | "VOLUNTEER";
      status: "ACTIVE" | "DISABLED";
    };
  }
}
