import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./ResourceReader.css";

function ResourceReader() {
  const [path, setPath] = useState("");
  const [resolvedPath, setResolvedPath] = useState("");
  const [content, setContent] = useState("");

  function readResource() {
    invoke<{ content: string; path: string }>("resolve_resource", { path })
      .then(({ content, path }) => {
        setContent(content);
        setResolvedPath("Resolved path: " + path);
      })
      .catch((e: string) => {
        setContent("Error: " + e);
      });
  }
  return (
    <>
      <div className="row">
        <input
          id="path-input"
          onChange={(e) => setPath(e.currentTarget.value)}
          placeholder="Enter a path..."
          value={path}
          onKeyDown={(e) => {
            if (e.key === "Enter") readResource();
          }}
        />
        <button
          type="button"
          onClick={() => {
            readResource();
          }}
        >
          Resolve
        </button>
      </div>
      <p
        onClick={() => {
          setResolvedPath("");
        }}
      >
        {resolvedPath}
      </p>
      <pre
        onClick={() => {
          setContent("");
        }}
      >
        {content}
      </pre>
    </>
  );
}

export default ResourceReader;
