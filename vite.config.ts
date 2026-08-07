import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import fs from "fs";
import path from "path";

function localCmsPlugin() {
  return {
    name: "local-cms-plugin",
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (req.url === "/api/save-json" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk: any) => {
            body += chunk.toString();
          });
          req.on("end", () => {
            try {
              const { filePath, content } = JSON.parse(body);
              // Ensure filePath is within the project directory for security
              const fullPath = path.resolve(process.cwd(), filePath);
              if (fullPath.startsWith(process.cwd())) {
                fs.writeFileSync(fullPath, content);
                res.statusCode = 200;
                res.end(JSON.stringify({ success: true }));
              } else {
                res.statusCode = 403;
                res.end("Forbidden");
              }
            } catch (error) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: "Failed to write file locally" }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), localCmsPlugin()],
  esbuild: {
    drop: mode === "production" ? ["console", "debugger"] : [],
  },
}));
