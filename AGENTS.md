<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the landing page as a single viewport-height composition with the hero above a responsive four-step section; this preserves the requested one-screen experience on phones and desktops.
- Serve the supplied sunset photo through a Lovable Assets pointer and use it as the hero background; this preserves the user's original artwork and prevents transient image sizing during preview refreshes.
- Keep the /about background as a token-based editorial mural rendered in the page layer rather than embedding the reference image; this preserves readability and responsive composition.
