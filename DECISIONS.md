# Decisions

Five decisions on building the returning-user experience. Full implementation arc is in [CHANGELOG.md](CHANGELOG.md). This is the short version of what was built, what was deliberately skipped, and why.

1. **Added personalization in three parts, powered by a simple scoring model.**
   - **Welcome:** quick-reply chips are now generated from Sarah's past trips — "Back to Chicago — Lakefront Suites again?" instead of generic hardcoded city seeds.
   - **Search:** city results are re-ranked using a weighted score on her stated preferences (room type, floor, quiet), with budget acting as a penalty when violated. Each card shows green/red badges (`✓ On budget`, `✗ $95 over`, `✓ King bed`, `✓ Quiet`) so the ranking is never a black box. `Price ↑` and `Rating ↓` pills let her override.
   - **Reinforcement:** past 5-star stays pin to the top of search results with a "✦ Welcome back" badge; the booking summary shows a "✦ Best for you" pill when she picks the top-recommended combo.

   This isn't decoration, personalization is one of the highest-leverage levers in travel. Hotels that personalize see retention gains up to **20%** and guest-satisfaction lifts around **33%** ([TeaCode](https://www.teacode.io/blog/how-personalization-can-double-hotel-conversion-rate)). In travel apps specifically, 1:1 personalization adds **5–20 percentage points of retention lift** versus non-personalized experiences ([Marketing LTB](https://marketingltb.com/blog/statistics/personalization-statistics/)). In a category where conversion floors sit at 0.2–2.5%, that's a category-shaping difference.

2. **Added a backend server so the API key doesn't burn, plus prompt caching for cost and speed.**
   The original called the LLM directly from the browser with no API key, every call failed silently and ended on "trouble connecting." Added a small server-side proxy that holds the key and forwards the request. On top of that, marked the system prompt cacheable so follow-up turns within a session cost roughly **10% of the first call**. Invisible to the user, but it's the difference between "demo that breaks" and a shippable MVP that doesn't blow the bill.

3. **Caught and fixed errors that would have killed credibility on day one.** Working through the prototype, found and patched five bugs that would have undermined trust the first time a user noticed them: dates the assistant invented out of nothing ("hotels for May 23–26" — never picked); hotels appearing before any date was provided; checkout form inputs that lost focus after every keystroke (effectively unusable); the AI hallucinating preferences and past stays Sarah never mentioned; past-message buttons that scrambled the conversation when re-clicked. New tech only gets one first impression, personalization isn't worth shipping if the basics feel broken.

4. **Did NOT wire tool-use for the LLM to fetch data itself.** A common AI pattern is to let the model call functions like `search_hotels(city, dates)` and assemble the answer. This was skipped and put filtering + scoring in JavaScript helper functions instead. Two reasons:
   - **Cost and latency:** every tool call doubles the round-trips per turn.
   - **The LLM is genuinely bad at this kind of picking.** The first iteration of "Surprise me" let the model do its own filtering. **Three out of four runs** picked over-budget hotels while confidently pitching them as "within your budget." Once the filter was moved to JS, the model never failed again. The split that emerged: JS owns correctness, AI owns the conversation.

5. **Did NOT build the bigger features that need real infrastructure.** Two specific ones skipped:
   - **Live hotel availability**: Would need real inventory APIs, real-time price feeds, and date-aware booking holds. Even a convincing mock would balloon the cached prompt past its window.
   - **Flight booking, cars, activities, multi-modal trip planning**: Every new domain is more structured data that, stuffed into the system prompt, would blow the context window on the first call. That's exactly where tool-use becomes mandatory, and where the scope of this prototype ends.

   The scope decided: "a returning user opens the assistant, sees something that feels personal, books a hotel that fits her." One interaction, hopefully done well.

---

Sources:
- [TeaCode — How personalization can double hotel conversion rate](https://www.teacode.io/blog/how-personalization-can-double-hotel-conversion-rate)
- [Marketing LTB — Personalization Statistics 2026](https://marketingltb.com/blog/statistics/personalization-statistics/)
- [ASD Blog — How to Improve Travel App Retention Rate in 2026](https://asd.team/blog/improving-travel-app-retention-rate/)
