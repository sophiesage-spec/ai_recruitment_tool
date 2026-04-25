import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']); // Forces Google and Cloudflare DNS

import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 4000;

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`\n🚀 AI Talent Screener is running on http://localhost:${PORT}`);
      console.log(`📋 Health check: http://localhost:${PORT}/`);
      console.log(`🔍 Job search:   http://localhost:${PORT}/api/jobs/search?title=`);
      console.log(`🤖 AI screening: POST http://localhost:${PORT}/api/screen/:jobId\n`);
    });

    server.on("error", (error: Error) => {
      console.error("❌ Server error:", error);
      throw error;
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
