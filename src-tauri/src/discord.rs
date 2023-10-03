extern crate serenity;

use serenity::{
    client::Client,
    framework::standard::StandardFramework,
};

fn main() {
    let mut client = Client::new("my-bot-token", StandardFramework)
        .expect("Error creating Discord client");

    client.with_framework(|f| {
        f.set_presence(Some("Playing <game>"), None);
    });

    if let Err(why) = client.start() {
        println!("An error occurred while running the client: {:?}", why);
    }
}
