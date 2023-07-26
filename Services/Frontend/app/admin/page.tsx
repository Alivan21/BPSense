"use client";
import { withGuardAdmin } from "@/hoc/with-guard-admin";

function AdminPage() {
  return (
    <section>
      <h1>Hallo ini halaman admin</h1>
    </section>
  );
}

export default withGuardAdmin(AdminPage);
