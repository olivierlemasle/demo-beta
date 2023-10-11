use std::{env, error::Error};

use chrono::Utc;

fn main() -> Result<(), Box<dyn Error>> {
    let now = Utc::now().to_rfc2822();
    let exe = env::current_exe()?;
    let exe = exe.to_string_lossy();
    println!("Hello from {exe}\n at {now}\n");
    Ok(())
}
