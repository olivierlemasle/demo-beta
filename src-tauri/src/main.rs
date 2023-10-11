// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;

use tauri::Manager;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[derive(serde::Serialize)]
struct Resource {
    path: String,
    content: String,
}

#[tauri::command]
fn resolve_resource(app_handle: tauri::AppHandle, path: &str) -> Result<Resource, String> {
    let path = &app_handle
        .path()
        .resolve(path, tauri::path::BaseDirectory::Resource)
        .map_err(|_| "Did not resolve")?;

    fs::read_to_string(path)
        .map_err(|err| format!("Failed reading {}: {}", &path.to_string_lossy(), err))
        .map(|content| Resource {
            path: path.to_string_lossy().to_string(),
            content,
        })
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet, resolve_resource])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
