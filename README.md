<div align="center">

  <img src="https://capsule-render.vercel.app/api?type=cylinder&color=0:0D1117,45:6C63FF,100:00F5D4&height=230&section=header&text=ANKIT%20SHARMA&fontColor=FFFFFF&fontSize=56&fontAlignY=38&desc=SAVE%20FILE%2001%20%2F%2F%20BACKEND%20%2F%2F%20PLATFORM%20ENGINEER&descAlignY=60&descSize=15&animation=fadeIn" alt="Ankit Sharma — backend and platform engineer" width="100%" />

  <img src="https://readme-typing-svg.demolab.com?font=Press+Start+2P&size=13&duration=2900&pause=900&color=00F5D4&center=true&vCenter=true&width=800&height=50&lines=BUILD+SYSTEMS+THAT+SURVIVE+PRODUCTION;SHIP+TOOLS+THAT+SHORTEN+THE+NEXT+INCIDENT;TURN+APPLIED+AI+INTO+THINGS+PEOPLE+USE;THE+RUN+IS+STILL+GOING" alt="Animated tagline" />

  <br />

  <a href="https://github.com/beingmartinbmc"><img src="https://img.shields.io/github/followers/beingmartinbmc?style=for-the-badge&logo=github&label=PARTY&color=6C63FF&labelColor=0D1117" alt="GitHub followers" /></a>
  <a href="https://www.npmjs.com/~beingmartinbmc"><img src="https://img.shields.io/badge/INVENTORY-11_shipped-CB3837?style=for-the-badge&logo=npm&logoColor=white&labelColor=0D1117" alt="npm packages" /></a>
  <a href="https://www.npmjs.com/package/git-history-ui"><img src="https://img.shields.io/npm/v/git-history-ui?style=for-the-badge&logo=npm&label=LATEST%20DROP&color=00BFA6&labelColor=0D1117" alt="Latest git-history-ui release" /></a>
  <img src="https://komarev.com/ghpvc/?username=beingmartinbmc&style=for-the-badge&color=00F5D4&label=PROFILE+PLAYS&labelColor=0D1117" alt="Profile views" />

</div>

---

## `▶` Save File 01

I'm **Ankit Sharma** — a backend and platform engineer who builds systems that stay reliable, observable, and debuggable under production pressure. As an **SMTS at Salesforce**, I work across service architecture, API design, automation, and production reliability.

Outside work I ship open-source developer tools, mostly born from an incident I never want to repeat. Everything below is real; the framing is just more fun than a bullet list.

| Stat | Value |
|:--|:--|
| **Class** | Backend / Platform Engineer |
| **Guild** | Salesforce — Senior Member of Technical Staff |
| **Region** | India `UTC+5:30` |
| **Playstyle** | Design for the incident, the operator, and the next maintainer |
| **Passive** | Ships the tool instead of writing the runbook |
| **Current meta** | Applied AI, with engineering discipline attached |

### Quest log

- [x] Publish an observability toolkit that installs in one line
- [x] Give coding agents local-first memory that survives the session
- [ ] Make production debugging boring
- [ ] Keep the streak alive

---

## `▶` The Arena

Live contribution graph. The ghosts are flaky tests.

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/beingmartinbmc/beingmartinbmc/output/pacman-contribution-graph-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/beingmartinbmc/beingmartinbmc/output/pacman-contribution-graph.svg">
    <img alt="Pac-Man eating Ankit's GitHub contributions" src="https://raw.githubusercontent.com/beingmartinbmc/beingmartinbmc/output/pacman-contribution-graph.svg" width="100%">
  </picture>
</div>

---

## `▶` Recurring Bosses

The five encounters that keep respawning in production. This is the actual job.

| Boss | How it opens | Counterplay |
|:--|:--|:--|
| **Silent Latency Creep** | p99 drifts for weeks; no alert ever fires | Percentile SLOs, request timelines, trace every hop |
| **The Blocked Event Loop** | CPU flat, memory flat, nothing moving | Watchdog on loop lag, move sync work off the path |
| **Cascade of Retries** | One slow dependency becomes an outage | Timeouts, budgets, circuit breakers, backpressure |
| **The Contract Break** | Nothing errored, everything is subtly wrong | Explicit API contracts, typed edges, contract tests |
| **The Unexplained Deploy** | It broke at 02:00 and nobody knows what shipped | Small commits, real messages, searchable history |

> Win condition isn't "it works." It's "it keeps working, explains itself when it doesn't, and the next engineer can operate it."

---

## `▶` Side Quest — *The 3 A.M. Page*

<details>
<summary><b>🕹️ PRESS START</b> — a playable incident. Every ending is a real tool.</summary>

<br />

> **03:12.** The pager goes off. Checkout `p99` just went from `180ms` to `8s`. Error rate is climbing.
> Nobody else is awake. Choose your opening move.

<details>
<summary><code>▸ 1. Roll the pods. It usually works.</code></summary>

<br />

Latency drops. You go back to bed.

**04:40.** The pager fires again. The queue is deeper this time.

<details>
<summary><code>▸ Roll them again.</code></summary>

<br />

💀 **GAME OVER — "The Restart Loop."**

Three restarts, zero knowledge. Tomorrow's review will ask what changed, and the evidence went out with the last pod. Restarting resets the symptom and deletes the crime scene.

*Continue?* → [**node-actuator-lite**](https://www.npmjs.com/package/node-actuator-lite) gives you health, env, and Prometheus endpoints so a pod can tell you why it's sick before you kill it.

</details>

<details>
<summary><code>▸ Grab a heap snapshot first, then roll.</code></summary>

<br />

✅ **RECOVERED.**

Heap grows linearly with open connections and never comes back down. That's not load — that's a leak. You have a real bug and a real fix.

*Loot* → [**node-observability-lite**](https://www.npmjs.com/package/node-observability-lite) — actuator endpoints, request timelines, and an event-loop watchdog in one line.

</details>

</details>

<details>
<summary><code>▸ 2. Open the dashboard first.</code></summary>

<br />

Good instinct. What's on it?

<details>
<summary><code>▸ CPU flat. Memory flat. Requests piling up in the queue.</code></summary>

<br />

💥 **CRITICAL HIT.**

Nothing is busy and nothing is moving — the classic signature of a blocked event loop. One synchronous call on the hot path is holding the whole process hostage. Everything behind it is just waiting in line.

*Loot* → [**node-eventloop-watchdog**](https://www.npmjs.com/package/node-eventloop-watchdog) — catches loop stalls before they become incidents.

</details>

<details>
<summary><code>▸ There is no dashboard for this service.</code></summary>

<br />

💀 **GAME OVER — "Debugging Blind."**

You're now reading raw logs at 3 A.M. and guessing. The outage isn't the incident; the missing telemetry is. This one was lost at design time.

*Continue?* → [**node-request-trace**](https://www.npmjs.com/package/node-request-trace) — per-request tracing and performance visualisation you should have added last quarter.

</details>

</details>

<details>
<summary><code>▸ 3. Ask what shipped in the last 24 hours.</code></summary>

<br />

The right question. You open the log.

<details>
<summary><code>▸ It's a wall of "Merge pull request #…"</code></summary>

<br />

🏆 **TRUE ENDING — "Root Cause."**

200 commits, no story. You stop scrolling and start querying: filter by path, by author, by the window the graphs turned. One config default flipped, buried in a rename. Ninety seconds, not ninety minutes.

*Loot* → [**git-history-ui**](https://www.npmjs.com/package/git-history-ui) — local-first Git investigation with portable reports and PR impact analysis.

<details>
<summary><code>▸ …wait, what's this commit at the bottom?</code></summary>

<br />

🥚 **SECRET FOUND.** You read all the way down here. Genuinely, respect.

Take the whole toolbox: [**every package I've shipped**](https://www.npmjs.com/~beingmartinbmc). Or say hi — I like people who read the stack trace to the end.

</details>

</details>

<details>
<summary><code>▸ One deploy. 400 files. Message: "small fix".</code></summary>

<br />

😐 **ENDING — "Small Fix."**

It was not a small fix. It is never a small fix.

*Loot* → [**roastcode**](https://www.npmjs.com/package/roastcode) — an AI CLI that roasts code, commits, and diffs, so the diff gets judged before production does.

</details>

</details>

</details>

---

## `▶` Skill Tree

<div align="center">

**`CORE`** — languages I build in

<img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
<img src="https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white" alt="Go" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />

**`BACKEND + AI`** — the main branch

<img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot" />
<img src="https://img.shields.io/badge/Spring_AI-6DB33F?style=for-the-badge&logo=spring&logoColor=white" alt="Spring AI" />
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
<img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI" />
<img src="https://img.shields.io/badge/Claude-D97757?style=for-the-badge&logo=anthropic&logoColor=white" alt="Claude" />

**`DATA + INFRA`** — where it actually runs

<img src="https://img.shields.io/badge/Kafka-231F20?style=for-the-badge&logo=apachekafka&logoColor=white" alt="Kafka" />
<img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
<img src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
<img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonwebservices&logoColor=white" alt="AWS" />
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />

**`SIDE BRANCH`** — enough frontend to ship the whole thing

<img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular" />
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />

</div>

---

## `▶` Campaign Missions

<table>
  <tr>
    <td align="center" width="33%" valign="top">
      <h3>DateSense</h3>
      <p><b>Applied AI product</b></p>
      <p>Conversation analysis, attraction scoring, ghosting-risk signals, and context-aware reply suggestions.</p>
      <a href="https://beingmartinbmc.github.io/DateSense/"><img src="https://img.shields.io/badge/PLAY-00BFA6?style=for-the-badge&logo=googlechrome&logoColor=white" alt="DateSense live demo" /></a>
      <a href="https://github.com/beingmartinbmc/DateSense"><img src="https://img.shields.io/badge/SOURCE-6C63FF?style=for-the-badge&logo=github&logoColor=white" alt="DateSense source code" /></a>
    </td>
    <td align="center" width="33%" valign="top">
      <h3>Epic: Divine Wisdom</h3>
      <p><b>AI knowledge system</b></p>
      <p>Personalized guidance across sacred texts, traditions, languages, and reflective modes.</p>
      <a href="https://beingmartinbmc.github.io/epic/"><img src="https://img.shields.io/badge/PLAY-00BFA6?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Epic live demo" /></a>
      <a href="https://github.com/beingmartinbmc/epic"><img src="https://img.shields.io/badge/SOURCE-6C63FF?style=for-the-badge&logo=github&logoColor=white" alt="Epic source code" /></a>
    </td>
    <td align="center" width="33%" valign="top">
      <h3>Algorithm Visualizer</h3>
      <p><b>Interactive learning tool</b></p>
      <p>Explore algorithms, data structures, coding games, and Git through interactive visualizations.</p>
      <a href="https://beingmartinbmc.github.io/algorithm-visualizer/"><img src="https://img.shields.io/badge/PLAY-00BFA6?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Algorithm Visualizer live demo" /></a>
      <a href="https://github.com/beingmartinbmc/algorithm-visualizer"><img src="https://img.shields.io/badge/SOURCE-6C63FF?style=for-the-badge&logo=github&logoColor=white" alt="Algorithm Visualizer source code" /></a>
    </td>
  </tr>
</table>

---

## `▶` Inventory

<details open>
<summary><b>Shipped and installable. Rarity is graded on real download volume — the counters are live.</b></summary>
<br />

| Item | What it does | Rarity | Version | Pulls |
|:--|:--|:--|:-:|:-:|
| [**git-history-ui**](https://www.npmjs.com/package/git-history-ui) | Local-first Git investigation, portable reports, PR impact automation | ![legendary](https://img.shields.io/badge/LEGENDARY-FFB020?style=flat-square&labelColor=0D1117) | ![v](https://img.shields.io/npm/v/git-history-ui?style=flat-square&color=6C63FF&label=) | ![d](https://img.shields.io/npm/dt/git-history-ui?style=flat-square&color=00BFA6&label=) |
| [**node-actuator-lite**](https://www.npmjs.com/package/node-actuator-lite) | Actuator-style health, environment, and Prometheus endpoints for Node.js | ![epic](https://img.shields.io/badge/EPIC-A855F7?style=flat-square&labelColor=0D1117) | ![v](https://img.shields.io/npm/v/node-actuator-lite?style=flat-square&color=6C63FF&label=) | ![d](https://img.shields.io/npm/dt/node-actuator-lite?style=flat-square&color=00BFA6&label=) |
| [**jambavan**](https://www.npmjs.com/package/jambavan) | Local-first MCP memory and code intelligence for coding agents | ![epic](https://img.shields.io/badge/EPIC-A855F7?style=flat-square&labelColor=0D1117) | ![v](https://img.shields.io/npm/v/jambavan?style=flat-square&color=6C63FF&label=) | ![d](https://img.shields.io/npm/dt/jambavan?style=flat-square&color=00BFA6&label=) |
| [**meme-as-a-service**](https://www.npmjs.com/package/meme-as-a-service) | Generate and serve memes programmatically | ![rare](https://img.shields.io/badge/RARE-38BDF8?style=flat-square&labelColor=0D1117) | ![v](https://img.shields.io/npm/v/meme-as-a-service?style=flat-square&color=6C63FF&label=) | ![d](https://img.shields.io/npm/dt/meme-as-a-service?style=flat-square&color=00BFA6&label=) |
| [**node-request-trace**](https://www.npmjs.com/package/node-request-trace) | Request tracing and performance visualization for Node.js APIs | ![rare](https://img.shields.io/badge/RARE-38BDF8?style=flat-square&labelColor=0D1117) | ![v](https://img.shields.io/npm/v/node-request-trace?style=flat-square&color=6C63FF&label=) | ![d](https://img.shields.io/npm/dt/node-request-trace?style=flat-square&color=00BFA6&label=) |
| [**pravaah**](https://www.npmjs.com/package/pravaah) | Production-grade Excel, CSV, and JSONL pipelines for Node.js | ![rare](https://img.shields.io/badge/RARE-38BDF8?style=flat-square&labelColor=0D1117) | ![v](https://img.shields.io/npm/v/pravaah?style=flat-square&color=6C63FF&label=) | ![d](https://img.shields.io/npm/dt/pravaah?style=flat-square&color=00BFA6&label=) |
| [**node-eventloop-watchdog**](https://www.npmjs.com/package/node-eventloop-watchdog) | Detect event-loop stalls before they turn into production incidents | ![uncommon](https://img.shields.io/badge/UNCOMMON-4ADE80?style=flat-square&labelColor=0D1117) | ![v](https://img.shields.io/npm/v/node-eventloop-watchdog?style=flat-square&color=6C63FF&label=) | ![d](https://img.shields.io/npm/dt/node-eventloop-watchdog?style=flat-square&color=00BFA6&label=) |
| [**node-observability-lite**](https://www.npmjs.com/package/node-observability-lite) | One-line actuator endpoints, request timelines, and event-loop watchdog | ![uncommon](https://img.shields.io/badge/UNCOMMON-4ADE80?style=flat-square&labelColor=0D1117) | ![v](https://img.shields.io/npm/v/node-observability-lite?style=flat-square&color=6C63FF&label=) | ![d](https://img.shields.io/npm/dt/node-observability-lite?style=flat-square&color=00BFA6&label=) |
| [**readme-cinema**](https://www.npmjs.com/package/readme-cinema) | Transform READMEs into cinematic terminal experiences | ![uncommon](https://img.shields.io/badge/UNCOMMON-4ADE80?style=flat-square&labelColor=0D1117) | ![v](https://img.shields.io/npm/v/readme-cinema?style=flat-square&color=6C63FF&label=) | ![d](https://img.shields.io/npm/dt/readme-cinema?style=flat-square&color=00BFA6&label=) |
| [**roastcode**](https://www.npmjs.com/package/roastcode) | AI-powered CLI that roasts code, commits, and diffs | ![uncommon](https://img.shields.io/badge/UNCOMMON-4ADE80?style=flat-square&labelColor=0D1117) | ![v](https://img.shields.io/npm/v/roastcode?style=flat-square&color=6C63FF&label=) | ![d](https://img.shields.io/npm/dt/roastcode?style=flat-square&color=00BFA6&label=) |
| [**eli5**](https://repo1.maven.org/maven2/io/github/beingmartinbmc/eli5/1.0.4/) | AI-powered "explain like I'm five" annotations for Java docs | ![artifact](https://img.shields.io/badge/JVM_ARTIFACT-ED8B00?style=flat-square&labelColor=0D1117) | ![v](https://img.shields.io/maven-central/v/io.github.beingmartinbmc/eli5?style=flat-square&color=6C63FF&label=) | ![java](https://img.shields.io/badge/Java_11+-00BFA6?style=flat-square) |

</details>

---

## `▶` Run Stats

<div align="center">

  <img src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=beingmartinbmc&theme=tokyonight" alt="Ankit's GitHub profile details" width="100%" />

  <img src="https://github-profile-summary-cards.vercel.app/api/cards/stats?username=beingmartinbmc&theme=tokyonight" alt="GitHub statistics" width="32%" />
  <img src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=beingmartinbmc&theme=tokyonight" alt="Repositories by language" width="32%" />
  <img src="https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=beingmartinbmc&theme=tokyonight" alt="Commits by language" width="32%" />

  <br />

  <img src="https://streak-stats.demolab.com?user=beingmartinbmc&theme=tokyonight&hide_border=true&background=0D1117&ring=6C63FF&fire=00F5D4&currStreakLabel=00F5D4" alt="GitHub contribution streak" />

  <img src="https://github-readme-activity-graph.vercel.app/graph?username=beingmartinbmc&theme=tokyo-night&bg_color=0D1117&color=6C63FF&line=00F5D4&point=FFFFFF&hide_border=true&area=true" alt="GitHub contribution activity graph" width="100%" />

</div>

---

<div align="center">

### `▶` Co-op Mode

Open to good problems, open-source collaboration, and anyone who has also debugged something at 3 A.M.

<a href="https://github.com/beingmartinbmc?tab=repositories"><img src="https://img.shields.io/badge/BROWSE_REPOSITORIES-6C63FF?style=for-the-badge&logo=github&logoColor=white&labelColor=0D1117" alt="Browse all repositories" /></a>
<a href="https://www.npmjs.com/~beingmartinbmc"><img src="https://img.shields.io/badge/BROWSE_PACKAGES-00BFA6?style=for-the-badge&logo=npm&logoColor=white&labelColor=0D1117" alt="Browse all npm packages" /></a>

<br /><br />

<sub>Built one production system at a time by <a href="https://github.com/beingmartinbmc">@beingmartinbmc</a>. The run continues.</sub>

<img src="https://capsule-render.vercel.app/api?type=egg&color=0:00F5D4,50:6C63FF,100:0D1117&height=120&section=footer" alt="" width="100%" />

</div>
