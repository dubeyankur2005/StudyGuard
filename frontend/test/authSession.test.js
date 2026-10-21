import test from "node:test";
import assert from "node:assert/strict";
import { restoreSession } from "../src/auth/session.js";

test("restores the user from a saved token without discarding it", async () => {
  let cleared = false;
  const result = await restoreSession({
    token: "saved-token",
    fetchUser: async () => ({ id: "user-1" }),
    onInvalidToken: () => { cleared = true; },
  });
  assert.deepEqual(result, { user: { id: "user-1" }, retryable: false });
  assert.equal(cleared, false);
});

test("clears an expired or invalid token only after a 401", async () => {
  let cleared = false;
  const result = await restoreSession({
    token: "invalid-token",
    fetchUser: async () => { throw Object.assign(new Error("Unauthorized"), { response: { status: 401 } }); },
    onInvalidToken: () => { cleared = true; },
  });
  assert.deepEqual(result, { user: null, retryable: false });
  assert.equal(cleared, true);
});

test("keeps a saved token retryable when session verification has a transient failure", async () => {
  let cleared = false;
  const result = await restoreSession({
    token: "saved-token",
    fetchUser: async () => { throw new Error("Network unavailable"); },
    onInvalidToken: () => { cleared = true; },
  });
  assert.deepEqual(result, { user: null, retryable: true });
  assert.equal(cleared, false);
});
