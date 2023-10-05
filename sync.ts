import { runMigration } from "./internal/db/run-migration";

runMigration().then(() => {
  process.on("exit", (code) => {
    console.log(`Script exiting with code: ${code}`);
    // Perform any cleanup or finalization tasks here, if needed
    // This code will run when the script is about to exit
  });
  // Terminate the process explicitly
  process.exit(); // This will exit the script
});
