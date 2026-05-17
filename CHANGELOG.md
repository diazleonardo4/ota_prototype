# HTS Prototype — Changelog

Notes from taking the original .jsx file and turning it into something I can actually run, demo, and iterate on. Three buckets: stuff that was broken, personalization work, and UX cleanup.

---

## Error corrections

**The LLM call never worked in the original.** `callLLM` hit api.anthropic.com directly from the browser with no api key in the headers and no CORS. Every call returned 401, fell through to "trouble connecting". Wired a Vercel-style serverless function at `api/chat.js` that proxies the call with the key from env. Same handler runs in dev via a Vite middleware so dev and prod are one code path. Bumped the model from `claude-sonnet-4-20250514` to `claude-sonnet-4-6` while I was in there, and added prompt caching on the system prompt so follow-up turns within a session cost ~10% of the first turn.

**Dates were fake.** Every component computed `new Date() + 7 days` at render time. If I asked the AI to change dates, nothing happened — there was no tag for it, no state to hold them. Added a `<trip>{...}</trip>` tag so Claude can emit ISO check_in/check_out, parsed it in `parseResponse`, threaded real dates through `DateRange` / `TripContext` / `BookingSummary` / `ConfirmationView`. Also stopped `DateRange` from silently fabricating dates when none are set — it returns null now.

**Hotels appeared before I picked a date.** Clicking the "Austin, 3 nights, 2 guests" chip went straight to hotels with invented dates. The prompt treated "dates" and "nights" as interchangeable, and `DateRange` was filling in a fallback. Tightened the prompt so Claude has to ask "when would you like to check in?" before recommending anything. The 📅 pill in the trip context bar only renders when there's a real check-in.

**Checkout inputs lost focus after one keystroke.** Typing in any field accepted one letter and kicked me out. `Section` and `Collapsible` were defined inline inside `BookingSummary`, so every state update produced new function references and React unmounted/remounted the entire form on every keystroke. Lifted both to module scope.

**LLM was making things up about me.** It had access to the traveler profile and would invent past stays, miles balances, anniversary trips, preferences I never specified. Two fixes:
- Switched the profile from scattered `${TRAVELER...}` interpolations to a curated JSON dump (`LLM_TRAVELER_DATA`), same pattern as `LLM_HOTEL_DATA`. The projection IS the allowed list — fields not in it don't exist as far as the model is concerned.
- Removed the original line that said "You do NOT have access to her preferences" since I actually want the model to use the profile now, just bounded.

---

## Personalization

**Surprise me.** Was a dead chip in the original — clicking it just sent the literal text "Surprise me" to the LLM with no special handling. Now: client-side filter pre-narrows the candidate hotels by budget (hard) and discovery (skip cities Sarah's already visited), then the LLM picks ONE from the shortlist and writes a warm conversational pitch. Tried letting the LLM do the filtering itself first — 3 out of 4 runs picked over-budget hotels. The model is just bad at hard numeric filtering across long arrays. So now JS owns "what's allowed", LLM owns "what to say".

**City-search ranking — weighted preferences with a budget penalty.** Took five attempts:
1. Tiered sort, budget primary with arbitrary scale, prefs as small bonuses. Prefs were essentially noise.
2. Weighted holistic score, 0.4 budget / 0.2 per pref. Over-budget hotels still won because matching all 3 prefs (+0.6) beat any plausible budget penalty.
3. Budget as flat constraint (1.0 within, declining over). Same problem.
4. Added an explicit subtractive over-budget penalty on top of the weighted score. Worked, but exposed the 0.4 budget weight as dead weight for in-budget hotels (constant offset, doesn't affect ranking).
5. **Final:** dropped the budget weight entirely. Prefs sum to 1.0. Budget acts only as a penalty when violated. Formula: `prefs(0–1) − overBudgetPenalty`. Simple and honest.

**Per-card preference badges.** Each hotel card shows green/red pills for what matches and what doesn't: `✓ On budget` / `✗ $95 over`, `✓ King bed`, `✓ High floor`, `✓ Quiet`. Predicates are shared (`PREF_PREDICATES`) so the badges and the sort score can't drift apart. Same badges on room cards (budget + king/no-king).

**Room sort, room badges, room size.** Same pattern extended down to rooms. Score is `1 - budgetPenalty + kingBonus`. Bed check looks at both `room.type` AND `room.features` so a "Loft Suite" with "King bed" in features doesn't get missed. Sort modes: Best for you / Price ↑ / Size ↓. Size parsed from feature strings like "450 sq ft".

**"Best for you" badge in the booking summary.** When the user lands on the review screen, if they picked the top-ranked hotel AND the top-ranked room within it, a navy "✦ Best for you" pill appears under the hotel info. Plus the per-room preference badges below it. Confirms the algorithm's pick matched the final choice.

**Return favorites — past 5-star stays go first.** `recent_trips` was only being used for the city-discovery filter. Hotel names and ratings were unused. Now: any hotel that matches a past 5-star stay (city + name) gets pinned to the top of the city's results, beating the model score. So when Sarah searches Chicago, Lakefront Suites pops to #1 with a "✦ Welcome back" badge + teal border, even though it's $95 over budget. Loyalty wins over the algorithm — which is what you actually want for a real travel product.

---

## UX improvements

**Made it runnable.** Original was one .jsx file, no package.json, no way to boot. Scaffolded Vite + React with `HTSBookingAssistant` mounted from the prototype. `npm install && npm run dev` → localhost:5173. Separate `dev:backup` script that runs the unmodified original on port 5174 — has a tiny fetch shim that reroutes the Anthropic calls to the local proxy so the original can actually run for comparison.

**"+$X /night" on cancellation pills.** The refundable upgrade said `+$58` next to "Fully refundable before check-in" — but that's per night, not total. The math wasn't adding up against the booking summary. Tiny fix, big clarity gain.

**SortControls on hotels and rooms.** A row above each carousel: descriptive label of what's active ("ranked by your budget & room preferences" / "lowest price first" / etc.) and pills to switch. Hotels: Best for you / Price ↑ / Rating ↓. Rooms: Best for you / Price ↑ / Size ↓. Sort modes persist across messages, so picking "Price" once sticks for the next search.

**"Welcome back" badge + teal border** on return-favorite cards. Visual signal for why a hotel jumped to the top.

---

## How to run

```bash
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env.local
npm install
npm run dev          # → http://localhost:5173
```

To compare against the unmodified original on a second port:
```bash
npm run dev:backup   # → http://localhost:5174
```

## How to deploy

1. `git init && git add . && git commit -m "init"`, push to GitHub.
2. Import the repo in Vercel.
3. Paste `ANTHROPIC_API_KEY` into the Vercel project's env vars.
4. Same `/api/chat` endpoint, same handler.

---

## Stuff I noticed but haven't done

- Past bot messages have live interactive controls (chips, hotel cards, "continue" buttons) — clicking them creates new messages and confuses the state. Should lock down interactivity to the most recent message, with a per-message "go back / start over" button.
- The chip system never got generalized — only the welcome message has quick replies. Every bot message after that is plain text. Could add a `<chips>` tag rule so Claude emits contextual chips throughout the flow.
- `LLM_HOTEL_DATA` is intentionally drifted from `HOTELS` for 5 hotels to simulate stale data. Leave it if I'm demoing prompt engineering, strip it if I'm demoing the booking flow.
- Sloppy retry logic in `callLLM` still retries on 4xx (won't fix itself). Should only retry on 5xx + network errors.
