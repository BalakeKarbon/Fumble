import { io } from "socket.io-client";

// Simulate User A (ID 1) and User B (ID 2)
const socketA = io("http://localhost:3000");
const socketB = io("http://localhost:3000");

let step = 0;

socketA.on("connect", () => {
  console.log("User A connected");
  socketA.emit("join", "1");
});

socketB.on("connect", () => {
  console.log("User B connected");
  socketB.emit("join", "2");

  // Wait a bit then start flow
  setTimeout(startFlow, 1000);
});

function startFlow() {
  console.log("\n--- STEP 1: User A swipes right on User B ---");
  socketA.emit("swipe", { to: "2", direction: "right" });

  // Check persistence via get_swipes
  setTimeout(() => {
    socketA.emit("get_swipes");
  }, 500);
}

socketA.on("swipes_history", (ids) => {
  if (ids.includes("2")) {
    console.log("SUCCESS: User A swipe recorded.");
    if (step === 0) {
      step = 1;
      console.log("\n--- STEP 2: User B swipes right on User A (Should trigger match) ---");
      socketB.emit("swipe", { to: "1", direction: "right" });
    }
  }
});

socketA.on("new_match", (data) => {
  console.log("User A received MATCH event with:", data.with);
  if (data.with === "2") {
    console.log("SUCCESS: User A matched with User B");
  }
});

socketB.on("new_match", (data) => {
  console.log("User B received MATCH event with:", data.with);
  if (data.with === "1") {
    console.log("SUCCESS: User B matched with User A");
    finish();
  }
});

function finish() {
  console.log("\n--- Verification Complete ---");
  setTimeout(() => {
    socketA.disconnect();
    socketB.disconnect();
    process.exit(0);
  }, 1000);
}
