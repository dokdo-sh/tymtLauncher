use std::fs;
use std::io;
use std::path::Path;

use futures::future::poll_fn;
use futures::prelude::*;
use tokio;

fn download_file(url: &str, target: &Path) -> impl Future<Output = io::Result<()>> {
  // Start the download in a separate thread using tokio::spawn
  tokio::spawn(async move {
    // Use reqwest to download the file
    let response = reqwest::get(url).await?;

    // Create the target file
    let mut file = fs::File::create(target)?;

    // Write the response body to the target file
    io::copy(&mut response, &mut file)?;

    Ok(())
  })
}

// Poll the status of the download using poll_fn
async fn check_download_status(
  download: impl Future<Output = io::Result<()>>,
) -> io::Result<()> {
  poll_fn(|cx| download.poll(cx)).await
}

#[tauri::command]
async fn download_and_check_status(url: &str, target: &Path) -> io::Result<()> {
  // Start the download
  let download = download_file(url, target);

  // Poll the download status until it is complete or an error occurs
  check_download_status(download).await
}
