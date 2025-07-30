import { apply, setAttr, remove } from "@directus/visual-editing";

let isApplied = false;

export async function initializeVisualEditor() {
  if (typeof window !== "undefined" && !isApplied) {
    try {
      console.log("Initializing visual editor...");

      // Wait a bit more to ensure all components are hydrated
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await apply({
        directusUrl: "http://localhost:8055",
        onSaved: async (data) => {
          console.log("Content saved successfully:", data);
          window.location.reload();
        },
      });

      isApplied = true;
      console.log("Visual editor initialized successfully");
    } catch (error) {
      console.error("Failed to initialize visual editor:", error);
    }
  }
}

export function cleanupVisualEditor() {
  if (typeof window !== "undefined" && isApplied) {
    remove();
    isApplied = false;
  }
}

export { setAttr };
