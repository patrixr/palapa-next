import { page, navbar, link, text } from '@palapa/core'

page('home', () => {
  navbar("header", () => {
    link("home", "/home");
  })
})
