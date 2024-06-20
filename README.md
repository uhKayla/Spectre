![logobanner.png](assets/logobanner.png)

# Spectre
A lightweight friends list manager for VRChat. Built on Sveltekit + Tauri. Thanks to Tauri, Spectre is cross-platform by default, with potential support for mobile in the future.

## Warning
This project is largely under development, security may not be perfect. VRC's official stance on using their API is to use it non-maliciously, spectre performs no malicious functions, but makes a large number of API calls. I am not responsible for your account getting rate-limited or locked.

## Building

For development:
```shell 
cargo tauri dev
```

For production:
```shell
cargo tauri build
```

## Current Features

- Dashboard: Get a quick overview of your friends online and the current VRChat player count.
- Friends List: See who's online and their status.

## WIP
- User / World Cards: Show data on users and worlds.
- Friends List Filters: Adjust how your friends list is organized.
- Feed: A websocket feed with customizable filters for events.
- Settings: A more customizable experience.