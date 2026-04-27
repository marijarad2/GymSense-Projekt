import { writable } from "svelte/store";
import { browser } from "$app/environment";

let initialUser = null;

// nur im Browser auf localStorage zugreifen
if (browser) {
  const storedUser = localStorage.getItem("user");
  initialUser = storedUser ? JSON.parse(storedUser) : null;
}

export const user = writable(initialUser);

// speichern nur im Browser
if (browser) {
  user.subscribe((value) => {
    if (value) {
      localStorage.setItem("user", JSON.stringify(value));
    } else {
      localStorage.removeItem("user");
    }
  });
}