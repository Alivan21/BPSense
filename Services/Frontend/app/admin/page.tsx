"use client";

import { withGuardAdmin } from "@/hoc/with-guard-admin";

function AdminPage() {
  return (
    <div>
      <h1>Hallo ini halaman admin</h1>
    </div>
  );
}

export default withGuardAdmin(AdminPage);
